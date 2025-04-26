import Link from "next/link";
import { FileSpreadsheet } from "lucide-react";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <Image
              src="/images/pivotslogo.png"
              alt="PivotExcels Logo"
              width={160}
              height={40}
              className="h-16 w-auto"
            />
          </Link>
        </div>
        <p className="text-center text-sm text-gray-500 md:text-left">
          &copy; {new Date().getFullYear()} Pivots. All rights reserved.
        </p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-[#2F6686]">
            Privacy Policy
          </Link>
          <Link href="terms-services" className="text-sm text-gray-500 hover:text-[#2F6686]">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
