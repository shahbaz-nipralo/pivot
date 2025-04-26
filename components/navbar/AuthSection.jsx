"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import useUserData from "@/hooks/useUserData";

export default function AuthSection({ isMobile = false, onLinkClick = () => {} }) {
  const { userData, error, loading } = useUserData();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (loading) {
    return (
      <div className={`flex items-center space-x-2 ${isMobile ? 'py-2 px-2' : ''}`}>
        <div className="animate-pulse rounded-full h-8 w-8 bg-gray-200"></div>
        {!isMobile && <div className="animate-pulse h-4 w-20 bg-gray-200 rounded"></div>}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{`Error: ${error}`}</div>;
  }

  if (userData) {
    return (
      <>
        {isMobile ? (
          <>
            <div className="flex items-center space-x-3 py-3 px-2 border-t border-gray-100 mt-2">
              <Image
                src={userData.picture || "/default-avatar.png"}
                alt="User"
                width={40}
                height={40}
                className="rounded-full border-2 border-blue-500"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{userData.name}</p>
                <p className="text-xs text-gray-500">{userData.email}</p>
              </div>
            </div>
            <Link
              href="/profile"
              className="text-sm text-gray-700 hover:bg-gray-50 py-2 px-2 rounded"
              onClick={onLinkClick}
            >
              My Profile
            </Link>
            <Link
              href="/orders"
              className="text-sm text-gray-700 hover:bg-gray-50 py-2 px-2 rounded"
              onClick={onLinkClick}
            >
              My Orders
            </Link>
            <Link
              href="/api/auth/logout"
              className="flex items-center text-sm text-red-600 hover:bg-gray-50 py-2 px-2 rounded mt-2"
              onClick={onLinkClick}
            >
              <FiLogOut className="mr-2" />
              Logout
            </Link>
          </>
        ) : (
          <div className="flex items-center space-x-3 group relative">
            <div 
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <Image
                src={userData.picture || "/default-avatar.png"}
                alt="User"
                width={32}
                height={32}
                className="rounded-full border-2 border-transparent hover:border-blue-500 transition-all"
              />
              <span className="text-sm font-medium text-gray-700 hidden lg:inline-block">
                {userData.name?.split(" ")[0]}
              </span>
            </div>

            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/orders"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  My Orders
                </Link>
                <Link
                  href="/api/auth/logout"
                  className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  onClick={() => setDropdownOpen(false)}
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </Link>
              </div>
            )}
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
          <Link
            href="/api/auth/login"
            className="w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={onLinkClick}
          >
            Login
          </Link>
          <Link
            href="/api/auth/signup"
            className="w-full text-center py-2 px-4 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition"
            onClick={onLinkClick}
          >
            Sign Up
          </Link>
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
    </>
  );
}
