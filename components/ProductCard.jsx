"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useFetchProducts from "../lib/useFetchProducts";

function ProductCard() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [sortOption, setSortOption] = useState("relevance");
  const { products, loading, error } = useFetchProducts();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleCardClick = (slug) => {
    router.push(`/product/${slug}`);
  };

  // Filter and sort products
  // Change from const to let since we need to reassign it
  let filteredProducts = products ? [...products] : [];

  // Apply availability filter
  if (availabilityFilter === "in-stock") {
    filteredProducts = filteredProducts.filter((product) => product.inStock);
  } else if (availabilityFilter === "out-of-stock") {
    filteredProducts = filteredProducts.filter((product) => !product.inStock);
  }

  // Apply sorting
  switch (sortOption) {
    case "price-low-high":
      filteredProducts.sort(
        (a, b) => a.price.discounted_price - b.price.discounted_price
      );
      break;
    case "price-high-low":
      filteredProducts.sort(
        (a, b) => b.price.discounted_price - a.price.discounted_price
      );
      break;
    case "newest":
      filteredProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      break;
    case "relevance":
    default:
      // Default sorting (likely how they come from the API)
      break;
  }

  if (!isClient || loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 text-center mb-12">
          Premium Templates
        </h1>

        {/* Filter and Sort Controls */}
        {/* Filter and Sort Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex flex-col gap-2">
            <div className="text-gray-700">
              <span className="font-medium">Filter:</span>
              <select
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                className="ml-2 border-none bg-transparent focus:outline-none focus:ring-0"
              >
                <option value="all">All Products</option>
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-gray-700">
              <span className="font-medium">Sort:</span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="ml-2 border-none bg-transparent focus:outline-none focus:ring-0"
              >
                <option value="relevance">Relevance</option>
                <option value="price-low-high">Price: Low to High</option>
                <option value="price-high-low">Price: High to Low</option>
                <option value="newest">Newest</option>
              </select>
            </div>
            <span className="text-sm text-gray-500">
              {filteredProducts.length} results
            </span>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item, index) => {
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
                    {/* {!item.inStock && (
                      <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                        Out of Stock
                      </div>
                    )} */}
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
            })
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">
                No products match your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
