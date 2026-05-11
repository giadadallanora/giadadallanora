import { useState } from "react";
import { Send, Check } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setEmail("");
  };

  return (
    <section className="py-20 relative">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="reveal relative overflow-hidden rounded-2xl border border-emerald/30 bg-gradient-to-br from-navy-light to-navy p-8 lg:p-10">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald/10 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <p className="font-mono text-emerald text-xs mb-2">// newsletter · 1x mese</p>
              <h3 className="text-2xl lg:text-3xl font-bold text-lightest leading-tight">
                Insight su <span className="text-emerald">smart-grid & AI</span> ogni mese
              </h3>
              <p className="text-sm text-light-slate mt-2">
                Case study, benchmark di mercato, decoder normativo (UVAM, RED III). Niente spam.
              </p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="tu@azienda.it"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-navy border border-border rounded-md px-4 py-3 text-lightest placeholder:text-slate focus:outline-none focus:border-emerald transition font-mono text-sm"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 bg-emerald text-navy px-5 py-3 rounded-md font-semibold hover:glow transition whitespace-nowrap"
                >
                  {sent ? <Check size={18} /> : <Send size={16} />}
                  {sent ? "Iscritto!" : "Iscriviti"}
                </button>
              </div>
              <p className="text-xs font-mono text-slate">
                Privacy GDPR · disiscrizione 1-click
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
