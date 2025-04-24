import React from "react";
import Hero from "./Hero";
import KeyBenefits from "./KeyBenefits";
import AboutUs from "./About";
import Categories from "./Categories";
import Faq from "./Faq";
import Testimonials from "./Testimonials";
import { HeroSlider } from "./HeroSlider";

const HomePage = () => {
  return (
    <div>
      <HeroSlider />
      <KeyBenefits />
      <Categories />
      <Testimonials />
      <AboutUs />
      <Faq />
    </div>
  );
};

export default HomePage;
