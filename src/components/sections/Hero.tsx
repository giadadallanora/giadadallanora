import { ArrowRight, PlayCircle } from "lucide-react";
import { EnergyFlow } from "../EnergyFlow";

export function Hero() {
  return (
    <section id="top" className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-emerald/10 blur-[120px] rounded-full" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
        <div className="reveal">
          <p className="font-mono text-emerald text-sm mb-5">
            $ gridmind --init // smart grid optimization
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-lightest leading-[1.05]">
            La tua energia solare <br />
            <span className="text-emerald">non dovrebbe</span> andare sprecata.
          </h1>
          <p className="mt-6 text-lg text-light-slate max-w-xl leading-relaxed">
            Trasformo poli industriali da consumatori passivi a{" "}
            <span className="text-lightest font-medium">micro-grid intelligenti</span> —
            riducendo la bolletta del{" "}
            <span className="text-emerald font-mono font-semibold">30%</span> con
            algoritmi, non con cavi.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 bg-emerald text-navy px-6 py-3 rounded-md font-semibold hover:glow transition-all"
            >
              <PlayCircle size={18} /> Vedi la demo
            </a>
            <a
              href="#cta"
              className="inline-flex items-center gap-2 border border-emerald text-emerald px-6 py-3 rounded-md font-semibold hover:bg-emerald/10 transition-all"
            >
              Prenota una call <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs font-mono text-slate">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald animate-flow" /> live forecast
            </span>
            <span>ML · Digital Twin · Edge AI</span>
          </div>
        </div>

        <div className="reveal">
          <EnergyFlow />
        </div>
      </div>
    </section>
  );
}
