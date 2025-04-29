"use client";

import { useParams } from "next/navigation";
import { Check, Download, Star, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useGeoLocation } from "@/lib/useGeoLocation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useProduct } from "@/lib/useProduct";
import { useProductDisplay } from "@/lib/useProductFunc";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { addItem } = useCart();
  const { location, loading: geoLoading } = useGeoLocation();
  const isINR = location?.country === "IN";

  const { product, loading, error } = useProduct(slug);
  const { formattedDate, renderRating, discountPercentage } =
    useProductDisplay(product);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  const imageUrl = product?.images[0]?.url;
  const { title, price, tags, included } = product;

  return (
    <div className="max-w-6xl mx-auto p-4 mt-24">
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
        {/* Product Image */}
        <div className="w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              width={600}
              height={600}
              className="object-cover rounded-md"
            />
          ) : (
            <div className="bg-gray-100 rounded-md flex items-center justify-center h-96">
              No image available
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-2">
          {/* Tags */}
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.split(",").map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-green-600 border-green-600"
                >
                  {tag.trim()}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center">{renderRating()}</div>
            <span className="text-sm text-gray-500">
              Published on {formattedDate}
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            {price?.discounted_price && (
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold">
                  {price.discounted_price}
                </span>
                {price.original_price && (
                  <span className="text-lg text-gray-500 line-through">
                    {price.original_price}
                  </span>
                )}
                {price.discounted_price && price.original_price && (
                  <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                    {discountPercentage}% OFF
                  </span>
                )}
              </div>
            )}
            {!price?.discounted_price && price?.original_price && (
              <span className="text-3xl font-bold">{price.original_price}</span>
            )}
          </div>

          {/* Features/Included items */}
          {included && included.length > 0 && (
            <div className="pt-6">
              <h3 className="font-medium text-lg mb-2">What's Included:</h3>
              <ul className="space-y-2">
                {included.map(
                  (item, index) =>
                    item.text && (
                      <li key={item.id || index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-600 mr-2" />
                        <span>{item.text}</span>
                      </li>
                    )
                )}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-4 pt-4">
            <button
              onClick={() => addItem(product)}
              className="flex items-center justify-center cursor-pointer gap-2 flex-1 py-4 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 shadow-md"
            >
              <Check className="h-5 w-5" />
              Add to Cart
            </button>

            <Link href="/cart" className="flex-1">
              <button className="flex items-center justify-center gap-2 cursor-pointer w-full py-4 !px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-sm">
                <Download className="h-5 w-5" />
                Buy Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
