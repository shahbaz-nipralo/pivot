'use client'
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from 'react';
import axios from 'axios';
import HomePage from "@/components/homePage/HomePage";

export default function Home() {
  const { user, isLoading, error } = useUser(); // Fetch user data from Auth0

  // Function to store user data to Strapi
  useEffect(() => {
    if (user) {
      const storeUserData = async () => {
        try {
          const response = await fetch('/api/storeUser', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: user.email,
              username: user.name,
              auth0Id: user.sub,  // Assuming auth0Id is the `sub` field in the user object
            }),
          });

          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message || 'Failed to store user data');
          }

          console.log('User data stored:', data);
        } catch (error) {
          console.error('Error storing user data:', error);
        }
      };

      storeUserData();
    }
  }, [user]);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      {user ? (
        <>
          <h1>Welcome, {user.name}!</h1>
          <p>Email: {user.email}</p>
          <HomePage />
        </>
      ) : (
        <div>Please log in to view your profile.</div>
      )}
    </main>
  );
}
