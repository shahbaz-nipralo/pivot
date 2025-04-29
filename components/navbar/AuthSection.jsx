"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import { FiUser, FiLogOut } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function AuthSection() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return <Button variant="outline" disabled>Loading...</Button>;
  }

  return (
    <div className="flex items-center">
      {user ? (
        <a href="/api/auth/logout">
          <Button variant="outline" className="flex items-center gap-1">
            <FiLogOut className="h-4 w-4" />
            <span>Logout</span>
          </Button>
        </a>
      ) : (
        <a href="/api/auth/login">
          <Button variant="outline" className="flex items-center gap-1">
            <FiUser className="h-4 w-4" />
            <span>Login</span>
          </Button>
        </a>
      )}
    </div>
  );
}