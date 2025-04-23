import React from 'react'
import Hero from './Hero'
import KeyBenefits from './KeyBenefits'
import AboutUs from './About'
import Categories from './Categories'
import Faq from './Faq'
import Contact from './Contact'
import Footer from './Footer'
import Testimonials from './Testimonials'

const HomePage = () => {
  return (
    <div>
        <Hero/>
        <KeyBenefits/>
        <Categories/>
        <Testimonials/>
        <AboutUs/>
        <Faq/>
        <Footer/>
    </div>
  )
}

export default HomePage