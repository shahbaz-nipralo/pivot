'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

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
        // Load Stripe.js
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51RF7PyCSD4ytQu4Db2kj5JSCCtHe2Ts1cZTPZMmZaW55064nTXL0kVfbA13IXeOOwYGRYZEv6F7WTj9Yz4hV3oAl00Spay1hOH');
        
        // Retrieve the session
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        setSession(session);
      } catch (err) {
        console.error('Error fetching Stripe session:', err);
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
          <h1 style={styles.title}>🎉 Payment Successful!</h1>
          <p style={styles.message}>
            Thank you for your purchase! Your payment has been successfully processed.
          </p>
          <p style={styles.message}>
            We've sent a confirmation to your email (if provided).
          </p>
          <a href="/" style={styles.button}>
            Go to Homepage
          </a>
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
        <p style={styles.message}>
          We've sent a confirmation to your email (if provided).
        </p>
        <a href="/" style={styles.button}>
          Go to Homepage
        </a>
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
    transition: 'background-color 0.3s ease',
    '&:hover': {
      backgroundColor: '#2c5282',
    },
  },
};