"use client";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Expertise } from "@/components/Expertise";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SideNav } from "@/components/SideNav";
import { Skills } from "@/components/Skills";

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-stone-900 transition-colors duration-300 dark:bg-stone-950 dark:text-stone-100">
      <Header />
      <div className="lg:mx-auto lg:grid lg:min-h-screen lg:max-w-[1240px] lg:grid-cols-[240px_minmax(0,1fr)]">
        <SideNav />
        <main className="lg:border-s lg:border-stone-200 dark:lg:border-stone-800">
          <Hero />
          <Expertise />
          <FeaturedProjects />
          <Skills />
          <Experience />
          <Contact />
          <Footer />
        </main>
      </div>
    </div>
  );
}
