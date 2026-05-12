import { Cpu, Globe2, Battery, Wind } from "lucide-react";

const items = [
  { icon: <Cpu size={20} />, value: "2.4M+", label: "data point/giorno analizzati" },
  { icon: <Battery size={20} />, value: "92%", label: "accuratezza forecast 24h" },
  { icon: <Wind size={20} />, value: "<200ms", label: "latenza decisione edge" },
  { icon: <Globe2 size={20} />, value: "12", label: "siti pilota in roadmap 2026" },
];

export function Stats() {
  return (
    <section className="py-16 border-y border-border bg-navy-light/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it) => (
          <div key={it.label} className="reveal flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-emerald/10 border border-emerald/30 flex items-center justify-center text-emerald shrink-0">
              {it.icon}
            </div>
            <div>
              <div className="text-2xl font-bold text-lightest font-mono">{it.value}</div>
              <div className="text-xs text-slate uppercase tracking-wider">{it.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
