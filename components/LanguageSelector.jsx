"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { GB, US, IN, FR, DE, ES, CN, JP } from "country-flag-icons/react/3x2";

const languages = [
  { code: "en", name: "English", flag: <GB className="w-5 h-5" />, countries: ["GB", "US", "AU"] },
  { code: "fr", name: "French", flag: <FR className="w-5 h-5" />, countries: ["FR", "BE", "CA"] },
  { code: "de", name: "German", flag: <DE className="w-5 h-5" />, countries: ["DE", "AT", "CH"] },
  { code: "es", name: "Spanish", flag: <ES className="w-5 h-5" />, countries: ["ES", "MX", "AR"] },
  { code: "hi", name: "Hindi", flag: <IN className="w-5 h-5" />, countries: ["IN"] },
  { code: "zh", name: "Chinese", flag: <CN className="w-5 h-5" />, countries: ["CN"] },
  { code: "ja", name: "Japanese", flag: <JP className="w-5 h-5" />, countries: ["JP"] },
];

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", countries: ["US", "CA", "AU"] },
  { code: "INR", name: "Indian Rupee", symbol: "₹", countries: ["IN"] },
];

export default function LanguageCurrencySelector() {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // Try multiple geolocation services as fallback
        const services = [
          'https://ipapi.co/json/',
          'https://ipwho.is/',
          'https://freeipapi.com/api/json'
        ];

        for (const service of services) {
          try {
            const response = await fetch(service);
            const data = await response.json();
            
            if (data.country_code) {
              const countryCode = data.country_code.toUpperCase();
              const language = languages.find(lang => lang.countries.includes(countryCode)) || languages[0];
              const currency = countryCode === "IN" 
                ? currencies.find(curr => curr.code === "INR")
                : currencies.find(curr => curr.code === "USD");
              
              setSelectedLanguage(language);
              setSelectedCurrency(currency);
              break;
            }
          } catch (err) {
            console.log(`Failed with ${service}:`, err);
            continue;
          }
        }
      } catch (err) {
        setError(err);
        console.error('All geolocation attempts failed:', err);
      } finally {
        setLoading(false);
      }
    };

    detectLocation();
  }, []);

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
            {selectedLanguage.flag}
          </div>
          <span>{selectedLanguage.name}</span>
          <span className="text-gray-300">/</span>
          <span>
            {selectedCurrency.symbol}
            {selectedCurrency.code}
          </span>
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4 space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Language</h3>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`flex items-center gap-2 p-2 rounded-md text-left cursor-pointer ${
                  selectedLanguage.code === lang.code
                    ? "bg-green-100 border"
                    : "hover:bg-green-200"
                }`}
                onClick={() => setSelectedLanguage(lang)}
              >
                <div className="w-5 h-5 flex items-center justify-center">
                  {lang.flag}
                </div>
                <span>{lang.name}</span>
              </button>
            ))}
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