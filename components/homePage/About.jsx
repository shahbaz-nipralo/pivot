import { BarChart2, FileSpreadsheet, Users, Award, Target } from "lucide-react";

export default function AboutUs() {
  return (
    <section className="w-full py-4 md:py-6 lg:py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-6">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className="text-4xl font-extrabold tracking-tight text-[#2F6686] sm:text-5xl">
              About Us
            </h2>
            <p className="text-base text-gray-600 sm:text-lg">
              At ExcelHub, our mission is to make Excel easy and accessible for
              everyone. We believe that powerful data analysis and organization
              shouldn't require advanced technical skills.
            </p>
            <p className="text-base text-gray-600 sm:text-lg">
              Our team of Excel experts creates professionally designed
              templates that help you save time, increase productivity, and
              achieve professional results without the learning curve.
            </p>
          </div>
          {/* Image instead of Feature Cards */}
          <div className="flex justify-center lg:justify-end bg-gray-50 ">
            <img
              src="/images/personalcal.webp" 
              alt="About ExcelHub"
              className=""
            />
          </div>
        </div>
      </div>
    </section>
  );
}
