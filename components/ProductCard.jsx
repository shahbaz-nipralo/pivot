"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import products from "@/lib/data";
import Image from "next/image";

function ProductCard() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // This ensures that the router is only used client-side
  }, []);

  const handleCardClick = (slug) => {
    if (router) {
      router.push(`/product/${slug}`);
    }
  };

  if (!isClient) return null; // Return null until the component is client-side

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Premium Templates
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, index) => (
            <div
              key={index}
              onClick={() => handleCardClick(item.product.slug)}
              className="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <div className="relative">
                <Image
                  src={item.product.box_image.src}
                  alt={item.product.title}
                  width={300} // customize as needed
                  height={192} // corresponds to h-48 (48 x 4 = 192px)
                  className="w-full h-48 object-contain bg-white"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                  {item.product.title}
                </h2>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {item.product.pricing.discounted_price}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {item.product.pricing.original_price}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {item.product.pricing.discount}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
