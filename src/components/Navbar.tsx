import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";
import { openBooking } from "@/components/BookingDialog";

const links = [
  { href: "#problem", label: "Problema" },
  { href: "#solution", label: "Soluzione" },
  { href: "#demo", label: "Demo" },
  { href: "#calculator", label: "ROI" },
  { href: "#case", label: "Case" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
  { href: "#about", label: "Chi sono" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-navy/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-md bg-emerald/10 border border-emerald/40 flex items-center justify-center text-emerald group-hover:glow transition">
            <Zap size={18} />
          </div>
          <span className="font-semibold text-lightest tracking-tight">
            GridMind<span className="text-emerald">.AI</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm">
          {links.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              className="text-light-slate hover:text-emerald transition-colors"
            >
              <span className="text-emerald font-mono mr-1.5 text-xs">0{i + 1}.</span>
              {l.label}
            </a>
          ))}
          <button
            onClick={openBooking}
            className="px-4 py-2 rounded-md border border-emerald text-emerald hover:bg-emerald/10 transition text-sm font-medium"
          >
            Prenota call
          </button>
        </nav>

        <button
          className="md:hidden text-emerald"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-navy-light border-t border-border">
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-light-slate hover:text-emerald"
              >
                <span className="text-emerald font-mono mr-2 text-xs">0{i + 1}.</span>
                {l.label}
              </a>
            ))}
            <button
              onClick={() => { setOpen(false); openBooking(); }}
              className="mt-2 px-4 py-2 rounded-md border border-emerald text-emerald text-center"
            >
              Prenota call
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
