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

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: Award,
                title: "Expert Designed",
                desc: "Created by Excel professionals with years of experience",
              },
              {
                icon: Target,
                title: "Goal Oriented",
                desc: "Focused on helping you achieve your objectives",
              },
              {
                icon: FileSpreadsheet,
                title: "140+ Templates",
                desc: "Professionally designed Excel templates for every need",
              },
              {
                icon: BarChart2,
                title: "Data-Driven",
                desc: "Templates built with analytics and insights in mind",
              },
            ].map(({ icon: Icon, title, desc }, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center rounded-2xl border bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="rounded-full bg-[#2F6686]/10 p-3 mb-3">
                  <Icon className="h-8 w-8 text-[#2F6686]" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-500 mt-1">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
