"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FiSearch, FiX } from "react-icons/fi";
import useFetchProducts from "@/lib/useFetchProducts";

export default function SearchBar({ isMobile = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);
  const { products, loading: productsLoading } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm && products) {
      setIsSearching(true);
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ).slice(0, 5);
      setFilteredProducts(filtered);
      setIsSearching(false);
    } else {
      setFilteredProducts([]);
    }
  }, [debouncedSearchTerm, products]);

  const clearSearch = () => setSearchTerm("");

  const SearchResults = () => {
    if (isSearching || productsLoading) {
      return <div className="p-2 text-center text-sm text-gray-400">Searching...</div>;
    }

    if (!isSearching && filteredProducts.length > 0) {
      return (
        <div className="border-t max-h-64 overflow-y-auto">
          {filteredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug}`}
              className="flex items-center gap-2 p-2 hover:bg-gray-50 text-sm"
              onClick={clearSearch}
            >
              <img
                src={product.images?.[0]?.url || "/placeholder.png"}
                alt={product.title}
                className="h-8 w-8 object-contain rounded"
              />
              <div className="flex-1 truncate">
                <p className="text-gray-800 truncate">{product.title}</p>
                <p className="text-xs text-gray-500">
                  ${product.price?.discounted_price || product.price?.original_price}
                </p>
              </div>
            </Link>
          ))}
          <Link
            href={`/products?search=${encodeURIComponent(debouncedSearchTerm)}`}
            className="block p-2 text-center text-sm text-blue-600 hover:bg-gray-50 border-t"
            onClick={clearSearch}
          >
            View all products matching"
          </Link>
        </div>
      );
    }

    if (debouncedSearchTerm && filteredProducts.length === 0) {
      return <div className="p-2 text-center text-sm text-gray-400">No results</div>;
    }

    return null;
  };

  return (
    <div className={isMobile ? "w-full" : "relative"} ref={searchRef}>
      <div className={isMobile ? "px-4 py-2 border-t" : "absolute mt-12 w-80 z-50 border rounded bg-white shadow-sm"}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-8 pr-8 text-sm border rounded focus:outline-none focus:ring focus:ring-blue-100"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
          <FiSearch className="absolute left-2.5 top-2.5 text-gray-400" />
          {searchTerm && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <FiX className="h-4 w-4" />
            </button>
          )}
        </div>
        <SearchResults />
      </div>
    </div>
  );
}