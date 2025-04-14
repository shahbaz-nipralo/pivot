'use client'

import { useGeoLocation } from "@/lib/useGeoLocation";
import { useEffect, useState } from "react";

const CurrencyContext = createContext(null);

export const CurrencyProvider = ({ children }) => {
  const { location } = useGeoLocation();
  const [currency, setCurrency] = useState({ code: "USD", symbol: "$" });

  useEffect(() => {
    if (location?.country === "IN") {
      setCurrency({ code: "INR", symbol: "₹" });
    }
  }, [location]);

  return (
    <CurrencyContext.Provider value={currency}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
