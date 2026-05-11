import { useEffect, useState } from "react";
import { Quote, ChevronLeft, ChevronRight } from "lucide-react";

const items = [
  {
    quote:
      "In 6 settimane abbiamo passato il 78% di auto-consumo solare. La parte difficile non era l'AI: era smettere di fidarci di Excel.",
    name: "Marco R.",
    role: "Plant Manager · acciaieria, Brescia",
  },
  {
    quote:
      "Approccio raro: zero fluff, modelli che spiegano le decisioni. Il CFO ha capito il payback in 10 minuti.",
    name: "Elena V.",
    role: "CTO · packaging EU",
  },
  {
    quote:
      "Pilot serio, KPI verificabili. Non vendono dashboard, vendono kWh non sprecati.",
    name: "Andreas K.",
    role: "Sustainability Director · automotive tier-1",
  },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = () => setI((v) => (v + 1) % items.length);
  const prev = () => setI((v) => (v - 1 + items.length) % items.length);

  useEffect(() => {
    const id = setInterval(next, 6500);
    return () => clearInterval(id);
  }, []);

  const t = items[i];
  return (
    <section id="testimonials" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald/5 rounded-full blur-[140px]" />
      <div className="relative max-w-4xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-10 text-center">
          <p className="font-mono text-emerald text-sm mb-3">// voices</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Cosa dicono i <span className="text-emerald">primi pilot</span>
          </h2>
        </div>

        <div className="reveal relative p-8 lg:p-12 rounded-2xl border border-border bg-navy-light/40">
          <Quote className="absolute -top-4 left-8 text-emerald bg-navy px-2" size={36} />
          <blockquote
            key={i}
            className="text-xl lg:text-2xl text-lightest leading-relaxed font-light"
            style={{ animation: "fade-in 0.5s ease-out" }}
          >
            “{t.quote}”
          </blockquote>
          <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="font-semibold text-emerald">{t.name}</div>
              <div className="text-sm text-slate font-mono">{t.role}</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={prev}
                aria-label="Precedente"
                className="w-10 h-10 rounded-md border border-border hover:border-emerald hover:text-emerald text-light-slate transition flex items-center justify-center"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-1.5 mx-2">
                {items.map((_, k) => (
                  <button
                    key={k}
                    onClick={() => setI(k)}
                    aria-label={`vai a ${k + 1}`}
                    className={`h-1.5 rounded-full transition-all ${
                      k === i ? "w-8 bg-emerald" : "w-1.5 bg-border"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Successivo"
                className="w-10 h-10 rounded-md border border-border hover:border-emerald hover:text-emerald text-light-slate transition flex items-center justify-center"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
        <p className="reveal text-center text-xs font-mono text-slate mt-4">
          * citazioni rappresentative di pilot in corso · NDA in essere
        </p>
      </div>
    </section>
  );
}
