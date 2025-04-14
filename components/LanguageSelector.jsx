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
import { useGeoLocation } from "../lib/useGeoLocation";

const languages = [
  {
    code: "en",
    name: "English",
    flag: <GB className="w-5 h-5" />,
    countries: ["GB", "US", "AU"],
  },
  {
    code: "fr",
    name: "French",
    flag: <FR className="w-5 h-5" />,
    countries: ["FR", "BE", "CA"],
  },
  {
    code: "de",
    name: "German",
    flag: <DE className="w-5 h-5" />,
    countries: ["DE", "AT", "CH"],
  },
  {
    code: "es",
    name: "Spanish",
    flag: <ES className="w-5 h-5" />,
    countries: ["ES", "MX", "AR"],
  },
  {
    code: "hi",
    name: "Hindi",
    flag: <IN className="w-5 h-5" />,
    countries: ["IN"],
  },
  {
    code: "zh",
    name: "Chinese",
    flag: <CN className="w-5 h-5" />,
    countries: ["CN"],
  },
  {
    code: "ja",
    name: "Japanese",
    flag: <JP className="w-5 h-5" />,
    countries: ["JP"],
  },
];

const currencies = [
  {
    code: "USD",
    name: "US Dollar",
    symbol: "$",
    countries: ["US", "CA", "AU"],
  },
  { code: "INR", name: "Indian Rupee", symbol: "₹", countries: ["IN"] },
];

const getDefaultSettings = (countryCode) => {
  const defaultLanguage =
    languages.find((lang) => lang.countries.includes(countryCode)) || languages[0];

  // Force USD for all countries except India (IN)
  const defaultCurrency =
    countryCode === "IN"
      ? currencies.find((curr) => curr.code === "INR")
      : currencies.find((curr) => curr.code === "USD");

  return { defaultLanguage, defaultCurrency };
};


export default function LanguageCurrencySelector() {
  const { location, loading } = useGeoLocation();
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (location?.country) {
      const { defaultLanguage, defaultCurrency } = getDefaultSettings(
        location.country
      );
      setSelectedLanguage(defaultLanguage);
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
