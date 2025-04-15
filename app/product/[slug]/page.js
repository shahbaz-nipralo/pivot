"use client";

import { useParams } from "next/navigation";
import { Check, Download, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import products from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useGeoLocation } from "@/lib/useGeoLocation";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function page() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;
  const product = products.find((p) => p.product.slug === slug)?.product;
  const { addItem } = useCart(); // Get the addItem function from cart context

  const { location, loading } = useGeoLocation();
  const isINR = location?.country === "IN";

  if (!product) return <div>Product not found.</div>;

  const getPriceValue = (priceString) => {
    // Remove currency symbol and commas, then convert to number
    return parseFloat(priceString.replace(/[^0-9.]/g, ""));
  };

  const discountedPriceValue = isINR
    ? getPriceValue(product.pricing.discounted_price) * 83
    : getPriceValue(product.pricing.discounted_price);

  const discountedPrice = isINR
    ? `₹${discountedPriceValue}`
    : product.pricing.discounted_price;

  const originalPrice = isINR
    ? `₹${getPriceValue(product.pricing.original_price) * 83}`
    : product.pricing.original_price;

  // In your product page's handleAddToCart function
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.title,
      price: discountedPriceValue,
      image: product.box_image.src,
    });
  };

  const handleBuyNow = () => {
    // handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-1">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="w-full">
          <Image
            src={product.box_image.src}
            alt={product.title}
            width={600} // customize as needed
            height={400} // customize as needed
            className="w-full object-contain"
          />
        </div>

        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {product.tags.map((tag, i) => (
                <Badge key={i} className="bg-green-100 text-green-800">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold">{product.title}</h1>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex">
                {[...Array(Math.round(product.rating.stars))].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-gray-600">({product.rating.reviews})</span>
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
                    {product.pricing.discount}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-semibold">What's Included:</h2>
            <ul className="space-y-3">
              {product.included.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-green-500 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handleAddToCart}
              className="bg-white border border-green-600 text-green-600 hover:bg-green-50 px-6 py-5 cursor-pointer rounded-xl flex items-center justify-center gap-2 text-lg transition-all duration-300 transform hover:scale-105 shadow-sm"
            >
              <span>Add to Cart</span>
            </Button>

            <Link href="/cart" passHref>
              <Button
                onClick={handleBuyNow}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-5 cursor-pointer rounded-xl flex items-center justify-center gap-2 text-lg transition-all duration-300 transform hover:scale-105 shadow-sm"
              >
                <Download className="h-5 w-5" />
                <span>Buy Now</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
