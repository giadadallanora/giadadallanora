import { Brain, Atom, GitBranch, Cpu, Plug, Code2 } from "lucide-react";

const items = [
  { icon: Brain, title: "Deep Reinforcement Learning", desc: "Agenti che imparano a bilanciare carichi, batterie e prezzi minimizzando i costi." },
  { icon: Atom, title: "Physics-Informed NN", desc: "Reti neurali vincolate dalle leggi della fisica elettrica per previsioni affidabili." },
  { icon: GitBranch, title: "Digital Twin", desc: "Replica software della tua rete: simula scenari prima di applicarli al reale." },
  { icon: Cpu, title: "Edge AI", desc: "Decisioni in millisecondi sul posto, senza dipendere dal cloud." },
  { icon: Plug, title: "Integrazioni API", desc: "Inverter, smart meter, wallbox, sensori: tutto in un solo flusso dati." },
  { icon: Code2, title: "Python + TensorFlow", desc: "Stack open-source maturo, deployabile su cloud o gateway industriale." },
];

export function Stack() {
  return (
    <section id="stack" className="py-24 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-14 max-w-2xl">
          <p className="font-mono text-emerald text-sm mb-3">// under the hood</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Cosa c'è sotto il cofano
          </h2>
          <p className="mt-4 text-light-slate">
            Niente magic, solo ricerca applicata. Ecco gli strumenti che fanno girare GridMind.
          </p>
        </div>

        <div className="reveal grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative p-6 rounded-xl bg-navy-light/60 border border-border hover:border-emerald/50 transition-all hover:-translate-y-1"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald/10 border border-emerald/30 flex items-center justify-center text-emerald mb-4 group-hover:glow transition">
                <Icon size={20} />
              </div>
              <h3 className="text-lightest font-semibold mb-2">{title}</h3>
              <p className="text-sm text-light-slate leading-relaxed">{desc}</p>
              <div className="absolute top-4 right-4 font-mono text-xs text-slate group-hover:text-emerald transition">
                {String(items.indexOf(items.find((i) => i.title === title)!) + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
