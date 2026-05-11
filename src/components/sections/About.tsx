import { Linkedin, Mail, GraduationCap, Globe2, Code2, Target } from "lucide-react";
import profileImg from "@/assets/profile.jpeg";

const facts = [
  { icon: GraduationCap, text: "Ingegneria Informatica, UNITS" },
  { icon: Globe2, text: "Esperienza internazionale (UN, Erasmus)" },
  { icon: Code2, text: "Stack: Python, TensorFlow, Cloud, Digital Twins" },
  { icon: Target, text: "Missione: rendere ogni watt solare contabile, ottimizzabile, valorizzabile" },
];

export function About() {
  return (
    <section id="about" className="py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-12">
          <p className="font-mono text-emerald text-sm mb-3">// about</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Chi sono — <span className="text-emerald">Giada Dalla Nora</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="reveal lg:col-span-2 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-emerald/30 blur-2xl" />
              <div className="relative w-56 h-56 lg:w-64 lg:h-64 rounded-full border-2 border-emerald p-1.5 glow">
                <div className="w-full h-full rounded-full overflow-hidden bg-navy-light">
                  <img
                    src={profileImg}
                    alt="Foto profilo della founder di GridMind AI"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-navy-light border border-emerald/40 rounded-md px-3 py-1.5 text-xs font-mono text-emerald">
                ML Engineer
              </div>
            </div>
          </div>

          <div className="reveal lg:col-span-3">
            <p className="text-lg text-light-slate leading-relaxed">
              Ingegnere informatico con un'ossessione per l'ottimizzazione e un'ansia per
              lo spreco energetico. Ho iniziato notando un pattern:{" "}
              <span className="text-lightest">le aziende investono milioni in pannelli
              solari, poi le gestiscono con Excel e post-it</span>. Ho deciso di risolvere
              questo paradosso con algoritmi.
            </p>

            <ul className="mt-8 grid sm:grid-cols-2 gap-3">
              {facts.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-start gap-3 p-3 rounded-lg bg-navy-light/40 border border-border"
                >
                  <Icon className="text-emerald mt-0.5 flex-shrink-0" size={18} />
                  <span className="text-sm text-light-slate">{text}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex gap-3">
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
        </div>
      </div>
    </section>
  );
}
