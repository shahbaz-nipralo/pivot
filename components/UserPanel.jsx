"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock purchase data
const purchaseHistory = [
  {
    id: "ORD-12345",
    date: "2023-11-15",
    items: ["Excel Budget Template", "Project Timeline Template"],
    total: 49.99,
    status: "Completed",
  },
  {
    id: "ORD-12346",
    date: "2023-10-22",
    items: ["Google Sheets CRM Template"],
    total: 29.99,
    status: "Completed",
  },

]

export function UserPanel() {
  const [activeTab, setActiveTab] = useState("purchases")

  const handleLogout = () => {
    // Implement logout functionality here
    console.log("User logged out")
    // Redirect to login page or home page
  }

  return (
    <div className="max-w-3xl mx-auto mt-14">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Account</h1>
        <Button variant="destructive" onClick={handleLogout} className="bg-red-500 hover:bg-red-600">
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

      <div className="grid grid-cols-1 gap-6">
        {/* Simple tab buttons */}
        <div className="flex border-b">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "purchases" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("purchases")}
          >
            Purchase History
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "settings" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
        </div>

        {/* Purchase History */}
        {activeTab === "purchases" && (
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchaseHistory.map((purchase) => (
                  <div key={purchase.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="font-medium">{purchase.id}</div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {purchase.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-gray-500 mb-2">Purchased on {purchase.date}</div>
                    <div className="border-t pt-2 mt-2">
                      <div className="text-sm font-medium mb-1">Items:</div>
                      <ul className="list-disc list-inside text-sm text-gray-600">
                        {purchase.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      {/* <Button variant="outline" size="sm">
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
                          className="lucide lucide-download mr-2"
                        >
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="7 10 12 15 17 10" />
                          <line x1="12" x2="12" y1="15" y2="3" />
                        </svg>
                        Download
                      </Button> */}
                      <div className="font-medium">${purchase.total}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Settings */}
        {activeTab === "settings" && (
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <input type="text" className="w-full mt-1 px-3 py-2 border rounded-md" defaultValue="John Doe" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email Address</label>
                      <input
                        type="email"
                        className="w-full mt-1 px-3 py-2 border rounded-md"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Password</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Current Password</label>
                      <input type="password" className="w-full mt-1 px-3 py-2 border rounded-md" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">New Password</label>
                      <input type="password" className="w-full mt-1 px-3 py-2 border rounded-md" />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
