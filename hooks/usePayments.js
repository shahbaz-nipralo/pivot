// hooks/usePayments.js
"use client";

import axios from "axios";
import { useState, useEffect } from "react";

const usePayments = (email) => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments`
        );
        setPayments(response.data.data || []); // Default to an empty array if no data
      } catch (err) {
        setError("Failed to fetch payment data");
        console.error("Error fetching payments:", err);
        setPayments([]); // Default to an empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, [email]);

  return { payments, loading, error };
};

export default usePayments;
