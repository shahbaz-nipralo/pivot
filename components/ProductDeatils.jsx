"use client";

import { Check, Download, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGeoLocation } from "../lib/useGeoLocation";
import Link from "next/link";
import Image from "next/image";

export default function ProductDetails() {
  const { location, loading } = useGeoLocation();

  // Default to INR, switch to USD if not in India
  const isINR = location?.country === "IN";

  const discountedPrice = isINR ? "₹1,499" : "$18";
  const originalPrice = isINR ? "₹2,999" : "$36";
  const discountLabel = "50% OFF";

  return (
    <div className="max-w-6xl mx-auto p-4 mt-1">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4 mr-1 transition-all duration-300 transform hover:translate-x-1" />
          <span className="transition-all duration-300 transform hover:translate-x-1">
            Back to Home
          </span>
        </Link>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Product Image */}
        <Image
          src="/images/excel_templates.webp"
          alt="Excel & Google Sheets Templates Bundle"
          width={800} // you can adjust this
          height={600} // adjust proportionally
          className="w-full h-auto"
        />

        {/* Product Info */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
                Best Seller
              </Badge>
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">
                Limited Offer
              </Badge>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">
              Excel & Google Sheets Templates Bundle
            </h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600">(240+ reviews)</span>
            </div>
            <div className="mt-4 flex items-center gap-3">
              {loading ? (
                <span className="text-gray-500 text-lg">Loading price...</span>
              ) : (
                <>
                  <span className="text-3xl font-bold">{discountedPrice}</span>
                  <span className="text-xl text-gray-500 line-through">
                    {originalPrice}
                  </span>
                  <span className="text-green-600 font-semibold">
                    {discountLabel}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">What's Included:</h2>
            <ul className="space-y-3">
              {[
                "140+ ready-to-use Excel & Google Sheets templates",
                "Lifetime access to all templates with free updates",
                "Compatible with Microsoft Excel and Google Sheets",
                "Detailed documentation and video tutorials",
                "30-day money-back guarantee",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-5 cursor-pointer rounded-xl flex items-center justify-center gap-2 text-lg transition-all duration-300 transform hover:scale-105 shadow-md">
              <Download className="h-5 w-5" />
              <span>Buy Now</span>
            </Button>

            <Button
              variant="outline"
              className="border-1 border-green-600 text-green-600 hover:bg-green-50 px-6 py-5 cursor-pointer rounded-xl flex items-center justify-center gap-2 text-lg transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
