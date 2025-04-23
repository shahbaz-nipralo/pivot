'use client';
import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Login() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  return (
    <nav>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <a href="/api/auth/logout">Logout</a>
        </>
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
    </nav>
  );
}
