// hooks/useProductDisplay.js
import { Star } from "lucide-react";

export function useProductDisplay(product) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderRating = () => {
    const ratingMap = {
      one: 1,
      two: 2,
      three: 3,
      four: 4,
      five: 5,
    };

    const stars = [];
    const ratingValue = ratingMap[product?.rating] || 0;

    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`h-4 w-4 ${
            i <= ratingValue
              ? "fill-yellow-400 text-yellow-400"
              : "text-gray-300"
          }`}
        />
      );
    }

    return stars;
  };

  const calculateDiscountPercentage = () => {
    if (!product?.price?.discounted_price || !product?.price?.original_price) {
      return 0;
    }

    return Math.round(
      (1 -
        parseFloat(product.price.discounted_price.replace("$", "")) /
          parseFloat(product.price.original_price.replace("$", ""))) *
        100
    );
  };

  return {
    formattedDate: product ? formatDate(product.publishedAt) : "",
    renderRating,
    discountPercentage: calculateDiscountPercentage(),
  };
}