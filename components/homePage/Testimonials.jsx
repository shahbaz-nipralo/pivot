import { FaUserAlt } from "react-icons/fa";

const testimonials = [
  {
    name: "Sarah J.",
    title: "Small Business Owner",
    testimonial:
      "The business plan template saved me countless hours. It was so easy to customize and helped me secure funding for my startup. Highly recommended!",
  },
  {
    name: "Michael T.",
    title: "Project Manager",
    testimonial:
      "As someone who struggles with Excel, these templates have been a game-changer. The project management dashboard has transformed how our team tracks progress.",
  },
  {
    name: "Lisa R.",
    title: "Financial Advisor",
    testimonial:
      "I recommend ExcelHub templates to all my clients. The budget planner is intuitive and helps people take control of their finances without any Excel expertise.",
  },
];

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-16 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold tracking-tighter sm:text-4xl md:text-5xl text-[rgb(47,102,134)]">
              What Our Customers Say
            </h2>
            <p className="max-w-[900px] text-gray-600 md:text-xl">
              Don't just take our word for it, hear from our satisfied customers!
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="flex flex-col rounded-xl border bg-white p-6 shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="flex items-center space-x-4">
                <div className="relative h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <FaUserAlt className="text-gray-500 text-3xl" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-800">{testimonial.name}</h3>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600 italic">{testimonial.testimonial}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
