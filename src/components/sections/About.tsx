import { Linkedin, Mail, GraduationCap, Globe2, Code2, Target, Sparkles, BookOpen, Trophy, Coffee, Languages, Lightbulb } from "lucide-react";
import profileImg from "@/assets/profile.jpeg";

const facts = [
  { icon: GraduationCap, text: "Ingegneria Informatica, UNITS" },
  { icon: Globe2, text: "Esperienza internazionale (UN, Erasmus)" },
  { icon: Code2, text: "Stack: Python, TensorFlow, Cloud, Digital Twins" },
  { icon: Target, text: "Missione: rendere ogni watt solare contabile, ottimizzabile, valorizzabile" },
];

const skills = [
  { name: "Python / NumPy / Pandas", level: 95 },
  { name: "Machine Learning (TensorFlow, PyTorch)", level: 88 },
  { name: "Optimization (MILP, OR-Tools)", level: 82 },
  { name: "Cloud & Edge (AWS, Docker, K8s)", level: 78 },
  { name: "IoT / Modbus / OCPP / IEC 61850", level: 70 },
];

const values = [
  { icon: Lightbulb, title: "Curiosità prima di tutto", text: "Ogni problema è un puzzle: smonto, capisco, ricostruisco meglio." },
  { icon: Trophy, title: "Risultati, non slide", text: "Mi interessano i numeri reali in bolletta, non le promesse di marketing." },
  { icon: Sparkles, title: "Tech con impatto", text: "Codice che riduce CO₂. Sostenibilità con il rigore dell'ingegneria." },
];

const funFacts = [
  { icon: Coffee, text: "3 caffè/giorno, mai meno" },
  { icon: BookOpen, text: "Fan di Andrew Ng & Hannah Ritchie" },
  { icon: Languages, text: "IT · EN · SP · un po' di francese" },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32 relative">
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-12">
          <p className="font-mono text-emerald text-sm mb-3">// about</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Chi sono — <span className="text-emerald">Giada Dalla Nora</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-start">
          <div className="reveal lg:col-span-2 flex flex-col items-center gap-6 lg:sticky lg:top-24">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald/30 blur-2xl" />
              <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-full border-2 border-emerald p-1.5 glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-navy-light">
                  <img
                    src={profileImg}
                    alt="Foto profilo di Giada Dalla Nora, founder di GridMind AI"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-navy-light border border-emerald/40 rounded-md px-3 py-1.5 text-xs font-mono text-emerald">
                ML Engineer · Founder
              </div>
            </div>

            <div className="w-full bg-navy-light/60 border border-border rounded-xl p-5 space-y-3">
              <div className="text-xs font-mono text-emerald uppercase tracking-wider">// fun facts</div>
              <ul className="space-y-2">
                {funFacts.map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm text-light-slate">
                    <Icon size={14} className="text-emerald shrink-0" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/giadadallanora" },
                { icon: Mail, label: "Email", href: "mailto:giada.dallanora@outlook.it" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={label}
                  className="w-11 h-11 rounded-lg border border-border flex items-center justify-center text-light-slate hover:border-emerald hover:text-emerald hover:-translate-y-0.5 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="reveal lg:col-span-3 space-y-10">
            <div className="space-y-4 text-light-slate leading-relaxed">
              <p className="text-lg">
                Sono <span className="text-lightest font-medium">Giada Dalla Nora</span>,
                ingegnere informatico con un'ossessione per l'ottimizzazione e un'ansia
                per lo spreco energetico. Cresciuta tra la tranquillità e i paesaggi della campagna veneta, ho imparato
                presto due cose: che <span className="text-emerald">le risorse non sono infinite</span>{" "}
                e che <span className="text-emerald">i sistemi complessi possono essere semplici</span>,
                se ascoltati con i dati giusti.
              </p>
              <p>
                Ho iniziato notando un pattern:{" "}
                <span className="text-lightest">le aziende investono milioni in pannelli
                solari e batterie, poi li gestiscono con Excel, post-it e intuizioni</span>.
                Il risultato è che il 60% dell'energia pulita che producono non viene
                valorizzata. Ho deciso di risolvere questo paradosso con algoritmi —
                non con altri pannelli.
              </p>
              <p>
                Oggi GridMind.AI è il mio modo di unire le due cose che amo di più:
                <span className="text-lightest"> ingegneria rigorosa</span> e{" "}
                <span className="text-lightest">impatto ambientale misurabile</span>.
                Non scrivo codice per fare slide; scrivo codice che fa scendere i
                numeri in bolletta e le emissioni dei miei clienti.
              </p>
            </div>

            <ul className="grid sm:grid-cols-2 gap-3">
              {facts.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 p-3 rounded-lg bg-navy-light/40 border border-border hover:border-emerald/40 transition"
                >
                  <Icon className="text-emerald mt-0.5 flex-shrink-0" size={18} />
                  <span className="text-sm text-light-slate">{text}</span>
                </li>
              ))}
            </ul>

            {/* Values */}
            <div>
              <p className="font-mono text-emerald text-xs uppercase tracking-wider mb-4">// cosa mi guida</p>
              <div className="grid sm:grid-cols-3 gap-4">
                {values.map(({ icon: Icon, title, text }) => (
                  <div key={title} className="bg-navy-light/40 border border-border rounded-xl p-5 hover:-translate-y-1 hover:border-emerald/40 transition">
                    <Icon className="text-emerald mb-3" size={22} />
                    <div className="text-lightest font-semibold mb-1.5">{title}</div>
                    <p className="text-sm text-slate leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <p className="font-mono text-emerald text-xs uppercase tracking-wider mb-4">// stack & competenze</p>
              <div className="space-y-3">
                {skills.map((s) => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-light-slate">{s.name}</span>
                      <span className="font-mono text-emerald">{s.level}%</span>
                    </div>
                    <div className="h-1.5 bg-navy-light rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald/60 to-emerald rounded-full transition-all duration-1000"
                        style={{ width: `${s.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <blockquote className="relative border-l-2 border-emerald pl-5 py-2 italic text-light-slate">
              "Non mi interessa costruire l'ennesima dashboard.
              Mi interessa che la prossima generazione abbia ancora un pianeta
              da abitare — e che ci si arrivi con il rigore di un algoritmo,
              non con la fortuna."
              <footer className="not-italic text-sm text-slate mt-2 font-mono">— Giada</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
