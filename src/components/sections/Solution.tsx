import { Check, FileText, TrendingUp, Battery, Leaf } from "lucide-react";

const gains = [
  "Integrazione API da tutti i dispositivi (inverter, smart meter, wallbox, sensori)",
  'Algoritmo ML che decide ogni ora: "usa solare", "scarica batteria", "preleva rete", "vendi eccedenza"',
  "Digital Twin che replica la tua rete e simula scenari",
  "Smart charging: le auto si caricano quando conviene, non quando arrivano",
  "Forecasting meteo: sai già domani quanto produrrai",
  "Report automatici: il CEO vede i numeri, tu vedi il risparmio",
];

const kpis = [
  { icon: <Leaf size={16} />, label: "CO₂ evitata", value: "4.2 t", trend: "+18%" },
  { icon: <TrendingUp size={16} />, label: "Risparmio", value: "€312", trend: "today" },
  { icon: <Battery size={16} />, label: "Batterie", value: "78%", trend: "ottimale" },
];

export function Solution() {
  return (
    <section id="solution" className="py-24 lg:py-32 bg-navy-light/30 border-y border-border relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-16">
          <p className="font-mono text-emerald text-sm mb-3">// con GridMind</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Il <span className="text-emerald">AFTER</span>: un cervello per la tua micro-grid
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Clean dashboard mockup */}
          <div className="reveal order-2 lg:order-1">
            <div className="bg-navy border border-emerald/30 rounded-xl shadow-2xl glow overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-navy-light/50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald" />
                  <span className="font-mono text-xs text-light-slate">gridmind.dashboard</span>
                </div>
                <span className="text-[10px] font-mono text-emerald">● LIVE</span>
              </div>
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                  {kpis.map((k) => (
                    <div key={k.label} className="bg-navy-light rounded-lg p-3 border border-border">
                      <div className="flex items-center gap-1.5 text-emerald">
                        {k.icon}
                        <span className="text-[10px] uppercase tracking-wider text-slate">{k.label}</span>
                      </div>
                      <div className="mt-2 text-xl font-bold text-lightest">{k.value}</div>
                      <div className="text-[10px] font-mono text-emerald">{k.trend}</div>
                    </div>
                  ))}
                </div>

                {/* Chart */}
                <div className="bg-navy-light rounded-lg p-4 border border-border">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs text-light-slate">Energy mix · 24h</span>
                    <span className="font-mono text-[10px] text-emerald">+38% self-use</span>
                  </div>
                  <svg viewBox="0 0 200 60" className="w-full h-16">
                    <defs>
                      <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="oklch(0.88 0.18 175)" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="oklch(0.88 0.18 175)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0,50 L20,42 L40,30 L60,18 L80,10 L100,8 L120,14 L140,22 L160,30 L180,38 L200,46 L200,60 L0,60 Z"
                      fill="url(#g1)"
                    />
                    <path
                      d="M0,50 L20,42 L40,30 L60,18 L80,10 L100,8 L120,14 L140,22 L160,30 L180,38 L200,46"
                      fill="none"
                      stroke="oklch(0.88 0.18 175)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>

                <button className="w-full flex items-center justify-center gap-2 bg-emerald text-navy py-2.5 rounded-md text-sm font-semibold hover:glow transition">
                  <FileText size={14} /> Genera Report ESG
                </button>
              </div>
            </div>
          </div>

          <ul className="reveal order-1 lg:order-2 space-y-4">
            {gains.map((g) => (
              <li
                key={g}
                className="flex items-start gap-3 p-4 rounded-lg bg-navy-light/60 border border-border hover:border-emerald/50 hover:translate-x-1 transition-all"
              >
                <span className="mt-0.5 w-6 h-6 flex-shrink-0 rounded-md bg-emerald/15 text-emerald flex items-center justify-center">
                  <Check size={14} />
                </span>
                <span className="text-light-slate">{g}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
