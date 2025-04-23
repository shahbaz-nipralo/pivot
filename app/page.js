'use client'
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductCards from "@/components/ProductCard";
import ProductDeatils from "@/components/ProductDeatils";
import { useSaveUserToStrapi } from '../hooks/useSaveUserToStrapi';
import HomePage from "@/components/homePage/HomePage";


export default function Home() {
  useSaveUserToStrapi();
  return (
    <main>
      {/* <Hero/> */}
      <HomePage/>
      <ProductCards/>
    </main>
  );
}
