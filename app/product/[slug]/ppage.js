"use client";

import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useGeoLocation } from "@/lib/useGeoLocation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  const { addItem } = useCart();
  const { location, loading: geoLoading } = useGeoLocation();
  const isINR = location?.country === "IN";

  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:1337/api/products?filters[slug][$eq]=${slug}&populate=*`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("data", data)
        if (data.data && data.data.length > 0) {
          setProduct(data.data[0]); // Save just the product object
        } else {
          setError("Product not found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  console.log(product)
  // const { data } = product;
  const imageUrl = product?.images[0]?.url;

  console.log(imageUrl)

  return (
    <div className="max-w-6xl mx-auto p-4 mt-1">
      {/* Back Button */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium transition-all duration-300 transform hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        <div className="w-full">
          {imageUrl ? (
            <Image
              src={imageUrl}
              // alt={attributes.title}
              width={600}
              height={600}
              className="object-cover rounded-md"
            />
          ) : (
            <div>No image available</div>
          )}
        </div>
        <div>
          {/* <h1 className="text-2xl font-bold">{attributes.title}</h1> */}
          {/* More product details here */}
        </div>
      </div>
    </div>
  );
}
