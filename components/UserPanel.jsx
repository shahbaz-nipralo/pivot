"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  Loader2,
  CreditCard,
} from "lucide-react";


export function UserPanel() {
  const [activeTab, setActiveTab] = useState("profile");
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const { user, isLoading } = useUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || user.nickname || "",
        email: user.email || "",
        phone: profile.phone, // preserve existing
        address: profile.address, // preserve existing
      });
    }
  }, [user]);

  useEffect(() => {
    if (user?.email) {
      fetchPayments(user.email);
    }
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchPayments = async (email) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/payments?filters[customer_email][$eq]=${email}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error?.message || "Failed to fetch payments");
      }

      setPayments(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount, currency = "INR") => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto mt- px-4 sm:px-6 lg:px-8">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold">
            Please log in to view your profile
          </h2>
          <a href="/api/auth/login" className="mt-4 inline-block">
            <Button>Log In</Button>
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 mb-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
          My Account
        </h1>
        <Button
          variant="destructive"
          className="bg-red-500 hover:bg-red-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-log-out mr-2"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" x2="9" y1="12" y2="12" />
          </svg>
          Logout
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            className={`px-6 py-4 font-medium transition-colors cursor-pointer ${
              activeTab === "profile"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
          <button
            className={`px-6 py-4 font-medium transition-colors cursor-pointer ${
              activeTab === "payments"
                ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
            }`}
            onClick={() => setActiveTab("payments")}
          >
            Purchase History
          </button>
        </div>

        <div className="p-6">
          {/* Profile */}
          {activeTab === "profile" && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-200 dark:border-gray-700">
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                    {profile.name}
                  </h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleProfileChange}
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={profile.email}
                    readOnly
                    className="bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="phone" className="text-base">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={profile.phone}
                    onChange={handleProfileChange}
                    className="h-11"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="address" className="text-base">
                    Address
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={profile.address}
                    onChange={handleProfileChange}
                    className="h-11"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-6">
                <Button size="lg" className="px-6">
                  Save Changes
                </Button>
              </div>
            </div>
          )}

          {/* Payment History */}
          {activeTab === "payments" && (
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                {payments.length === 0 ? (
                  <div className="bg-gray-50 p-6 rounded-md text-center">
                    <p>No payments found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {payments.map((payment) => (
                      <div key={payment.id} className="p-4 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div className="font-medium">{payment.order_id}</div>
                          <Badge
                            variant="outline"
                            className={`${
                              payment?.payment_status === "paid"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : "bg-yellow-50 text-yellow-700 border-yellow-200"
                            }`}
                          >
                            {payment.payment_status}
                          </Badge>
                        </div>

                        <div className="text-sm text-gray-500 mb-2">
                          Paid on {new Date(payment?.createdAt).toLocaleDateString()}
                        </div>

                        <div className="border-t pt-2 mt-2">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500">Payment Method</p>
                              <p className="flex items-center gap-1 mt-1">
                                <CreditCard className="h-4 w-4" />
                                {payment?.payment_method}
                              </p>
                            </div>

                            <div>
                              <p className="text-gray-500">Currency</p>
                              <p className="mt-1">{payment.attributes?.currency}</p>
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <Button variant="outline" size="sm">
                            <Download className="mr-2 h-4 w-4 cursor-pointer" />
                            Download Invoice
                          </Button>
                          <div className="font-medium">
                            {formatCurrency(
                              parseFloat(payment?.amount),
                              payment.attributes?.currency
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}