import { Quote, Building2 } from "lucide-react";

const results = [
  { label: "Risparmio energetico", from: "12%", to: "38%" },
  { label: "Gestione manuale", from: "8h/sett", to: "0" },
  { label: "Auto-consumo solare", from: "45%", to: "78%" },
  { label: "Picchi prelievo rete", from: "—", to: "−62%" },
  { label: "Blackout locali", from: "3/anno", to: "0" },
  { label: "Certificazione ESG", from: "manuale", to: "automatica" },
];

export function CaseStudy() {
  return (
    <section id="case" className="py-24 lg:py-32 bg-navy-light/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-12 max-w-2xl">
          <p className="font-mono text-emerald text-sm mb-3">// case study</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Caso di studio: <span className="text-emerald">TechGreen Srl</span>
          </h2>
        </div>

        <div className="reveal grid lg:grid-cols-5 gap-6">
          {/* Company info + quote */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-navy border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald/10 border border-emerald/30 flex items-center justify-center text-emerald">
                  <Building2 size={18} />
                </div>
                <div>
                  <div className="text-lightest font-semibold">TechGreen Srl</div>
                  <div className="text-xs text-slate font-mono">componentistica auto · €25M</div>
                </div>
              </div>
              <ul className="text-sm text-light-slate space-y-1.5 font-mono">
                <li><span className="text-emerald">›</span> 150 dipendenti</li>
                <li><span className="text-emerald">›</span> 200 kW fotovoltaico</li>
                <li><span className="text-emerald">›</span> 4 batterie da 100 kWh</li>
                <li><span className="text-emerald">›</span> 8 auto elettriche</li>
              </ul>
            </div>

            <div className="bg-navy border border-emerald/30 rounded-xl p-6 relative">
              <Quote className="absolute top-4 right-4 text-emerald/30" size={32} />
              <p className="text-light-slate italic leading-relaxed">
                "Avevamo investito €180.000 in pannelli e batterie, ma la bolletta era
                scesa solo del 12%. Luca passava le giornate a guardare 4 app diverse e a
                decidere a occhio quando accendere cosa."
              </p>
              <div className="mt-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald to-navy-lighter flex items-center justify-center text-navy font-bold">
                  L
                </div>
                <div>
                  <div className="text-sm text-lightest font-medium">Luca M.</div>
                  <div className="text-xs text-slate">Facility Manager, TechGreen</div>
                </div>
              </div>
            </div>
          </div>

          {/* Results grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4">
            {results.map((r) => (
              <div
                key={r.label}
                className="bg-navy border border-border rounded-xl p-5 hover:border-emerald/50 transition group"
              >
                <div className="text-xs uppercase tracking-wider text-slate mb-3">
                  {r.label}
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-light-slate line-through font-mono text-sm">
                    {r.from}
                  </span>
                  <span className="text-emerald font-mono">→</span>
                  <span className="text-2xl font-bold text-lightest group-hover:text-emerald transition">
                    {r.to}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
