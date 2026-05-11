import { Linkedin, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-navy">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-md bg-emerald/10 border border-emerald/40 flex items-center justify-center text-emerald">
                <Zap size={16} />
              </div>
              <span className="font-semibold text-lightest">
                GridMind<span className="text-emerald">.AI</span>
              </span>
            </div>
            <p className="text-sm text-slate">
              © 2026 GridMind AI. Built with{" "}
              <span className="font-mono text-emerald">#VIBECODING</span>
            </p>
          </div>

          <div className="flex flex-col md:items-end gap-3">
            <div className="flex flex-wrap gap-5 text-sm">
              <a href="#" className="text-light-slate hover:text-emerald transition">Privacy</a>
              <a href="#" className="text-light-slate hover:text-emerald transition">Terms</a>
              <a href="https://www.linkedin.com/in/giadadallanora" target="_blank" rel="noopener noreferrer" className="text-light-slate hover:text-emerald transition inline-flex items-center gap-1.5">
                <Linkedin size={14} /> LinkedIn
              </a>
            </div>
            <p className="text-xs text-slate font-mono">
              Progetto UNITS 2026 — Digital Transformation, AI & Green Economy
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
