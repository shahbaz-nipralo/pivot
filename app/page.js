'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HomePage from "@/components/homePage/HomePage";

export default function Home() {
  const { user, isLoading, error } = useUser();
  const router = useRouter();
  const [storingData, setStoringData] = useState(false);

  useEffect(() => {
    if (user && !storingData) {
      setStoringData(true);
      const handleUserData = async () => {
        try {
          const response = await fetch('/api/storeUser', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: user.email,
              username: user.name,
              auth0Id: user.sub,
            }),
          });

          if (!response.ok) throw new Error('Failed to store user data');
          
          router.push('/profile');
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setStoringData(false);
        }
      };
      handleUserData();
    }
  }, [user, router, storingData]);

  if (isLoading || storingData) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <HomePage />
    </main>
  );
}