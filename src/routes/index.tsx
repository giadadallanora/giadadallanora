import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Problem } from "@/components/sections/Problem";
import { Solution } from "@/components/sections/Solution";
import { Stack } from "@/components/sections/Stack";
import { CaseStudy } from "@/components/sections/CaseStudy";
import { About } from "@/components/sections/About";
import { CTA } from "@/components/sections/CTA";
import { Footer } from "@/components/sections/Footer";
import { useReveal } from "@/hooks/use-reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "GridMind AI — Smart grid optimization per poli industriali" },
      {
        name: "description",
        content:
          "Trasformo poli industriali in micro-grid intelligenti: −30% bolletta, +78% auto-consumo solare, gestione AI in tempo reale.",
      },
      { property: "og:title", content: "GridMind AI — Smart grid optimization" },
      {
        property: "og:description",
        content:
          "Da consumatori passivi a micro-grid intelligenti: algoritmi, non cavi.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  useReveal();
  return (
    <main className="min-h-screen bg-navy text-light-slate selection:bg-emerald/30 selection:text-lightest">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Stack />
      <CaseStudy />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
