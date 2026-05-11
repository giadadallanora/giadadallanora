import { Sun, BatteryCharging, Car, Factory, Cpu } from "lucide-react";

export function EnergyFlow() {
  return (
    <div className="relative w-full aspect-square max-w-[520px] mx-auto">
      <div className="absolute inset-0 grid-bg rounded-2xl opacity-60" />
      <div className="absolute inset-0 rounded-2xl border border-emerald/20 bg-gradient-to-br from-emerald/5 to-transparent" />

      {/* Central AI brain */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-emerald/30 blur-2xl animate-flow" />
          <div className="relative w-24 h-24 rounded-full bg-navy-light border-2 border-emerald flex flex-col items-center justify-center glow">
            <Cpu className="text-emerald" size={28} />
            <span className="text-[10px] font-mono text-emerald mt-1">AI CORE</span>
          </div>
        </div>
      </div>

      {/* Nodes */}
      <Node icon={<Sun size={22} />} label="Solar" pos="top-4 left-4" delay={0} />
      <Node icon={<BatteryCharging size={22} />} label="Battery" pos="top-4 right-4" delay={0.6} />
      <Node icon={<Car size={22} />} label="EV Fleet" pos="bottom-4 right-4" delay={1.2} />
      <Node icon={<Factory size={22} />} label="Plant" pos="bottom-4 left-4" delay={1.8} />

      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
        <g stroke="currentColor" className="text-emerald" strokeWidth="0.4" fill="none">
          <line x1="15" y1="15" x2="50" y2="50" className="animate-dash" />
          <line x1="85" y1="15" x2="50" y2="50" className="animate-dash" />
          <line x1="85" y1="85" x2="50" y2="50" className="animate-dash" />
          <line x1="15" y1="85" x2="50" y2="50" className="animate-dash" />
        </g>
      </svg>

      {/* Floating KPIs */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2 bg-navy-light/90 backdrop-blur border border-emerald/30 rounded-md px-2 py-1 text-[10px] font-mono text-emerald animate-float">
        +38% saving
      </div>
      <div className="absolute top-1/2 right-2 -translate-y-1/2 bg-navy-light/90 backdrop-blur border border-emerald/30 rounded-md px-2 py-1 text-[10px] font-mono text-emerald animate-float" style={{ animationDelay: "1s" }}>
        78% self-use
      </div>
    </div>
  );
}

function Node({ icon, label, pos, delay }: { icon: React.ReactNode; label: string; pos: string; delay: number }) {
  return (
    <div className={`absolute ${pos} z-20`}>
      <div className="w-16 h-16 rounded-xl bg-navy-light border border-emerald/40 flex flex-col items-center justify-center text-emerald shadow-lg animate-float" style={{ animationDelay: `${delay}s` }}>
        {icon}
        <span className="text-[9px] font-mono mt-0.5 text-light-slate">{label}</span>
      </div>
    </div>
  );
}
