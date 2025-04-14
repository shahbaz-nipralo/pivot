import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center p-2">
        <div className="lg:pl-12 mb-4 lg:mb-46">
          <p className="text-[#15834A] font-medium  text-lg mb-3">
            50% OFF TODAY!
          </p>
          <h1 className="text-4xl md:text-[50px] font-extrabold mb-6">
            Double your work planning speed
          </h1>
          <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
            Complete tasks more quickly and efficiently by downloading and
            customizing over 140 spreadsheet templates. No Excel expertise is
            needed, no monthly fees apply, and no stress involved. Save valuable
            time with our ready-to-use templates
          </p>
          <Link href="/product-details">
          <Button className="bg-[#239E62] cursor-pointer hover:bg-green-700 shadow-xl text-white px-8 py-5 rounded-md text-[16px] font-semibold flex items-center gap-2 hover:scale-95 transition transform duration-150">
            <ArrowRight className="h-5 w-5" />
            Know More
          </Button>
          </Link>
        </div>

        <div className="relative">
          <Image
            src="/images/excel_templates.webp"
            alt="140+ Excel Templates Package"
            width={540}
            height={540}
            className="object-contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
