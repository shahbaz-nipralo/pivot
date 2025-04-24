"use client";
import Link from "next/link";

export default function LoginButton() {
  return (
    <div className="flex items-center space-x-2">
      <Link href="/api/auth/login">
        <Button variant="outline" className="flex items-center space-x-1 cursor-pointer">
          <FiUser className="h-4 w-4" />
          <span>Login</span>
        </Button>
      </Link>
    </div>
  );
}