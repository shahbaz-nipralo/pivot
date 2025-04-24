'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        setError('No session ID found');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/stripe-session?session_id=${sessionId}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch session');
        }

        setSession(data);
      } catch (err) {
        console.error('Error fetching session from Strapi:', err);
        setError('Failed to load payment details');
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <p className="text-lg text-gray-600">Loading your payment info...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">⚠️ Error</h1>
          <p className="text-gray-700 mb-4">{error}</p>
          <a
            href="/"
            className="inline-block mt-4 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Go to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">🎉 Payment Successful!</h1>
        <p className="text-gray-700 mb-2">
          Thank you for your purchase! Your payment has been successfully processed.
        </p>
        {session?.customer_email && (
          <p className="text-gray-700">
            A confirmation has been sent to <strong>{session.customer_email}</strong>.
          </p>
        )}
        <a
          href="/"
          className="inline-block mt-6 px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Go to Homepage
        </a>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
          <p className="text-lg text-gray-600">Loading...</p>
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
