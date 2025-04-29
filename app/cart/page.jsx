'use client'
// Updated CartPage.js
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function CartPage() {
  const {
    items: cartItems,
    removeItem,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useUser();
  function formatCurrency(amount) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  }

  const handleCheckout = async () => {
    if (!user) {
      router.push("/api/auth/login");
    // } else {
    //   // proceed to checkout page
    //   router.push("/checkout");
    }
    if (totalItems === 0) {
      alert("Your cart is empty.");
      return;
    }
  
    setLoading(true);
  
    try {
      // Prepare validated order items
      const orderItems = cartItems.map(item => {
        let priceValue = 0;
        
        if (typeof item.price === 'number') {
          priceValue = item.price;
        } else if (typeof item.price === 'string') {
          priceValue = parseFloat(item.price.replace(/[^0-9.-]/g, '')) || 0;
        } else if (item.price?.discounted_price) {
          priceValue = parseFloat(item.price.discounted_price) || 0;
        } else if (item.price?.original_price) {
          priceValue = parseFloat(item.price.original_price) || 0;
        }
        clearCart();
        return {
          id: item.id,
          name: item.name,
          price: priceValue,
          quantity: item.quantity || 1,
          image: item.images?.[0]?.url
        };
      });

      // Ensure total is a valid number
      const validatedTotal = typeof totalPrice === 'number' 
        ? totalPrice 
        : parseFloat(totalPrice) || 0;

      if (validatedTotal <= 0) {
        throw new Error('Invalid total amount - must be greater than 0');
      }

      console.log('Submitting order:', {
        items: orderItems,
        totalAmount: validatedTotal
      });

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`,
        {
          items: orderItems,
          totalAmount: validatedTotal,
        },
        {
          headers: {
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (data.error) {
        throw new Error(data.error.message || 'Checkout failed');
      }

      if (!data.sessionUrl) {
        throw new Error('No checkout session URL received');
      }

      window.location.href = data.sessionUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      alert(
        `Checkout failed: ${error.response?.data?.error?.message || error.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart ({totalItems} items)</h1>
        <Link
          href="/products"
          className="text-rose-700 hover:underline font-medium"
        >
          Continue shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/products">
            <Button>Browse products</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-12 py-4 text-sm font-medium text-gray-500">
              <div className="col-span-9">PRODUCT</div>
              <div className="col-span-3 text-right">PRICE</div>
            </div>

            {cartItems.map((item) => {
              let priceValue = 0;
              
              if (typeof item.price === 'number') {
                priceValue = item.price;
              } else if (typeof item.price === 'string') {
                priceValue = parseFloat(item.price.replace(/[^0-9.-]/g, '')) || 0;
              } else if (item.price?.discounted_price) {
                priceValue = parseFloat(item.price.discounted_price) || 0;
              } else if (item.price?.original_price) {
                priceValue = parseFloat(item.price.original_price) || 0;
              }

              return (
                <div
                  key={item.uniqueId}
                  className="grid grid-cols-12 py-6 border-t border-gray-200 items-center"
                >
                  <div className="col-span-9 flex gap-4">
                    <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                      <Image
                        src={item.images?.[0]?.url || "/placeholder.svg"}
                        alt={item.name}
                        width={120}
                        height={150}
                        className="object-contain w-full h-full"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <button
                        onClick={() => removeItem(item.uniqueId)}
                        className="mt-2 flex items-center text-gray-500 hover:text-gray-700 cursor-pointer"
                      >
                        <Trash2 size={18} className="mr-1" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>

                  <div className="col-span-3 text-right font-medium">
                    {formatCurrency(priceValue * (item.quantity || 1))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex justify-end">
              <div className="w-full max-w-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-lg">Subtotal</span>
                  <span className="font-medium text-lg">
                    {formatCurrency(totalPrice)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 text-right mb-6">
                  Taxes calculated at checkout.
                </p>

                <Button
                  className="w-full py-6 mb-3 bg-black hover:bg-gray-800 text-white rounded cursor-pointer transition-all duration-300 shadow-md"
                  onClick={handleCheckout}
                  disabled={loading}
                >
                  {loading ? "Processing..." : `Check out (${totalItems} items)`}
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}