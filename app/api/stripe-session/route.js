// File: /app/api/stripe-session/route.js

import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_KEY_SECRET);

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const session_id = searchParams.get("session_id");
  const auth_user = searchParams.get("auth_user"); // <- User ID

  if (!session_id) {
    return NextResponse.json({ error: "Session ID missing" }, { status: 400 });
  }

  try {
    // Step 1: Get session details from Stripe
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "customer_details"],
    });

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    // ✅ Step 2.5: Check if already saved in Strapi
    const checkResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments?filters[session_id][$eq]=${session.id}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
      }
    );

    const checkData = await checkResponse.json();

    if (checkData?.data?.length > 0) {
      console.log("Payment already exists in Strapi, skipping duplicate.");
      return NextResponse.json(session);
    }

    // Step 2: Prepare payment data for Strapi
    const paymentData = {
      data: {
        session_id: session.id,
        amount: String(session.amount_total ? session.amount_total / 100 : 0),
        currency: session.currency || "INR",
        payment_status: session.payment_status || "paid",
        customer_email: session.customer_details?.email || "",
        customer_name: session.customer_details?.name || "",
        payment_method: session.payment_method_types?.join(", ") || "card",
        product_name: session.line_items?.data[0]?.description || "",
        order_id: session.id || "N/A",
        auth_users: auth_user || null,
      },
    };

    console.log("Saving Payment to Strapi:", paymentData);

    // Step 3: Save payment info to Strapi
    const strapiResponse = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify(paymentData),
      }
    );

    const strapiData = await strapiResponse.json();

    if (!strapiResponse.ok) {
      console.error("Strapi Save Error:", strapiData.error);
      return NextResponse.json(
        { error: "Failed to save payment to Strapi" },
        { status: 500 }
      );
    }

    // Step 4: Return session details to frontend
    return NextResponse.json(session);
  } catch (error) {
    console.error("Stripe API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
