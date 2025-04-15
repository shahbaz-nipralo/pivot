"use client";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items: cartItems,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const formatCurrency = (amount) => {
    return `Rs. ${amount.toFixed(2)}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your Cart ({totalItems} items)</h1>
        <Link href="/products" className="text-rose-700 hover:underline font-medium">
          Continue shopping
        </Link>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-600 mb-4">Your cart is empty</p>
          <Link href="/">
            <Button>Browse products</Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-12 py-4 text-sm font-medium text-gray-500">
              <div className="col-span-6">PRODUCT</div>
              <div className="col-span-3 text-center">QUANTITY</div>
              <div className="col-span-3 text-right">TOTAL</div>
            </div>

            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 py-6 border-t border-gray-200 items-center">
                <div className="col-span-6 flex gap-4">
                  <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={120}
                      height={150}
                      className="object-contain w-full h-full"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-gray-600 mt-1">{formatCurrency(item.price)} each</p>
                  </div>
                </div>

                <div className="col-span-3 flex justify-center">
                  <div className="flex border border-gray-300 rounded">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-3 py-1 border-r border-gray-300"
                    >
                      <Minus size={16} />
                    </button>
                    <input
                      type="text"
                      value={item.quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        if (!isNaN(val)) updateQuantity(item.id, val);
                      }}
                      className="w-12 text-center"
                    />
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 border-l border-gray-300"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="ml-4 text-gray-400 hover:text-gray-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="col-span-3 text-right font-medium">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t border-gray-200 pt-8">
            <div className="flex justify-end">
              <div className="w-full max-w-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-lg">Subtotal</span>
                  <span className="font-medium text-lg">{formatCurrency(totalPrice)}</span>
                </div>
                <p className="text-sm text-gray-500 text-right mb-6">
                  Taxes and shipping calculated at checkout.
                </p>

                <Button className="w-full py-6 mb-3 bg-black hover:bg-gray-800 text-white rounded">
                  Check out ({totalItems} items)
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}