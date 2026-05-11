import { Search, FlaskConical, Rocket, TrendingUp } from "lucide-react";

const steps = [
  {
    icon: Search,
    week: "Settimana 1",
    title: "Audit energetico",
    desc: "Analisi consumi, profilo solare, contratto rete. Output: mappa degli sprechi.",
  },
  {
    icon: FlaskConical,
    week: "Settimana 2-3",
    title: "Pilot algoritmico",
    desc: "Digital twin del tuo impianto. Simuliamo 12 mesi in 4 ore, KPI verificati.",
  },
  {
    icon: Rocket,
    week: "Settimana 4",
    title: "Deploy edge AI",
    desc: "Integrazione con SCADA / inverter. Controllo in tempo reale, fallback sicuro.",
  },
  {
    icon: TrendingUp,
    week: "Continuo",
    title: "Optimize loop",
    desc: "Modello che impara dai tuoi dati. Report mensile, retraining automatico.",
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-14 max-w-3xl">
          <p className="font-mono text-emerald text-sm mb-3">// how it works</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest leading-tight">
            Da bolletta opaca a <span className="text-emerald">micro-grid intelligente</span>{" "}
            in 30 giorni
          </h2>
        </div>

        <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* timeline line */}
          <div className="hidden lg:block absolute top-12 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald/50 to-transparent" />

          {steps.map(({ icon: Icon, week, title, desc }, i) => (
            <div
              key={title}
              className="reveal relative p-6 rounded-xl border border-border bg-navy-light/40 hover:border-emerald/60 hover:-translate-y-1 transition"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="relative z-10 w-12 h-12 rounded-lg bg-navy border border-emerald/40 flex items-center justify-center text-emerald mb-5 glow">
                <Icon size={20} />
              </div>
              <p className="font-mono text-xs text-emerald mb-1.5">
                0{i + 1} · {week}
              </p>
              <h3 className="text-lg font-semibold text-lightest mb-2">{title}</h3>
              <p className="text-sm text-light-slate leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
