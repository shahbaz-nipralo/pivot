"use client";
import Link from "next/link";

export default function CartIcon({ totalItems }) {
  return (
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
  );
}