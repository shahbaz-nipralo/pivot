"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUser } from "@auth0/nextjs-auth0/client";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useUser();

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        setError("No session ID found");
        setLoading(false);
        return;
      }

      try {
        // Fetch session details from Stripe (which will handle Strapi save internally)
        const response = await fetch(
          `/api/stripe-session?session_id=${sessionId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to fetch session");
        }

        setSession(data);

        // Debug logs (optional)
        console.log("Session data received:", data);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to process payment details");
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#2a6f97] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#2a6f97]">Processing your payment...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h1 className="text-2xl font-medium text-gray-800">
              Payment Error
            </h1>
            <p className="text-gray-600 mt-2">{error}</p>
          </div>

          <div className="flex justify-center mt-8">
            <Button
              className="bg-[#2a6f97] hover:bg-[#1d5476] text-white px-6 py-2 rounded"
              onClick={() => (window.location.href = "/")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Homepage
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Format currency
  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency?.toUpperCase() || "INR",
    }).format(amount / 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#2a6f97] text-white py-16 mt-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4" />
          <h1 className="text-3xl font-medium">Thank You for Your Purchase</h1>
          <p className="text-blue-100 mt-2">
            Your payment has been processed successfully
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Payment Summary */}
        <div className="mb-12">
          <h2 className="text-xl font-medium text-gray-800 mb-6">
            Payment Summary
          </h2>

          <div className="bg-gray-50 p-6 rounded mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Amount Paid</span>
              <span className="text-2xl font-medium text-gray-800">
                {session?.amount_total
                  ? formatCurrency(session.amount_total, session.currency)
                  : "N/A"}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Payment Method</span>
              <span className="text-gray-800">
                {session?.payment_method_types?.join(", ") || "Card"}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Product</span>
              <span className="text-gray-800">
                {session?.line_items?.data[0]?.description || "Product"}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Date</span>
              <span className="text-gray-800">
                {session?.created
                  ? new Date(session.created * 1000).toLocaleString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Email</span>
              <span className="text-gray-800">
                {session?.customer_details?.email || "N/A"}
              </span>
            </div>

            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Customer</span>
              <span className="text-gray-800">
                {session?.customer_details?.name || "N/A"}
              </span>
            </div>
          </div>

          {session?.line_items?.data?.length > 1 && (
            <div className="mt-8">
              <Separator className="my-6" />
              <h3 className="font-medium text-gray-800 mb-4">
                Items Purchased
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 text-gray-600 font-medium">
                        Item
                      </th>
                      <th className="text-right py-3 px-4 text-gray-600 font-medium">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {session.line_items.data.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4 text-gray-800">
                          {item.description}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-800">
                          {formatCurrency(item.amount_total, session.currency)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6 text-xs text-gray-500">
            <p>Transaction ID: {session?.id || "N/A"}</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center mt-8">
          <Button
            className="bg-[#2a6f97] hover:bg-[#1d5476] text-white px-6 py-2 rounded cursor-pointer"
            onClick={() => (window.location.href = "/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Return to Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#2a6f97] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-[#2a6f97]">Loading...</p>
          </div>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
