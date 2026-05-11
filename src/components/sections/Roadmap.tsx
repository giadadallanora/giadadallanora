import { Check, Loader2, Sparkles } from "lucide-react";

const milestones = [
  { q: "Q1 2026", title: "MVP digital twin", status: "done", desc: "Simulatore micro-grid + dispatcher rule-based." },
  { q: "Q2 2026", title: "Edge AI dispatcher v1", status: "done", desc: "Modello RL su batteria + carichi flessibili." },
  { q: "Q3 2026", title: "Pilot industriali", status: "active", desc: "3 impianti EU, KPI verificati da terza parte." },
  { q: "Q4 2026", title: "Forecast meteo + prezzi PUN", status: "next", desc: "Integrazione previsioni 48h, trading day-ahead." },
  { q: "Q1 2027", title: "Marketplace energia P2P", status: "next", desc: "Scambio surplus tra siti dello stesso gruppo." },
];

const styles = {
  done: { dot: "bg-emerald", ring: "ring-emerald/40", icon: Check, label: "Completato" },
  active: { dot: "bg-emerald animate-pulse", ring: "ring-emerald/60", icon: Loader2, label: "In corso" },
  next: { dot: "bg-navy-lighter", ring: "ring-border", icon: Sparkles, label: "Prossimo" },
} as const;

export function Roadmap() {
  return (
    <section id="roadmap" className="py-24 lg:py-32 relative">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-12">
          <p className="font-mono text-emerald text-sm mb-3">// roadmap</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Dove stiamo <span className="text-emerald">andando</span>
          </h2>
        </div>

        <ol className="relative border-l border-border ml-3">
          {milestones.map((m, i) => {
            const s = styles[m.status as keyof typeof styles];
            const Icon = s.icon;
            return (
              <li key={m.title} className="reveal mb-8 ml-6" style={{ transitionDelay: `${i * 60}ms` }}>
                <span
                  className={`absolute -left-[11px] flex items-center justify-center w-5 h-5 rounded-full ring-4 ${s.ring} ${s.dot}`}
                >
                  <Icon size={11} className={m.status === "next" ? "text-light-slate" : "text-navy"} />
                </span>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className="font-mono text-xs text-emerald">{m.q}</span>
                  <span className="text-[10px] uppercase tracking-wider font-mono px-2 py-0.5 rounded border border-border text-slate">
                    {s.label}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-lightest">{m.title}</h3>
                <p className="text-sm text-light-slate mt-1">{m.desc}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
