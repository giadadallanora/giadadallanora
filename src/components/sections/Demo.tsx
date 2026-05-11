import { useEffect, useMemo, useState } from "react";
import {
  Sun, BatteryCharging, Factory, Car, Sparkles, RotateCcw,
  Save, Trash2, Download, FileText, History,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

type Mode = "manual" | "ai";

interface Inputs {
  solar: number; battery: number; plant: number; evs: number; mode: Mode;
}

interface SavedRun {
  id: string;
  name: string;
  ts: number;
  inputs: Inputs;
  kpi: ReturnType<typeof simulate>;
}

const STORAGE_KEY = "gridmind.runs";

export function Demo() {
  const [solar, setSolar] = useState(140);
  const [battery, setBattery] = useState(60);
  const [plant, setPlant] = useState(90);
  const [evs, setEvs] = useState(4);
  const [mode, setMode] = useState<Mode>("ai");

  const [runs, setRuns] = useState<SavedRun[]>([]);
  const [runName, setRunName] = useState("");

  // Load history on mount (client-only — avoids hydration mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setRuns(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(runs)); } catch {}
  }, [runs]);

  const reset = () => { setSolar(140); setBattery(60); setPlant(90); setEvs(4); setMode("ai"); };

  const inputs: Inputs = { solar, battery, plant, evs, mode };
  const kpi = useMemo(() => simulate(inputs), [solar, battery, plant, evs, mode]);

  const saveRun = () => {
    const name = runName.trim() || `Scenario ${runs.length + 1}`;
    const run: SavedRun = {
      id: `${Date.now()}-${runs.length}`,
      name,
      ts: Date.now(),
      inputs,
      kpi,
    };
    setRuns((r) => [run, ...r].slice(0, 12));
    setRunName("");
  };

  const loadRun = (r: SavedRun) => {
    setSolar(r.inputs.solar);
    setBattery(r.inputs.battery);
    setPlant(r.inputs.plant);
    setEvs(r.inputs.evs);
    setMode(r.inputs.mode);
    document.getElementById("demo")?.scrollIntoView({ behavior: "smooth" });
  };

  const deleteRun = (id: string) => setRuns((r) => r.filter((x) => x.id !== id));
  const clearAll = () => setRuns([]);

  return (
    <section id="demo" className="py-24 lg:py-32 bg-navy-light/30 border-y border-border">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-12 max-w-2xl">
          <p className="font-mono text-emerald text-sm mb-3">// live simulator</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Prova la <span className="text-emerald">micro-grid</span> in tempo reale
          </h2>
          <p className="mt-4 text-light-slate">
            Muovi gli slider, salva gli scenari, confronta i KPI ed esporta un report
            PDF/CSV pronto per il CEO.
          </p>
        </div>

        <div className="reveal grid lg:grid-cols-5 gap-6">
          {/* Controls */}
          <div className="lg:col-span-2 bg-navy border border-border rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate uppercase tracking-wider">Inputs</span>
              <button onClick={reset} className="text-xs font-mono text-light-slate hover:text-emerald inline-flex items-center gap-1.5 transition">
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

            <div className="pt-4 border-t border-border space-y-2">
              <div className="text-xs font-mono text-slate uppercase tracking-wider">Salva scenario</div>
              <div className="flex gap-2">
                <input
                  value={runName}
                  onChange={(e) => setRunName(e.target.value)}
                  placeholder={`Scenario ${runs.length + 1}`}
                  className="flex-1 bg-navy-light border border-border rounded-md px-3 py-2 text-sm text-lightest placeholder:text-slate focus:outline-none focus:border-emerald"
                />
                <button
                  onClick={saveRun}
                  className="inline-flex items-center gap-1.5 bg-emerald text-navy px-3 py-2 rounded-md text-sm font-semibold hover:glow transition"
                >
                  <Save size={14} /> Salva
                </button>
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

        {/* History + comparison */}
        <div className="reveal mt-10 bg-navy border border-border rounded-xl overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 border-b border-border">
            <div className="flex items-center gap-2 text-light-slate">
              <History size={16} className="text-emerald" />
              <span className="text-sm font-medium">Storico simulazioni</span>
              <span className="text-xs font-mono text-slate">({runs.length}/12)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => exportCSV(runs, kpi, inputs)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-border text-light-slate text-sm hover:border-emerald hover:text-emerald transition"
              >
                <Download size={14} /> CSV
              </button>
              <button
                onClick={() => exportPDF(runs, kpi, inputs)}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-emerald text-navy text-sm font-semibold hover:glow transition"
              >
                <FileText size={14} /> Report PDF
              </button>
              {runs.length > 0 && (
                <button
                  onClick={clearAll}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md border border-border text-slate text-sm hover:border-red-400 hover:text-red-400 transition"
                >
                  <Trash2 size={14} /> Svuota
                </button>
              )}
            </div>
          </div>

          {runs.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate">
              Nessuno scenario salvato. Configura gli input e premi{" "}
              <span className="text-emerald font-mono">Salva</span> per confrontare i KPI.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs font-mono uppercase tracking-wider text-slate border-b border-border">
                    <th className="px-5 py-3">Scenario</th>
                    <th className="px-3 py-3">Modo</th>
                    <th className="px-3 py-3">Solare</th>
                    <th className="px-3 py-3">Bat</th>
                    <th className="px-3 py-3">Carico</th>
                    <th className="px-3 py-3">EV</th>
                    <th className="px-3 py-3 text-emerald">Self-use</th>
                    <th className="px-3 py-3 text-emerald">€/h</th>
                    <th className="px-3 py-3 text-emerald">Rete</th>
                    <th className="px-3 py-3 text-emerald">CO₂</th>
                    <th className="px-3 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {runs.map((r) => (
                    <tr key={r.id} className="border-b border-border/50 hover:bg-navy-light/40 transition">
                      <td className="px-5 py-3">
                        <div className="text-lightest font-medium">{r.name}</div>
                        <div className="text-[10px] font-mono text-slate">
                          {new Date(r.ts).toLocaleString("it-IT")}
                        </div>
                      </td>
                      <td className="px-3 py-3 font-mono text-xs">
                        <span className={r.inputs.mode === "ai" ? "text-emerald" : "text-yellow-300"}>
                          {r.inputs.mode === "ai" ? "AI" : "Man"}
                        </span>
                      </td>
                      <td className="px-3 py-3 font-mono text-light-slate">{r.inputs.solar}</td>
                      <td className="px-3 py-3 font-mono text-light-slate">{r.inputs.battery}%</td>
                      <td className="px-3 py-3 font-mono text-light-slate">{r.inputs.plant}</td>
                      <td className="px-3 py-3 font-mono text-light-slate">{r.inputs.evs}</td>
                      <td className="px-3 py-3 font-mono text-lightest">{r.kpi.selfUse}%</td>
                      <td className="px-3 py-3 font-mono text-lightest">€{r.kpi.cost}</td>
                      <td className="px-3 py-3 font-mono text-lightest">{r.kpi.gridDraw}</td>
                      <td className="px-3 py-3 font-mono text-lightest">{r.kpi.co2}</td>
                      <td className="px-3 py-3">
                        <div className="flex gap-1.5 justify-end">
                          <button onClick={() => loadRun(r)} className="text-xs px-2 py-1 rounded border border-border text-light-slate hover:border-emerald hover:text-emerald transition">
                            Carica
                          </button>
                          <button onClick={() => deleteRun(r.id)} className="text-slate hover:text-red-400 transition p-1" aria-label="elimina">
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
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

// --- export helpers ---
function buildRows(runs: SavedRun[], current: ReturnType<typeof simulate>, currentInputs: Inputs) {
  const head = ["Scenario", "Timestamp", "Modo", "Solare (kW)", "Batteria (%)", "Carico (kW)", "EV", "Self-use (%)", "Costo (€/h)", "Rete (kW)", "CO₂ (kg/h)", "Δ vs manuale (%)"];
  const rows: (string | number)[][] = [];
  rows.push([
    "[Live] Configurazione attuale",
    new Date().toLocaleString("it-IT"),
    currentInputs.mode === "ai" ? "GridMind AI" : "Manuale",
    currentInputs.solar, currentInputs.battery, currentInputs.plant, currentInputs.evs,
    current.selfUse, current.cost, current.gridDraw, current.co2,
    current.selfUseDelta.toFixed(1),
  ]);
  runs.forEach((r) => {
    rows.push([
      r.name,
      new Date(r.ts).toLocaleString("it-IT"),
      r.inputs.mode === "ai" ? "GridMind AI" : "Manuale",
      r.inputs.solar, r.inputs.battery, r.inputs.plant, r.inputs.evs,
      r.kpi.selfUse, r.kpi.cost, r.kpi.gridDraw, r.kpi.co2,
      r.kpi.selfUseDelta.toFixed(1),
    ]);
  });
  return { head, rows };
}

function exportCSV(runs: SavedRun[], current: ReturnType<typeof simulate>, currentInputs: Inputs) {
  const { head, rows } = buildRows(runs, current, currentInputs);
  const csv = [head, ...rows]
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8;" });
  triggerDownload(blob, `gridmind-report-${Date.now()}.csv`);
}

function exportPDF(runs: SavedRun[], current: ReturnType<typeof simulate>, currentInputs: Inputs) {
  const { head, rows } = buildRows(runs, current, currentInputs);
  const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });

  doc.setFillColor(10, 25, 47);
  doc.rect(0, 0, doc.internal.pageSize.getWidth(), 80, "F");
  doc.setTextColor(100, 255, 218);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("GridMind AI · Simulator Report", 40, 38);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(204, 214, 246);
  doc.text(`Generato: ${new Date().toLocaleString("it-IT")}`, 40, 58);
  doc.text(`Scenari salvati: ${runs.length}`, 40, 72);

  doc.setTextColor(40, 40, 40);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Configurazione attuale", 40, 110);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text(
    `Modo: ${currentInputs.mode === "ai" ? "GridMind AI" : "Manuale"}  ·  Solare: ${currentInputs.solar} kW  ·  Batteria: ${currentInputs.battery}%  ·  Carico: ${currentInputs.plant} kW  ·  EV: ${currentInputs.evs}`,
    40, 126,
  );
  doc.text(
    `KPI: self-use ${current.selfUse}%  ·  costo €${current.cost}/h  ·  rete ${current.gridDraw} kW  ·  CO₂ ${current.co2} kg/h`,
    40, 140,
  );

  autoTable(doc, {
    startY: 160,
    head: [head],
    body: rows.map((r) => r.map((v) => String(v))),
    styles: { font: "helvetica", fontSize: 8, cellPadding: 5 },
    headStyles: { fillColor: [10, 25, 47], textColor: [100, 255, 218], fontStyle: "bold" },
    alternateRowStyles: { fillColor: [245, 248, 252] },
    margin: { left: 30, right: 30 },
  });

  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(136, 146, 176);
    doc.text(
      `GridMind AI · pagina ${i}/${pageCount} · hello@gridmind.ai`,
      40,
      doc.internal.pageSize.getHeight() - 20,
    );
  }

  doc.save(`gridmind-report-${Date.now()}.pdf`);
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// --- simulation logic ---
function simulate({ solar, battery, plant, evs, mode }: Inputs) {
  const evLoad = evs * 11;
  const totalLoad = plant + evLoad;

  const mSolarToLoad = Math.min(solar, totalLoad) * 0.7;
  const mBatteryDischarge = battery > 30 ? Math.min(20, totalLoad - mSolarToLoad) : 0;
  const mGrid = Math.max(0, totalLoad - mSolarToLoad - mBatteryDischarge);
  const mExport = Math.max(0, solar - mSolarToLoad - 5);

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
    cost: Number(cur.cost.toFixed(2)),
    costDelta: pctDelta(cur.cost, base.cost),
    gridDraw: Number(cur.grid.toFixed(0)),
    gridDelta: pctDelta(cur.grid, base.grid),
    co2: Number(cur.co2.toFixed(1)),
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
  const cost = grid * 0.28 - exp * 0.08;
  const co2 = (solarLoad + bat) * 0.4;
  return { selfUse, cost, grid, co2 };
}

function pctDelta(a: number, b: number) {
  if (!b) return 0;
  return ((a - b) / Math.abs(b)) * 100;
}
