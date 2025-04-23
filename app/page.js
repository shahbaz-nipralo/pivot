'use client'
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductCards from "@/components/ProductCard";
import ProductDeatils from "@/components/ProductDeatils";
import { useSaveUserToStrapi } from '../hooks/useSaveUserToStrapi';


export default function Home() {
  useSaveUserToStrapi();
  return (
    <main>
      <Hero/>
      <ProductCards/>
    </main>
  );
}
