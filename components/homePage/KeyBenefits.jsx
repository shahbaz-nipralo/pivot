import { Clock, PenTool, Shield, Zap } from "lucide-react";

const benefits = [
  {
    icon: <Shield className="h-6 w-6 text-[#2F6686]" />,
    title: "No Excel Skills Needed",
    description: "Our templates are designed to be user-friendly, even for Excel beginners.",
  },
  {
    icon: <Clock className="h-6 w-6 text-[#2F6686]" />,
    title: "Save Time",
    description: "Skip the setup and formatting. Get straight to work with our ready-to-use templates.",
  },
  {
    icon: <PenTool className="h-6 w-6 text-[#2F6686]" />,
    title: "Customizable",
    description: "Easily modify our templates to fit your specific needs and preferences.",
  },
  {
    icon: <Zap className="h-6 w-6 text-[#2F6686]" />,
    title: "Professional Results",
    description: "Impress clients and colleagues with polished, professional-looking spreadsheets.",
  },
];

export default function KeyBenefits() {
  return (
    <section className="w-full py-4 md:py-6 lg:py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-[#2F6686]">
            Key Benefits
          </h2>
          <p className="mt-4 text-gray-500 md:text-xl max-w-2xl mx-auto">
            Why our Excel templates are the perfect solution for your needs
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg text-center"
            >
              <div className="rounded-full bg-[#2F6686]/10 p-3">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold">{benefit.title}</h3>
              <p className="text-sm text-gray-500">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
