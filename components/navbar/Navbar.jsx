"use client";
import { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import SearchComponent from "./SearchComponent";
import Link from "next/link";
import Image from "next/image";
import { FiShoppingBag } from 'react-icons/fi';


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

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
        </div>

        {/* Desktop Navigation */}
        <DesktopNav 
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
          menuOpen={menuOpen}
        />

        {/* Mobile Navigation */}
        <MobileNav 
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          searchOpen={searchOpen}
          setSearchOpen={setSearchOpen}
        />
      </div>

      {/* Mobile Search Component */}
      {searchOpen && (
        <SearchComponent 
          mobile={true} 
          onClose={() => setSearchOpen(false)}
        />
      )}
    </header>
  );
}