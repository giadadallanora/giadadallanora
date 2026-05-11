import { useMemo, useState } from "react";
import { Sun, BatteryCharging, Factory, Car, Sparkles, RotateCcw } from "lucide-react";

type Mode = "manual" | "ai";

export function Demo() {
  const [solar, setSolar] = useState(140);     // kW peak
  const [battery, setBattery] = useState(60);  // % SoC
  const [plant, setPlant] = useState(90);      // kW load
  const [evs, setEvs] = useState(4);           // # EV charging
  const [mode, setMode] = useState<Mode>("ai");

  const reset = () => { setSolar(140); setBattery(60); setPlant(90); setEvs(4); setMode("ai"); };

  const kpi = useMemo(() => simulate({ solar, battery, plant, evs, mode }), [solar, battery, plant, evs, mode]);

  return (
    <section id="demo" className="py-24 lg:py-32 bg-navy-light/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-12 max-w-2xl">
          <p className="font-mono text-emerald text-sm mb-3">// live simulator</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Prova la <span className="text-emerald">micro-grid</span> in tempo reale
          </h2>
          <p className="mt-4 text-light-slate">
            Muovi gli slider e confronta gestione manuale vs algoritmo GridMind. I KPI si
            aggiornano istantaneamente.
          </p>
        </div>

        <div className="reveal grid lg:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 bg-navy border border-border rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate uppercase tracking-wider">Inputs</span>
              <button
                onClick={reset}
                className="text-xs font-mono text-light-slate hover:text-emerald inline-flex items-center gap-1.5 transition"
              >
                <RotateCcw size={12} /> reset
              </button>
            </div>

            <Slider icon={<Sun size={16} />} label="Produzione solare" value={solar} unit="kW" min={0} max={200} onChange={setSolar} />
            <Slider icon={<BatteryCharging size={16} />} label="Stato batterie" value={battery} unit="%" min={0} max={100} onChange={setBattery} />
            <Slider icon={<Factory size={16} />} label="Carico stabilimento" value={plant} unit="kW" min={20} max={180} onChange={setPlant} />
            <Slider icon={<Car size={16} />} label="EV in carica" value={evs} unit="auto" min={0} max={8} onChange={setEvs} step={1} />

            <div className="pt-4 border-t border-border">
              <div className="text-xs font-mono text-slate uppercase tracking-wider mb-3">Modalità</div>
              <div className="grid grid-cols-2 gap-2">
                <ModeBtn active={mode === "manual"} onClick={() => setMode("manual")} label="Manuale" sub="Luca + Excel" />
                <ModeBtn active={mode === "ai"} onClick={() => setMode("ai")} label="GridMind AI" sub="ML optimizer" emerald />
              </div>
            </div>
          </div>

          {/* KPIs */}
          <div className="lg:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <KpiCard label="Auto-consumo solare" value={`${kpi.selfUse}%`} delta={kpi.selfUseDelta} good />
              <KpiCard label="Costo orario" value={`€${kpi.cost}`} delta={kpi.costDelta} good={false} />
              <KpiCard label="Prelievo dalla rete" value={`${kpi.gridDraw} kW`} delta={kpi.gridDelta} good={false} />
              <KpiCard label="CO₂ evitata" value={`${kpi.co2} kg/h`} delta={kpi.co2Delta} good />
            </div>

            {/* Energy flow bar */}
            <div className="bg-navy border border-border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-light-slate">Bilancio energetico</span>
                <span className={`text-xs font-mono ${mode === "ai" ? "text-emerald" : "text-yellow-300"}`}>
                  {mode === "ai" ? "● ML balancing" : "● manual override"}
                </span>
              </div>
              <FlowBar segments={kpi.mix} />
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
                {kpi.mix.map((s) => (
                  <span key={s.label} className="inline-flex items-center gap-1.5 text-light-slate">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ background: s.color }} />
                    {s.label} <span className="font-mono text-slate">{s.kw} kW</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-navy border border-emerald/30 rounded-xl p-5 flex items-start gap-3">
              <Sparkles className="text-emerald flex-shrink-0 mt-0.5" size={18} />
              <p className="text-sm text-light-slate leading-relaxed">
                <span className="text-emerald font-mono">decision:</span> {kpi.decision}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Slider({ icon, label, value, unit, min, max, step = 1, onChange }: {
  icon: React.ReactNode; label: string; value: number; unit: string;
  min: number; max: number; step?: number; onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="inline-flex items-center gap-2 text-sm text-light-slate">
          <span className="text-emerald">{icon}</span> {label}
        </span>
        <span className="font-mono text-sm text-emerald">
          {value} <span className="text-slate">{unit}</span>
        </span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none bg-navy-lighter accent-[oklch(0.88_0.18_175)] cursor-pointer"
      />
    </div>
  );
}

function ModeBtn({ active, onClick, label, sub, emerald }: {
  active: boolean; onClick: () => void; label: string; sub: string; emerald?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded-lg border text-left transition ${
        active
          ? emerald
            ? "border-emerald bg-emerald/10 glow"
            : "border-yellow-300/60 bg-yellow-300/5"
          : "border-border bg-navy-light/40 hover:border-light-slate/40"
      }`}
    >
      <div className={`text-sm font-semibold ${active && emerald ? "text-emerald" : "text-lightest"}`}>{label}</div>
      <div className="text-[11px] font-mono text-slate mt-0.5">{sub}</div>
    </button>
  );
}

function KpiCard({ label, value, delta, good }: { label: string; value: string; delta: number; good: boolean }) {
  const positive = good ? delta >= 0 : delta <= 0;
  const arrow = delta > 0 ? "▲" : delta < 0 ? "▼" : "■";
  return (
    <div className="bg-navy border border-border rounded-xl p-5 hover:border-emerald/40 transition">
      <div className="text-xs uppercase tracking-wider text-slate">{label}</div>
      <div className="mt-2 text-2xl font-bold text-lightest">{value}</div>
      <div className={`mt-1 text-xs font-mono ${positive ? "text-emerald" : "text-red-400"}`}>
        {arrow} {Math.abs(delta).toFixed(1)}% vs manuale
      </div>
    </div>
  );
}

function FlowBar({ segments }: { segments: { label: string; kw: number; color: string }[] }) {
  const total = segments.reduce((a, s) => a + Math.max(0, s.kw), 0) || 1;
  return (
    <div className="w-full h-3 rounded-full bg-navy-lighter overflow-hidden flex">
      {segments.map((s) => (
        <div
          key={s.label}
          style={{ width: `${(Math.max(0, s.kw) / total) * 100}%`, background: s.color }}
          className="h-full transition-all duration-500"
        />
      ))}
    </div>
  );
}

// --- simulation logic ---
function simulate({ solar, battery, plant, evs, mode }: {
  solar: number; battery: number; plant: number; evs: number; mode: Mode;
}) {
  const evLoad = evs * 11; // 11kW wallbox
  const totalLoad = plant + evLoad;

  // Manual baseline: greedy, charges EVs immediately, ignores forecast
  const mSolarToLoad = Math.min(solar, totalLoad) * 0.7; // wastes ~30% misalignment
  const mBatteryDischarge = battery > 30 ? Math.min(20, totalLoad - mSolarToLoad) : 0;
  const mGrid = Math.max(0, totalLoad - mSolarToLoad - mBatteryDischarge);
  const mExport = Math.max(0, solar - mSolarToLoad - 5);

  // AI: shifts EV charging to solar peak, optimal battery dispatch
  const aiSolarToLoad = Math.min(solar, totalLoad) * 0.95;
  const aiBatteryDischarge = battery > 20
    ? Math.min(40, Math.max(0, totalLoad - aiSolarToLoad))
    : 0;
  const aiGrid = Math.max(0, totalLoad - aiSolarToLoad - aiBatteryDischarge);
  const aiExport = Math.max(0, solar - aiSolarToLoad - 2);

  const m = compute(mSolarToLoad, mBatteryDischarge, mGrid, mExport);
  const a = compute(aiSolarToLoad, aiBatteryDischarge, aiGrid, aiExport);

  const cur = mode === "ai" ? a : m;
  const base = m;

  const decision = mode === "ai"
    ? aiBatteryDischarge > 10
      ? `scarica batteria (${aiBatteryDischarge.toFixed(0)} kW), copri picchi, posticipa ${Math.max(0, evs - 2)} EV alla finestra solare`
      : solar > totalLoad
        ? `surplus solare ${(solar - totalLoad).toFixed(0)} kW: carica batterie + vendi eccedenza`
        : `usa solare diretto + ${aiGrid.toFixed(0)} kW da rete in fascia economica`
    : `nessuna ottimizzazione attiva: ${mGrid.toFixed(0)} kW prelevati, ${mExport.toFixed(0)} kW persi in export non valorizzato`;

  return {
    selfUse: cur.selfUse,
    selfUseDelta: pctDelta(cur.selfUse, base.selfUse),
    cost: cur.cost.toFixed(2),
    costDelta: pctDelta(cur.cost, base.cost),
    gridDraw: cur.grid.toFixed(0),
    gridDelta: pctDelta(cur.grid, base.grid),
    co2: cur.co2.toFixed(1),
    co2Delta: pctDelta(cur.co2, base.co2),
    decision,
    mix: [
      { label: "Solare → carico", kw: Math.round(mode === "ai" ? aiSolarToLoad : mSolarToLoad), color: "oklch(0.88 0.18 175)" },
      { label: "Batteria", kw: Math.round(mode === "ai" ? aiBatteryDischarge : mBatteryDischarge), color: "oklch(0.75 0.15 200)" },
      { label: "Rete", kw: Math.round(mode === "ai" ? aiGrid : mGrid), color: "oklch(0.65 0.22 25)" },
      { label: "Export", kw: Math.round(mode === "ai" ? aiExport : mExport), color: "oklch(0.7 0.12 150)" },
    ],
  };
}

function compute(solarLoad: number, bat: number, grid: number, exp: number) {
  const totalServed = solarLoad + bat + grid;
  const selfUse = Math.round(((solarLoad + bat) / Math.max(totalServed, 1)) * 100);
  const cost = grid * 0.28 - exp * 0.08; // €/h, buy 0.28 sell 0.08
  const co2 = (solarLoad + bat) * 0.4; // kg saved
  return { selfUse, cost, grid, co2 };
}

function pctDelta(a: number | string, b: number | string) {
  const av = Number(a), bv = Number(b);
  if (!bv) return 0;
  return ((av - bv) / Math.abs(bv)) * 100;
}
