"use client";
import { useState, useEffect, useRef } from "react";
import useFetchProducts from "@/lib/useFetchProducts";
import { FiSearch } from 'react-icons/fi';

export default function SearchComponent({ desktop, mobile, isOpen, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { products, loading: productsLoading } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const searchRef = useRef(null);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Filter products
  useEffect(() => {
    if (debouncedSearchTerm && products) {
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ).slice(0, 5);
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts([]);
    }
  }, [debouncedSearchTerm, products]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  if (desktop) {
    return (
      <div className="relative" ref={searchRef}>
        {isOpen && (
          <div className="absolute right-0 top-0 mt-12 w-96 bg-white shadow-lg rounded-md z-50 border border-gray-200">
            <SearchInput 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onClose={onClose}
            />
            <SearchResults 
              loading={productsLoading}
              products={filteredProducts}
              searchTerm={debouncedSearchTerm}
              onClose={onClose}
            />
          </div>
        )}
        <button
          onClick={() => isOpen ? onClose() : null}
          className={`text-gray-600 hover:bg-transparent ${isOpen ? 'text-blue-600' : ''}`}
        >
          <FiSearch className="h-6 w-6" />
        </button>
      </div>
    );
  }

  if (mobile) {
    return (
      <div className="md:hidden bg-white shadow-md px-4 py-3 border-t border-gray-200">
        <SearchInput 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onClose={onClose}
          mobile
        />
        <SearchResults 
          loading={productsLoading}
          products={filteredProducts}
          searchTerm={debouncedSearchTerm}
          onClose={onClose}
          mobile
        />
      </div>
    );
  }

  return null;
}

const SearchInput = ({ searchTerm, setSearchTerm, onClose, mobile }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search products..."
      className={`w-full p-3 pl-10 pr-10 ${mobile ? 'border border-gray-300 rounded-md' : 'border-0 rounded-t-md'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      autoComplete="off"
    />
    <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
    {searchTerm && (
      <button
        onClick={() => {
          setSearchTerm("");
          onClose();
        }}
        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
      >
        <FiX className="h-4 w-4" />
      </button>
    )}
  </div>
);

const SearchResults = ({ loading, products, searchTerm, onClose, mobile }) => {
  if (loading) return <div className="p-4 text-center text-gray-500">Searching...</div>;
  if (products.length > 0) return (
    <div className={`${mobile ? 'mt-2 bg-white border border-gray-200 rounded-md shadow-sm max-h-60 overflow-y-auto' : 'border-t border-gray-200 max-h-80 overflow-y-auto'}`}>
      {!mobile && <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Products</div>}
      {products.map((product) => (
        <ProductSearchResult 
          key={product.id} 
          product={product} 
          onClose={onClose}
          mobile={mobile}
        />
      ))}
    </div>
  );
  if (searchTerm) return <div className="p-4 text-center text-gray-500">No products found for "{searchTerm}"</div>;
  return null;
};

const ProductSearchResult = ({ product, onClose, mobile }) => (
  <Link
    href={`/product/${product.slug}`}
    className={`flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 ${mobile ? '' : 'group'}`}
    onClick={onClose}
  >
    <div className="flex-shrink-0 h-10 w-10 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
      <img
        src={product.images?.[0]?.url || "/placeholder.png"}
        alt={product.title}
        className="h-full w-full object-contain"
      />
    </div>
    <div className="ml-3 flex-1 min-w-0">
      <p className={`text-sm font-medium text-gray-900 truncate ${mobile ? '' : 'group-hover:text-blue-600'}`}>
        {product.title}
      </p>
      <div className="flex items-center">
        <p className="text-sm text-gray-900 font-medium">
          ${product.price?.discounted_price || product.price?.original_price}
        </p>
        {product.price?.discounted_price && (
          <p className="text-xs text-gray-500 line-through ml-2">
            ${product.price?.original_price}
          </p>
        )}
      </div>
    </div>
    <FiChevronRight className={`ml-2 text-gray-400 ${mobile ? '' : 'group-hover:text-blue-600'}`} />
  </Link>
);