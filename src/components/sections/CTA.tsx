import { Calendar, Mail, Download } from "lucide-react";

export function CTA() {
  return (
    <section id="cta" className="py-24 lg:py-32 relative overflow-hidden">
      {/* Particle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy via-navy-light/40 to-navy" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald/60"
            style={{
              left: `${(i * 53) % 100}%`,
              animation: `particle ${8 + (i % 6)}s linear ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald/10 rounded-full blur-[140px]" />

      <div className="relative max-w-4xl mx-auto px-6 lg:px-10 text-center">
        <p className="reveal font-mono text-emerald text-sm mb-4">// next step</p>
        <h2 className="reveal text-3xl sm:text-4xl lg:text-5xl font-bold text-lightest leading-tight">
          Pronto a dare un cervello <br />
          <span className="text-emerald">alla tua micro-grid?</span>
        </h2>
        <p className="reveal mt-5 text-light-slate text-lg">
          Non serve un nuovo impianto da €200.000.{" "}
          <span className="text-lightest">Serve l'algoritmo giusto.</span>
        </p>

        <div className="reveal mt-10 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 bg-emerald text-navy px-6 py-3.5 rounded-md font-semibold hover:glow transition"
          >
            <Calendar size={18} /> Prenota call gratuita 30 min
          </a>
          <a
            href="mailto:hello@gridmind.ai"
            className="inline-flex items-center justify-center gap-2 border border-emerald text-emerald px-6 py-3.5 rounded-md font-semibold hover:bg-emerald/10 transition"
          >
            <Mail size={18} /><span>hello@gridmind.ai</span>
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 border border-border text-light-slate px-6 py-3.5 rounded-md font-medium hover:border-emerald hover:text-emerald transition"
          >
            <Download size={18} /> Whitepaper
          </a>
        </div>

        <p className="reveal mt-6 text-xs font-mono text-slate">
          Whitepaper: "Micro-grid intelligenti: dalla bolletta al risparmio in 30 giorni"
        </p>
      </div>
    </section>
  );
}
