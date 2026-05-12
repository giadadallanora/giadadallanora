import { useMemo, useState } from "react";
import { Calculator as CalcIcon, TrendingDown, Leaf, Euro } from "lucide-react";
import { openBooking } from "@/components/BookingDialog";

export function Calculator() {
  const [kwh, setKwh] = useState(800000); // consumo annuo
  const [price, setPrice] = useState(0.28); // €/kWh
  const [solar, setSolar] = useState(200); // kW installati
  const [battery, setBattery] = useState(400); // kWh

  const data = useMemo(() => {
    const bill = kwh * price;
    // baseline self-consumption ~45%, with GridMind ~78%
    const solarYield = solar * 1300; // kWh/anno per kW
    const baselineSelf = Math.min(solarYield * 0.45, kwh);
    const optimSelf = Math.min(solarYield * 0.78 + battery * 250, kwh);
    const savedKwh = optimSelf - baselineSelf;
    const savings = savedKwh * price;
    const pct = bill > 0 ? (savings / bill) * 100 : 0;
    const co2 = savedKwh * 0.35; // kg CO2
    const payback = savings > 0 ? 24000 / savings : 0; // setup ~24k
    return {
      bill,
      savings: Math.max(0, savings),
      pct: Math.min(45, Math.max(0, pct)),
      co2: Math.max(0, co2),
      payback,
    };
  }, [kwh, price, solar, battery]);

  return (
    <section id="calculator" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-12 max-w-2xl">
          <p className="font-mono text-emerald text-sm mb-3">// roi calculator</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Quanto puoi <span className="text-emerald">risparmiare</span>?
          </h2>
          <p className="mt-4 text-light-slate">
            Inserisci i tuoi dati e vedi una stima istantanea del risparmio annuo,
            CO₂ evitata e tempo di rientro.
          </p>
        </div>

        <div className="reveal grid lg:grid-cols-2 gap-6">
          {/* Inputs */}
          <div className="bg-navy-light border border-border rounded-xl p-6 space-y-6">
            <div className="flex items-center gap-2 text-emerald mb-2">
              <CalcIcon size={18} />
              <span className="font-mono text-xs uppercase tracking-wider">parametri impianto</span>
            </div>

            <Field
              label="Consumo elettrico annuo"
              value={`${(kwh / 1000).toLocaleString("it-IT")} MWh`}
            >
              <input
                type="range" min={100000} max={5000000} step={50000}
                value={kwh} onChange={(e) => setKwh(+e.target.value)}
                className="w-full accent-[var(--color-emerald)]"
              />
            </Field>

            <Field label="Prezzo energia" value={`€ ${price.toFixed(2)} / kWh`}>
              <input
                type="range" min={0.15} max={0.45} step={0.01}
                value={price} onChange={(e) => setPrice(+e.target.value)}
                className="w-full accent-[var(--color-emerald)]"
              />
            </Field>

            <Field label="Fotovoltaico installato" value={`${solar} kW`}>
              <input
                type="range" min={0} max={1000} step={10}
                value={solar} onChange={(e) => setSolar(+e.target.value)}
                className="w-full accent-[var(--color-emerald)]"
              />
            </Field>

            <Field label="Capacità batterie" value={`${battery} kWh`}>
              <input
                type="range" min={0} max={2000} step={50}
                value={battery} onChange={(e) => setBattery(+e.target.value)}
                className="w-full accent-[var(--color-emerald)]"
              />
            </Field>
          </div>

          {/* Results */}
          <div className="grid grid-cols-2 gap-4 content-start">
            <KPI
              icon={<Euro size={18} />}
              label="Risparmio annuo"
              value={`€ ${Math.round(data.savings).toLocaleString("it-IT")}`}
              accent
            />
            <KPI
              icon={<TrendingDown size={18} />}
              label="Riduzione bolletta"
              value={`−${data.pct.toFixed(1)}%`}
            />
            <KPI
              icon={<Leaf size={18} />}
              label="CO₂ evitata / anno"
              value={`${(data.co2 / 1000).toFixed(1)} t`}
            />
            <KPI
              icon={<CalcIcon size={18} />}
              label="Payback stimato"
              value={data.payback ? `${data.payback.toFixed(1)} anni` : "—"}
            />

            <div className="col-span-2 bg-emerald/10 border border-emerald/30 rounded-xl p-5">
              <p className="text-sm text-light-slate">
                Bolletta attuale stimata:{" "}
                <span className="text-lightest font-semibold">
                  € {Math.round(data.bill).toLocaleString("it-IT")}/anno
                </span>
              </p>
              <button
                onClick={openBooking}
                className="mt-3 w-full bg-emerald text-navy py-2.5 rounded-md font-semibold hover:glow transition"
              >
                Verifica con un audit gratuito →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-2">
        <span className="text-light-slate">{label}</span>
        <span className="font-mono text-emerald">{value}</span>
      </div>
      {children}
    </div>
  );
}

function KPI({ icon, label, value, accent }: { icon: React.ReactNode; label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-xl p-5 border ${accent ? "bg-emerald/10 border-emerald/40" : "bg-navy-light border-border"}`}>
      <div className={`flex items-center gap-2 text-xs uppercase tracking-wider mb-2 ${accent ? "text-emerald" : "text-slate"}`}>
        {icon}<span>{label}</span>
      </div>
      <div className={`text-2xl font-bold font-mono ${accent ? "text-emerald" : "text-lightest"}`}>
        {value}
      </div>
    </div>
  );
}
