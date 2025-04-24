"use client";

import { useState } from "react";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function HeroSlider({
  slides = defaultSlides,
  className,
  autoplay = true,
  autoplaySpeed = 5000,
  showArrows = true,
  showDots = true,
}) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 z-10 cursor-pointer -translate-y-1/2 rounded-full bg-white/30 p-2 backdrop-blur-sm transition-all hover:bg-white/50"
      aria-label="Previous slide"
    >
      <ChevronLeft className="h-6 w-6 text-white" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full cursor-pointer bg-white/30 p-2 backdrop-blur-sm transition-all hover:bg-white/50"
      aria-label="Next slide"
    >
      <ChevronRight className="h-6 w-6 text-white" />
    </button>
  );

  const settings = {
    dots: showDots,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay,
    autoplaySpeed,
    prevArrow: showArrows ? <PrevArrow /> : undefined,
    nextArrow: showArrows ? <NextArrow /> : undefined,
    beforeChange: (_, next) => setCurrentSlide(next),
    appendDots: (dots) => (
      <div>
        <ul className="m-0 flex justify-center gap-2 p-0">{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <button
        className={`mx-1 h-3 w-3 rounded-full transition-all ${i === currentSlide ? "bg-white" : "bg-white/50"}`}
        aria-label={`Go to slide ${i + 1}`}
      />
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className={cn("relative w-full overflow-hidden mt-24", className)}>
      <Slider {...settings} className="hero-slider">
        {slides.map((slide) => (
          <div key={slide.id} className="relative">
            <div className="relative h-[50vh] w-full overflow-hidden md:h-[70vh]">
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-white md:p-10" />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

const defaultSlides = [
  {
    id: 1,
    image: "https://cdn.pixabay.com/photo/2017/10/03/17/53/nature-2813487_1280.jpg",
  },
  {
    id: 2,
    image: "https://cdn.pixabay.com/photo/2020/05/27/08/01/blute-5226140_1280.jpg",
  },
  {
    id: 3,
    image: "https://cdn.pixabay.com/photo/2018/12/24/22/19/camping-3893587_1280.jpg",
  },
];
