import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

export default function Hero() {
  return (
    <section className="w-full py-4 md:py-6 lg:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6">
            {/* <div className="inline-flex items-center rounded-lg bg-[#2F6686]/10 px-3 py-1 text-sm font-medium text-[#2F6686]">
              <FileSpreadsheet className="mr-1 h-4 w-4" />
              Professional Excel Templates
            </div> */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#2F6686]">
              Excel Templates That Boost Your Productivity
            </h1>
            <p className="text-gray-600 md:text-xl max-w-2xl">
              Save time and effort with our professionally designed, ready-to-use Excel templates for business, finance, project management, and more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-[#2F6686] hover:bg-[#245573] text-white text-lg px-8 py-6">
                Browse Templates
              </Button>
              {/* <Button
                variant="outline"
                className="border-[#2F6686] text-[#2F6686] hover:bg-[#2F6686]/10 text-lg px-8 py-6"
              >
                Learn More
              </Button> */}
            </div>
          </div>

          {/* Right: Stats Box */}
          <div className="relative p-6 bg-white rounded-2xl shadow-md border border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "140+", label: "Excel Templates" },
                { value: "11", label: "Categories" },
                { value: "5k+", label: "Happy Users" },
                { value: "4.9", label: "Average Rating" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#2F6686]/5 rounded-lg p-4 flex flex-col items-center justify-center text-center"
                >
                  <span className="text-4xl font-bold text-[#2F6686]">{stat.value}</span>
                  <span className="text-sm text-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
