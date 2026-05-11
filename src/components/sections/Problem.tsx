import { X, AlertTriangle } from "lucide-react";

const pains = [
  "Pannelli che producono a mezzogiorno quando i macchinari sono fermi",
  'Batterie che caricano "a caso", senza logica',
  "Auto elettriche che sovraccaricano la rete alle 9:00",
  "Bolletta da €3.200 in un giorno di pioggia, nonostante i pannelli",
  "5 sistemi diversi, nessuno parla con l'altro",
  'Il CEO chiede "siamo green?" e tu non hai numeri',
];

const windows = [
  { title: "Enel — Contatore", body: "Picco: 142 kW", tag: "ALERT", color: "text-red-400" },
  { title: "Inverter Solar.app", body: "Output 87 kW", tag: "OK", color: "text-yellow-300" },
  { title: "bollette_2025.xlsx", body: "Ott: €11.420", tag: "+22%", color: "text-red-400" },
  { title: "Wallbox EV", body: "3 auto in carica", tag: "PEAK", color: "text-red-400" },
  { title: "Post-it 📌", body: '"Spegni tutto alle 18!"', tag: "Luca", color: "text-yellow-200" },
];

export function Problem() {
  return (
    <section id="problem" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-16">
          <p className="font-mono text-red-400 text-sm mb-3">// stato attuale</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Il <span className="text-red-400">BEFORE</span>: il caos di Luca
          </h2>
          <p className="mt-4 text-light-slate max-w-2xl">
            Il facility manager medio passa 8 ore a settimana a guardare app diverse,
            decidendo a occhio cosa accendere e quando.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Chaotic mockup */}
          <div className="reveal relative h-[420px] sm:h-[460px]">
            {windows.map((w, i) => (
              <div
                key={i}
                className="absolute bg-navy-light border border-border rounded-lg shadow-2xl overflow-hidden w-56"
                style={{
                  top: `${[0, 18, 50, 38, 70][i]}%`,
                  left: `${[0, 45, 8, 55, 28][i]}%`,
                  transform: `rotate(${[-4, 3, -2, 5, -1][i]}deg)`,
                  zIndex: i,
                }}
              >
                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-border bg-navy">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald" />
                  <span className="ml-2 text-[10px] font-mono text-slate truncate">
                    {w.title}
                  </span>
                </div>
                <div className="p-3 flex items-center justify-between">
                  <span className="text-sm text-light-slate">{w.body}</span>
                  <span className={`text-[10px] font-mono ${w.color}`}>{w.tag}</span>
                </div>
              </div>
            ))}
            <div className="absolute -bottom-2 left-2 flex items-center gap-2 text-red-400 font-mono text-xs animate-flow">
              <AlertTriangle size={14} /> 5 dashboard aperte · 0 decisioni ottimali
            </div>
          </div>

          <ul className="reveal space-y-4">
            {pains.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 p-4 rounded-lg bg-navy-light/60 border border-border hover:border-red-400/40 transition"
              >
                <span className="mt-0.5 w-6 h-6 flex-shrink-0 rounded-md bg-red-400/10 text-red-400 flex items-center justify-center">
                  <X size={14} />
                </span>
                <span className="text-light-slate">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
