"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiSearch,
  FiUser,
  FiShoppingBag,
  FiMenu,
  FiX,
  FiLogOut,
  FiChevronRight,
} from "react-icons/fi";
import { Button } from "@/components/ui/button";
import LanguageCurrencySelector from "./LanguageSelector";
import { useCart } from "@/context/CartContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useAuth0 } from '@auth0/auth0-react';
import useFetchProducts from "@/lib/useFetchProducts";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const { totalItems } = useCart();
  const { user, error, isLoading } = useUser();
  const { loginWithRedirect } = useAuth0();
  const searchRef = useRef(null);
  const { products, loading: productsLoading } = useFetchProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter products based on search term
  useEffect(() => {
    if (debouncedSearchTerm && products) {
      setIsSearching(true);
      const filtered = products.filter(product =>
        product.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      ).slice(0, 5); // Show only top 5 results
      setFilteredProducts(filtered);
      setIsSearching(false);
    } else {
      setFilteredProducts([]);
    }
  }, [debouncedSearchTerm, products]);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      // Focus the input when search opens
      setTimeout(() => {
        const input = document.getElementById("navbar-search");
        if (input) input.focus();
      }, 0);
    } else {
      setSearchTerm("");
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchOpen(false);
  };

  return (
    <header className="border-b border-gray-100 p-2 fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="container mx-auto px-2 lg:px-7 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/pivotslogo.png"
              alt="PivotExcels Logo"
              width={180}
              height={60}
              className="h-16 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="text-black font-medium hover:border-b border-black"
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:border-b border-black"
            >
              Contact 24/7
            </Link>
            <Link
              href="/products"
              className="text-gray-600 hover:border-b border-black"
            >
              Products
            </Link>
          </div>
        </div>

        {/* Right side (Desktop) */}
        <div className="hidden md:flex items-center space-x-6 relative">
          {/* Search - Desktop */}
          <div className="relative" ref={searchRef}>
            {searchOpen ? (
              <div className="absolute right-0 top-0 mt-12 w-96 bg-white shadow-lg rounded-md z-50 border border-gray-200">
                <div className="relative">
                  <input
                    id="navbar-search"
                    type="text"
                    placeholder="Search products..."
                    className="w-full p-3 pl-10 pr-10 border-0 rounded-t-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    autoComplete="off"
                  />
                  <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  )}
                </div>
                {(isSearching || productsLoading) && (
                  <div className="p-4 text-center text-gray-500">
                    Searching...
                  </div>
                )}
                {!isSearching && filteredProducts.length > 0 && (
                  <div className="border-t border-gray-200 max-h-80 overflow-y-auto">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Products
                    </div>
                    {filteredProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product/${product.slug}`}
                        className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 group"
                        onClick={clearSearch}
                      >
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
                          <img
                            src={product.images?.[0]?.url || "/placeholder.png"}
                            alt={product.title}
                            className="h-full w-full object-contain"
                          />
                        </div>
                        <div className="ml-3 flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate group-hover:text-blue-600">
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
                        <FiChevronRight className="ml-2 text-gray-400 group-hover:text-blue-600" />
                      </Link>
                    ))}
                  </div>
                )}
                {!isSearching && debouncedSearchTerm && filteredProducts.length === 0 && (
                  <div className="p-4 text-center text-gray-500">
                    No products found for "{debouncedSearchTerm}"
                  </div>
                )}
              </div>
            ) : null}
            <button
              onClick={handleSearchClick}
              className={`text-gray-600 hover:bg-transparent transition transform duration-200 hover:scale-110 ${searchOpen ? 'text-blue-600' : ''}`}
              aria-label="Search"
            >
              <FiSearch className="h-6 w-6" />
            </button>
          </div>

          {/* Auth Section */}
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-pulse rounded-full h-8 w-8 bg-gray-200"></div>
              <div className="animate-pulse h-4 w-20 bg-gray-200 rounded"></div>
            </div>
          ) : user ? (
            <div className="flex items-center space-x-3 group relative">
              <div className="flex items-center space-x-2 cursor-pointer">
                <Image
                  src={user.picture || "/default-avatar.png"}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-transparent hover:border-blue-500 transition-all"
                />
                <span className="text-sm font-medium text-gray-700 hidden lg:inline-block">
                  {user.name?.split(" ")[0]}
                </span>
              </div>

              {/* Dropdown menu */}
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Orders
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link href="/api/auth/login">
                <Button variant="outline" className="flex items-center space-x-1 cursor-pointer">
                  <FiUser className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            </div>
          )}

          {/* Shopping Bag */}
          <div className="relative">
            <Link href="/cart">
              <button className="text-gray-600 cursor-pointer hover:bg-transparent transition transform duration-200 hover:scale-110">
                <FiShoppingBag className="h-5 w-5" />
              </button>
            </Link>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

          {/* Language & Currency */}
          <LanguageCurrencySelector />
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={handleSearchClick}
            className={`text-gray-600 hover:bg-transparent ${searchOpen ? 'text-blue-600' : ''}`}
            aria-label="Search"
          >
            <FiSearch className="h-5 w-5" />
          </button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMenuOpen(!menuOpen)}
            className="hover:bg-transparent"
          >
            {menuOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Search (Full Width) */}
      {searchOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 border-t border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoComplete="off"
            />
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                <FiX className="h-4 w-4" />
              </button>
            )}
          </div>
          {(isSearching || productsLoading) && (
            <div className="p-4 text-center text-gray-500">
              Searching...
            </div>
          )}
          {!isSearching && filteredProducts.length > 0 && (
            <div className="mt-2 bg-white border border-gray-200 rounded-md shadow-sm max-h-60 overflow-y-auto">
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  className="flex items-center p-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                  onClick={clearSearch}
                >
                  <div className="flex-shrink-0 h-10 w-10 bg-gray-50 rounded-md overflow-hidden flex items-center justify-center">
                    <img
                      src={product.images?.[0]?.url || "/placeholder.png"}
                      alt={product.title}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
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
                  <FiChevronRight className="ml-2 text-gray-400" />
                </Link>
              ))}
            </div>
          )}
          {!isSearching && debouncedSearchTerm && filteredProducts.length === 0 && (
            <div className="p-4 text-center text-gray-500">
              No products found for "{debouncedSearchTerm}"
            </div>
          )}
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && !searchOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow-lg rounded-b-lg">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-black font-medium py-2 hover:bg-gray-50 px-2 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-black hover:bg-gray-50 py-2 px-2 rounded"
              onClick={() => setMenuOpen(false)}
            >
              Contact 24/7
            </Link>
            <Link
              href="/cart"
              className="flex items-center text-gray-600 hover:text-black hover:bg-gray-50 py-2 px-2 rounded"
              onClick={() => setMenuOpen(false)}
            >
              <FiShoppingBag className="h-5 w-5 mr-2" />
              Cart {totalItems > 0 && `(${totalItems})`}
            </Link>

            {/* Auth - Mobile */}
            {isLoading ? (
              <div className="flex items-center space-x-2 py-2 px-2">
                <div className="animate-pulse rounded-full h-8 w-8 bg-gray-200"></div>
                <div className="animate-pulse h-4 w-24 bg-gray-200 rounded"></div>
              </div>
            ) : user ? (
              <>
                <div className="flex items-center space-x-3 py-3 px-2 border-t border-gray-100 mt-2">
                  <Image
                    src={user.picture || "/default-avatar.png"}
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-blue-500"
                  />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Link
                  href="/profile"
                  className="text-sm text-gray-700 hover:bg-gray-50 py-2 px-2 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="text-sm text-gray-700 hover:bg-gray-50 py-2 px-2 rounded"
                  onClick={() => setMenuOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="flex items-center text-sm text-red-600 hover:bg-gray-50 py-2 px-2 rounded mt-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </Link>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                <Link
                  href="/api/auth/login"
                  className="w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/api/auth/signup"
                  className="w-full text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
                  onClick={() => setMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <LanguageCurrencySelector />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}