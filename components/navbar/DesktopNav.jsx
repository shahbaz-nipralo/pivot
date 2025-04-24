"use client";
import { useCart } from "@/context/CartContext";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserDropdown from "./UserDropdown";
import LanguageCurrencySelector from "../LanguageSelector";
import SearchComponent from "./SearchComponent";
import Link from "next/link";
import CartIcon from "./CartIcon";
import { FiShoppingBag } from 'react-icons/fi';


export default function DesktopNav({ searchOpen, setSearchOpen }) {
  const { totalItems } = useCart();
  const { user, isLoading } = useUser();

  return (
    <div className="hidden md:flex items-center space-x-6 relative">
      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-6">
        <Link href="/" className="text-black font-medium hover:border-b border-black">
          Home
        </Link>
        <Link href="/contact" className="text-gray-600 hover:border-b border-black">
          Contact 24/7
        </Link>
        <Link href="/products" className="text-gray-600 hover:border-b border-black">
          Products
        </Link>
  
      </div>

      {/* Search */}
      <SearchComponent 
        desktop={true} 
        isOpen={searchOpen} 
        onClose={() => setSearchOpen(false)}
      />

      {/* Auth Section */}
      {isLoading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-pulse rounded-full h-8 w-8 bg-gray-200"></div>
          <div className="animate-pulse h-4 w-20 bg-gray-200 rounded"></div>
        </div>
      ) : user ? (
        <UserDropdown user={user} />
      ) : (
        <LoginButton />
      )}

      {/* Shopping Cart */}
      <CartIcon totalItems={totalItems} />

      {/* Language Selector */}
      <LanguageCurrencySelector />
    </div>
  );
}