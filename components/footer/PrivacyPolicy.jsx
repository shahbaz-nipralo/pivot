import React from 'react';
import { ShieldCheck, Lock, FileText, Users, AlertTriangle, RefreshCcw, Mail } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-white mt-14">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl text-[rgb(47,102,134)]">
              <ShieldCheck className="inline-block w-8 h-8 mr-2 text-[rgb(47,102,134)]" /> Privacy Policy
            </h1>
            <p className="max-w-[900px] text-gray-600 md:text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 text-gray-700">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-[rgb(47,102,134)] mb-3 flex items-center"><FileText className="mr-2" />1. Introduction</h2>
            <p>
              Welcome to ExcelHub. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you use our services.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-[rgb(47,102,134)] mb-3 flex items-center"><Users className="mr-2" />2. Information We Collect</h2>
            <p className="mb-2">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Personal identification information (Name, email address, etc.)</li>
              <li>Payment information for purchases</li>
              <li>Usage data and preferences</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-[rgb(47,102,134)] mb-3 flex items-center"><FileText className="mr-2" />3. How We Use Your Information</h2>
            <p className="mb-2">We use the information we collect for various purposes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To provide and maintain our services</li>
              <li>To process transactions</li>
              <li>To improve user experience</li>
              <li>To communicate with you</li>
              <li>For security and fraud prevention</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-[rgb(47,102,134)] mb-3 flex items-center"><Lock className="mr-2" />4. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-[rgb(47,102,134)] mb-3 flex items-center"><Users className="mr-2" />5. Third-Party Services</h2>
            <p>
              We may employ third-party companies to facilitate our services, process payments, or perform service-related services. These third parties have access to your information only to perform these tasks on our behalf.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-[rgb(47,102,134)] mb-3 flex items-center"><RefreshCcw className="mr-2" />6. Changes to This Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-semibold text-[rgb(47,102,134)] mb-3 flex items-center"><Mail className="mr-2" />7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at <a href="mailto:privacy@pivot.com" className="text-blue-600 underline">privacy@pivot.com</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PrivacyPolicy;