"use client";

import { useState } from "react";
import Link from "next/link";
import { FiSearch, FiUser, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import LanguageCurrencySelector from "./LanguageSelector";
import { useCart } from "@/context/CartContext"; // Import the useCart hook
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart(); // Get the totalItems from cart context

  return (
    <header className="border-b border-gray-100 p-2">
      <div className="container mx-auto px-2 lg:px-22 flex items-center justify-between h-20">
        {/* Logo */}
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/pivotslogo.png" // Make sure extension is correct
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
              className="text-black border-b font-medium hover:border-b border-black"
            >
              Home
            </Link>
            <button
              href="/contact"
              className="text-gray-600 hover:border-b border-black cursor-pointer"
            >
              Contact 24/7
            </button>
          </div>
        </div>

        {/* Right side */}
        <div className="hidden md:flex items-center space-x-6 relative">
          {/* Search Icon */}
          <button className="text-gray-600 hover:bg-transparent flex items-center justify-center transition transform duration-200 hover:scale-110 cursor-pointer">
            <FiSearch className="h-6 w-6" />
          </button>

          {/* User Icon */}
          <button className="text-gray-600 hover:bg-transparent flex items-center justify-center transition transform duration-200 hover:scale-110 cursor-pointer">
            <FiUser className="h-6 w-6" />
          </button>

          {/* Shopping Bag Icon - Now with Link and dynamic count */}
          <div className="relative">
            <Link href="/cart" passHref>
              <button className="text-gray-600 hover:bg-transparent flex items-center justify-center transition transform duration-200 hover:scale-110 cursor-pointer">
                <FiShoppingBag className="h-5 w-5" />
              </button>
            </Link>
            {/* Dynamic cart count - only shows if items exist */}
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </div>

          {/* Language and Currency Selector */}
          <div className="flex items-center">
            <LanguageCurrencySelector />
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
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

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col space-y-3">
            <Link href="/" className="text-black font-medium py-2">
              Home
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-black py-2"
            >
              Contact 24/7
            </Link>
            {/* Add cart link to mobile menu */}
            <Link
              href="/cart"
              className="flex items-center text-gray-600 hover:text-black py-2"
            >
              <FiShoppingBag className="h-5 w-5 mr-2" />
              Cart {totalItems > 0 && `(${totalItems})`}
            </Link>
            <div className="pt-4">
              <LanguageCurrencySelector />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
