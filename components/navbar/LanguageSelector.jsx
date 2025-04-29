"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { US, GB, IN, FR, DE, ES, CN, JP } from "country-flag-icons/react/3x2";
import { countries } from "countries-list";
import { useGeoLocation } from "@/lib/useGeoLocation";

// Country flag components mapping
const countryFlagComponents = {
  US: US,
  GB: GB,
  IN: IN,
  FR: FR,
  DE: DE,
  ES: ES,
  CN: CN,
  JP: JP,
};

// Convert countries object to array of supported countries
const supportedCountries = Object.entries(countries)
  .filter(([code]) => Object.keys(countryFlagComponents).includes(code))
  .map(([code, country]) => ({
    code,
    name: country.name,
    Flag: countryFlagComponents[code], // Using SVG flag component
    currency: code === "IN" ? "INR" : "USD"
  }));

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", countries: ["US", "GB", "FR", "DE", "ES", "JP"] },
  { code: "INR", name: "Indian Rupee", symbol: "₹", countries: ["IN"] },
];
const getDefaultSettings = (countryCode) => {
  // Always set default country to India (IN)
  const defaultCountry = supportedCountries.find(c => c.code === countryCode) || supportedCountries.find(c => c.code === "IN");
  const defaultCurrency = defaultCountry.code === "IN" 
    ? currencies.find(curr => curr.code === "INR")
    : currencies.find(curr => curr.code === "USD");
  return { defaultCountry, defaultCurrency };
};

export default function CountryCurrencySelector() {
  const { location, loading } = useGeoLocation();
  const [selectedCountry, setSelectedCountry] = useState(supportedCountries.find(c => c.code === "IN")); // Set default to India
  const [selectedCurrency, setSelectedCurrency] = useState(currencies.find(curr => curr.code === "INR")); // Set default currency to INR
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location?.country) {
      const { defaultCountry, defaultCurrency } = getDefaultSettings(location.country);
      setSelectedCountry(defaultCountry);
      setSelectedCurrency(defaultCurrency);
    }
  }, [location]);

  if (loading) {
    return (
      <Button
        variant="outline"
        className="flex items-center gap-1 rounded-full px-3 py-1 text-sm"
      >
        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse" />
        <span className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        <span className="text-gray-300">/</span>
        <span className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        <ChevronDown className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center gap-2 rounded-full !p-5 text-sm cursor-pointer shadow-md"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-5 h-5 flex items-center justify-center">
            <selectedCountry.Flag className="w-full h-full" />
          </div>
          <span>{selectedCountry.name}</span>
          <span className="text-gray-300">/</span>
          <span>
            {selectedCurrency.symbol}
            {selectedCurrency.code}
          </span>
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "transform rotate-180" : ""}`} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 space-y-4">
        <div className="text-center py-2">
          <p className="font-medium">Detected Location:</p>
          <p className="flex items-center justify-center gap-2 mt-1">
            <selectedCountry.Flag className="w-5 h-5" />
            <span>{selectedCountry.name}</span>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Country</h3>
          <div className="grid grid-cols-2 gap-2">
            {supportedCountries.map((country) => {
              const CountryFlag = country.Flag;
              return (
                <button
                  key={country.code}
                  className={`flex items-center gap-2 p-2 rounded-md text-left cursor-pointer ${
                    selectedCountry.code === country.code
                      ? "bg-green-100 border"
                      : "hover:bg-green-200"
                  }`}
                  onClick={() => {
                    setSelectedCountry(country);
                    const currency = country.code === "IN" 
                      ? currencies.find(curr => curr.code === "INR")
                      : currencies.find(curr => curr.code === "USD");
                    setSelectedCurrency(currency);
                  }}
                >
                  <div className="w-5 h-5 flex items-center justify-center">
                    <CountryFlag className="w-full h-full" />
                  </div>
                  <span>{country.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Currency</h3>
          <div className="space-y-2">
            {currencies.map((curr) => (
              <button
                key={curr.code}
                className={`flex items-center gap-2 p-2 rounded-md w-full ${
                  selectedCurrency.code === curr.code
                    ? "bg-green-100 border"
                    : "hover:bg-green-200"
                }`}
                onClick={() => setSelectedCurrency(curr)}
              >
                <span className="font-medium">{curr.symbol}</span>
                <span>{curr.name}</span>
                <span className="text-gray-500 ml-auto">({curr.code})</span>
              </button>
            ))}
          </div>
        </div>

        <Button
          className="w-full bg-[#239E62] cursor-pointer hover:bg-green-700"
          onClick={() => setIsOpen(false)}
        >
          Apply
        </Button>
      </PopoverContent>
    </Popover>
  );
}