import React from "react";
import {
  FileText,
  Info,
  ShieldCheck,
  DollarSign,
  AlertCircle,
  Gavel,
  Lock,
  RefreshCcw,
  Globe,
  Mail,
} from "lucide-react";

const sections = [
  {
    title: "Acceptance of Terms",
    icon: <FileText className="text-sky-700 w-6 h-6" />,
    content:
      "By accessing or using ExcelHub's services, templates, or website, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must not use our services.",
  },
  {
    title: "Description of Service",
    icon: <Info className="text-sky-700 w-6 h-6" />,
    content:
      "ExcelHub provides downloadable Excel templates and related digital products for personal and business use. Our services include template customization support and educational resources.",
  },
  {
    title: "User Responsibilities",
    icon: <ShieldCheck className="text-sky-700 w-6 h-6" />,
    content: (
      <>
        As a user of our services, you agree to:
        <ul className="list-disc pl-6 mt-2 space-y-1">
          <li>Use templates only for lawful purposes</li>
          <li>Not redistribute, resell, or modify our templates for commercial purposes without permission</li>
          <li>Provide accurate information when creating an account</li>
          <li>Maintain the confidentiality of your account credentials</li>
        </ul>
      </>
    ),
  },
  {
    title: "Intellectual Property",
    icon: <Lock className="text-sky-700 w-6 h-6" />,
    content:
      "All ExcelHub templates, content, and materials are protected by copyright and other intellectual property laws. You receive a limited, non-exclusive, non-transferable license to use purchased templates for your personal or business use.",
  },
  {
    title: "Payments and Refunds",
    icon: <DollarSign className="text-sky-700 w-6 h-6" />,
    content:
      "All template purchases are final. We offer refunds only in exceptional circumstances at our sole discretion. You are responsible for any taxes associated with your purchases.",
  },
  {
    title: "Disclaimer of Warranties",
    icon: <AlertCircle className="text-sky-700 w-6 h-6" />,
    content:
      'Our services are provided "as is" without warranties of any kind. ExcelHub does not guarantee that the templates will meet your specific requirements or that the service will be uninterrupted or error-free.',
  },
  {
    title: "Limitation of Liability",
    icon: <AlertCircle className="text-sky-700 w-6 h-6" />,
    content:
      "ExcelHub shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services, even if we have been advised of the possibility of such damages.",
  },
  {
    title: "Modifications to Terms",
    icon: <RefreshCcw className="text-sky-700 w-6 h-6" />,
    content:
      "We reserve the right to modify these terms at any time. Continued use of our services after such changes constitutes your acceptance of the new terms.",
  },
  {
    title: "Governing Law",
    icon: <Gavel className="text-sky-700 w-6 h-6" />,
    content:
      "These terms shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.",
  },
  {
    title: "Contact Information",
    icon: <Mail className="text-sky-700 w-6 h-6" />,
    content:
      "For any questions about these Terms of Service, please contact us at legal@excelhub.com.",
  },
];

const TermsService = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-gray-50 mt-12">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center text-center space-y-4 mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-sky-800">
            Terms of Service
          </h1>
          <p className="text-gray-600 md:text-lg">
            Effective Date: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100"
            >
              <div className="flex items-center space-x-3 mb-4">
                {section.icon}
                <h2 className="text-xl sm:text-2xl font-semibold text-sky-700">
                  {index + 1}. {section.title}
                </h2>
              </div>
              <div className="text-gray-700 text-sm sm:text-base leading-relaxed">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TermsService;
