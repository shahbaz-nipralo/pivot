'use client'
import { useState, useEffect } from 'react';

export const useGeoLocation = () => {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to get from browser geolocation first
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLoading(false);
        },
        (err) => {
          // Fallback to timezone detection
          const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          setLocation({
            country: timezone.includes('Asia/Kolkata') ? 'IN' : 'US',
            timezone
          });
          setLoading(false);
        }
      );
    } else {
      // Final fallback - assume US if no geolocation available
      setLocation({ country: 'US' });
      setLoading(false);
    }
  }, []);

  return { location, loading, error };
};