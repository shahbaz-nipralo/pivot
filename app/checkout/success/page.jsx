'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function SuccessPage() {
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
      <div style={styles.container}>
        <p style={styles.loading}>Loading your payment info...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>⚠️ Error</h1>
          <p style={styles.message}>{error}</p>
          <a href="/" style={styles.button}>Go to Homepage</a>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎉 Payment Successful!</h1>
        <p style={styles.message}>
          Thank you for your purchase! Your payment has been successfully processed.
        </p>
        {session?.customer_email && (
          <p style={styles.message}>
            A confirmation has been sent to <strong>{session.customer_email}</strong>.
          </p>
        )}
        <a href="/" style={styles.button}>Go to Homepage</a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f4f8',
    padding: '1rem',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '2rem',
    maxWidth: '500px',
    width: '100%',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#2d3748',
  },
  message: {
    fontSize: '1.1rem',
    margin: '0.5rem 0',
    color: '#4a5568',
  },
  loading: {
    fontSize: '1.2rem',
    color: '#555',
  },
  button: {
    display: 'inline-block',
    marginTop: '1.5rem',
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#3182ce',
    color: '#fff',
    borderRadius: '8px',
    textDecoration: 'none',
  },
};
