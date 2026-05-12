import { Check, Sparkles } from "lucide-react";
import { openBooking } from "@/components/BookingDialog";

const tiers = [
  {
    name: "Audit",
    price: "Gratis",
    tag: "start",
    desc: "Analisi consumi + report opportunità in 7 giorni.",
    features: [
      "Audit dati storici 12 mesi",
      "Report PDF con KPI baseline",
      "Stima risparmio personalizzata",
      "Call strategica 60 min",
    ],
    cta: "Prenota audit",
    highlight: false,
  },
  {
    name: "Pilot",
    price: "€ 4.900",
    tag: "30 giorni",
    desc: "Prova reale dell'algoritmo sul tuo impianto.",
    features: [
      "Setup digital twin",
      "Forecast meteo + carichi",
      "Dashboard real-time",
      "Report settimanale KPI",
      "Integrazione 3 inverter/batterie",
    ],
    cta: "Avvia pilot",
    highlight: true,
  },
  {
    name: "Scale",
    price: "Custom",
    tag: "enterprise",
    desc: "Roll-out multi-sito con SLA e supporto dedicato.",
    features: [
      "Edge AI on-premise",
      "Integrazione GSE/Terna",
      "Certificazione ESG automatica",
      "SLA 99.9% + supporto 24/7",
      "API + white-label",
    ],
    cta: "Parla con noi",
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-navy-light/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-14 max-w-2xl">
          <p className="font-mono text-emerald text-sm mb-3">// pricing</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Tre passi, <span className="text-emerald">zero rischio</span>.
          </h2>
          <p className="mt-4 text-light-slate">
            Si parte sempre da un audit gratuito. Paghi solo quando vedi i numeri.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`reveal relative rounded-2xl p-7 border transition hover:-translate-y-1 ${
                t.highlight
                  ? "bg-navy border-emerald/60 glow"
                  : "bg-navy border-border hover:border-emerald/40"
              }`}
            >
              {t.highlight && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1 bg-emerald text-navy text-xs font-semibold px-3 py-1 rounded-full">
                  <Sparkles size={12} /> più scelto
                </span>
              )}
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl font-bold text-lightest">{t.name}</h3>
                <span className="text-xs font-mono text-emerald uppercase">{t.tag}</span>
              </div>
              <div className="mt-4 mb-3">
                <span className={`text-4xl font-bold font-mono ${t.highlight ? "text-emerald" : "text-lightest"}`}>
                  {t.price}
                </span>
              </div>
              <p className="text-sm text-light-slate mb-6">{t.desc}</p>
              <ul className="space-y-2.5 mb-7">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-light-slate">
                    <Check size={16} className="text-emerald shrink-0 mt-0.5" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={openBooking}
                className={`w-full py-2.5 rounded-md font-semibold transition ${
                  t.highlight
                    ? "bg-emerald text-navy hover:glow"
                    : "border border-emerald text-emerald hover:bg-emerald/10"
                }`}
              >
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
