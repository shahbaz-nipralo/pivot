"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useFetchProducts from "../lib/useFetchProducts";


function ProductCard() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  const { products, loading, error } = useFetchProducts();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = (slug) => {

    router.push(`/product/${slug}`);
    console.log("Products:", slug);
  };
  


  if (!isClient || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Premium Templates
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((item, index) => {
            const image = item.images?.[0];
            const imageUrl = image?.formats?.thumbnail?.url || image?.url;
            const finalImageUrl = imageUrl || "/placeholder.png";

            return (
              <div
                key={index}
                onClick={() => handleCardClick(item.slug)}
                className="bg-white cursor-pointer rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <div className="relative">
                  <img
                    src={finalImageUrl}
                    alt={item.title}
                    className="w-full h-48 object-contain bg-white"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {item.title}
                  </h2>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">
                        {item.price?.discounted_price}
                      </span>
                      <span className="text-sm text-gray-500 line-through">
                        {item.price?.original_price}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-green-600">
                      {item.price?.discount}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
