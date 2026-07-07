import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Cursor } from "@/components/Cursor";
import { Background } from "@/components/Background";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Achievements } from "@/components/sections/Achievements";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vanapala Akash Varma — Software Developer · Royal Enfield Cinematic Portfolio" },
      { name: "description", content: "Premium portfolio of Vanapala Akash Varma, software developer building motion-rich web experiences inspired by Royal Enfield classic motorcycles and vintage engineering design." },
      { property: "og:title", content: "Vanapala Akash Varma — Software Developer" },
      { property: "og:description", content: "Cinematic portfolio · Web development, motion design, classic Royal Enfield theme." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaded, setLoaded] = useState(false);

  return (
    <main className="relative min-h-screen text-white">
      <LoadingScreen onDone={() => setLoaded(true)} />
      <Cursor />
      <Background />
      <Nav />

      <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(12px)", transition: "opacity 0.9s 0.15s, transform 0.9s 0.15s" }}>
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Projects />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
