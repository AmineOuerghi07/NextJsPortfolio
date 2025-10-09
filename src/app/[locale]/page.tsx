"use client";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";


export default function Portfolio() {

  return (
      <div className="min-h-screen transition-colors duration-300">
        <Header />
        <main className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
          <Hero />
          <Expertise />
          <FeaturedProjects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </main>
  
      </div>
  );
}