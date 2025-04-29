"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiShoppingBag, FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import LanguageCurrencySelector from "./LanguageSelector";
import { useCart } from "@/context/CartContext";
import SearchBar from "./SearchBar";
import AuthSection from "./AuthSection";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const searchRef = useRef(null);

  const handleSearchClick = () => {
    setSearchOpen(!searchOpen);
    if (!searchOpen) {
      setTimeout(() => {
        const input = document.getElementById("navbar-search");
        if (input) input.focus();
      }, 0);
    }
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
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
          <div className="hidden md:block relative" ref={searchRef}>
            {searchOpen && <SearchBar />}
            <button onClick={handleSearchClick}>
              <FiSearch className="h-4 w-4 cursor-pointer " />
            </button>
          </div>
          {/* Auth Section */}
          <AuthSection />

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
            className={`text-gray-600 hover:bg-transparent ${
              searchOpen ? "text-blue-600" : ""
            }`}
            aria-label="Search"
          >
            <FiSearch className="h-4 w-4" />
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

      {/* Mobile Search */}
      {searchOpen && (
        <div className="md:hidden">
          <SearchBar isMobile />
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && !searchOpen && (
        <div className="md:hidden px-4 pb-4 bg-white shadow-lg rounded-b-lg">
          <nav className="flex flex-col space-y-3">
            <Link
              href="/"
              className="text-black font-medium py-2 hover:bg-gray-50 px-2 rounded"
              onClick={handleLinkClick}
            >
              Home
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 hover:text-black hover:bg-gray-50 py-2 px-2 rounded"
              onClick={handleLinkClick}
            >
              Contact 24/7
            </Link>
            <Link
              href="/cart"
              className="flex items-center text-gray-600 hover:text-black hover:bg-gray-50 py-2 px-2 rounded"
              onClick={handleLinkClick}
            >
              <FiShoppingBag className="h-5 w-5 mr-2" />
              Cart {totalItems > 0 && `(${totalItems})`}
            </Link>

            {/* Auth - Mobile */}
            <AuthSection isMobile onLinkClick={handleLinkClick} />

            <div className="pt-4 border-t border-gray-100">
              <LanguageCurrencySelector />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
