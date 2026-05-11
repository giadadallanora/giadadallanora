import { useEffect, useRef, useState } from "react";
import { Activity, Zap, Leaf, Euro } from "lucide-react";

function useCountUp(target: number, duration = 1800, start = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return val;
}

const stats = [
  { icon: Zap, target: 12480, suffix: " MWh", label: "Energia ottimizzata", fmt: (n: number) => Math.round(n).toLocaleString("it-IT") },
  { icon: Euro, target: 2.4, suffix: "M€", label: "Risparmi simulati", fmt: (n: number) => n.toFixed(1) },
  { icon: Leaf, target: 4860, suffix: " t", label: "CO₂ evitata", fmt: (n: number) => Math.round(n).toLocaleString("it-IT") },
  { icon: Activity, target: 78, suffix: "%", label: "Auto-consumo medio", fmt: (n: number) => Math.round(n).toString() },
];

export function LiveTicker() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setVisible(true),
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => (p + 1) % 4), 1400);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={ref} className="py-20 lg:py-24 relative">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal flex items-center gap-3 mb-10">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald" />
          </span>
          <p className="font-mono text-emerald text-sm">// live · network status</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, target, suffix, label, fmt }, i) => {
            const v = useCountUp(target, 2000 + i * 200, visible);
            return (
              <div
                key={label}
                className="reveal relative group p-6 rounded-xl border border-border bg-navy-light/40 hover:border-emerald/60 transition overflow-hidden"
              >
                <div
                  className={`absolute -inset-px rounded-xl opacity-0 ${
                    pulse === i ? "opacity-100" : ""
                  } transition-opacity duration-700 pointer-events-none`}
                  style={{
                    background:
                      "linear-gradient(120deg, transparent, oklch(0.88 0.18 175 / 0.18), transparent)",
                  }}
                />
                <Icon className="text-emerald mb-4" size={22} />
                <div className="font-mono text-3xl lg:text-4xl text-lightest tracking-tight">
                  {fmt(v)}
                  <span className="text-emerald">{suffix}</span>
                </div>
                <div className="text-sm text-slate mt-1.5">{label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
