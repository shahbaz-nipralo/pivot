import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  const categories = [
    { title: "Analysis & Schedules", image: "/images/17.svg", alt: "Analysis & Schedules Templates" },
    { title: "Budget Sheet", image: "/images/Budget.svg", alt: "Budget Templates" },
    { title: "Business Sheet", image: "/images/17.svg", alt: "Business Templates" },
    { title: "Calendar", image: "/images/17.svg", alt: "Calendar Templates" },
    { title: "Charts", image: "/images/Budget.svg", alt: "Charts Templates" },
    { title: "Invoices", image: "/images/17.svg", alt: "Invoices Templates" },
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center mb-10 space-y-4">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-[#2F6686]">
            Select from over 140 Template Sheets in 11 Popular Categories
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => (
            <Link key={index} href="#" className="group">
              <div className="overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition-all">
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={cat.image}
                    alt={cat.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-white">{cat.title}</h3>
                    <p className="text-sm text-white/80">Excel Templates</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="#"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#2F6686] px-6 sm:px-8 text-sm font-medium text-white shadow transition-colors hover:bg-[#245573] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#2F6686]"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  );
}
