import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Calendar, Mail, User, Building2, CheckCircle2, Download } from "lucide-react";
import { toast } from "sonner";

export const openBooking = () => window.dispatchEvent(new Event("open-booking"));

function buildICS({ name, email, date, time }: { name: string; email: string; date: string; time: string }) {
  const dt = new Date(`${date}T${time}:00`);
  const end = new Date(dt.getTime() + 30 * 60 * 1000);
  const fmt = (d: Date) =>
    d.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//GridMind.AI//Booking//IT
BEGIN:VEVENT
UID:${Date.now()}@gridmind.ai
DTSTAMP:${fmt(new Date())}
DTSTART:${fmt(dt)}
DTEND:${fmt(end)}
SUMMARY:Call GridMind.AI con Giada Dalla Nora
DESCRIPTION:Discovery call 30 min — micro-grid AI optimization. Partecipante: ${name} (${email})
ORGANIZER;CN=Giada Dalla Nora:mailto:giada.dallanora@outlook.it
ATTENDEE;CN=${name};RSVP=TRUE:mailto:${email}
LOCATION:Google Meet (link via email)
END:VEVENT
END:VCALENDAR`;
}

export function BookingDialog() {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    date: "",
    time: "10:00",
    notes: "",
  });

  useEffect(() => {
    const h = () => {
      setDone(false);
      setOpen(true);
    };
    window.addEventListener("open-booking", h);
    return () => window.removeEventListener("open-booking", h);
  }, []);

  // default date = tomorrow
  useEffect(() => {
    if (!form.date) {
      const t = new Date();
      t.setDate(t.getDate() + 1);
      setForm((f) => ({ ...f, date: t.toISOString().slice(0, 10) }));
    }
  }, [form.date]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.date) return;
    const ics = buildICS(form);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gridmind-call-${form.date}.ics`;
    a.click();
    URL.revokeObjectURL(url);
    setDone(true);
    toast.success("Richiesta inviata!", {
      description: "Ti ho mandato l'invito calendario. Confermo entro 24h via email.",
    });
  };

  const today = new Date().toISOString().slice(0, 10);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-navy-light border-emerald/30 text-light-slate max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lightest text-2xl flex items-center gap-2">
            <Calendar className="text-emerald" size={22} />
            {done ? "Tutto pronto!" : "Prenota una call gratuita"}
          </DialogTitle>
          <DialogDescription className="text-slate">
            {done
              ? "Scarica l'invito ed entro 24h ricevi il link Meet."
              : "30 minuti per capire se la tua micro-grid può risparmiare il 30%."}
          </DialogDescription>
        </DialogHeader>

        {done ? (
          <div className="space-y-4 py-2">
            <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald/10 border border-emerald/30">
              <CheckCircle2 className="text-emerald shrink-0" size={28} />
              <div className="text-sm">
                <div className="text-lightest font-semibold">{form.name}</div>
                <div className="font-mono text-emerald text-xs">
                  {form.date} · {form.time} (30 min)
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const ics = buildICS(form);
                const blob = new Blob([ics], { type: "text/calendar" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `gridmind-call-${form.date}.ics`;
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald text-navy py-2.5 rounded-md font-semibold hover:glow transition"
            >
              <Download size={16} /> Scarica invito (.ics)
            </button>
            <button
              onClick={() => setOpen(false)}
              className="w-full text-sm text-slate hover:text-emerald transition"
            >
              Chiudi
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-mono text-slate flex items-center gap-1 mb-1">
                  <User size={12} /> nome
                </span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-navy border border-border rounded-md px-3 py-2 text-sm text-lightest focus:outline-none focus:border-emerald"
                />
              </label>
              <label className="block">
                <span className="text-xs font-mono text-slate flex items-center gap-1 mb-1">
                  <Building2 size={12} /> azienda
                </span>
                <input
                  value={form.company}
                  onChange={(e) => setForm({ ...form, company: e.target.value })}
                  className="w-full bg-navy border border-border rounded-md px-3 py-2 text-sm text-lightest focus:outline-none focus:border-emerald"
                />
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-mono text-slate flex items-center gap-1 mb-1">
                <Mail size={12} /> email
              </span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-navy border border-border rounded-md px-3 py-2 text-sm text-lightest focus:outline-none focus:border-emerald"
              />
            </label>
            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="text-xs font-mono text-slate mb-1 block">data</span>
                <input
                  type="date"
                  required
                  min={today}
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full bg-navy border border-border rounded-md px-3 py-2 text-sm text-lightest focus:outline-none focus:border-emerald"
                />
              </label>
              <label className="block">
                <span className="text-xs font-mono text-slate mb-1 block">orario</span>
                <select
                  value={form.time}
                  onChange={(e) => setForm({ ...form, time: e.target.value })}
                  className="w-full bg-navy border border-border rounded-md px-3 py-2 text-sm text-lightest focus:outline-none focus:border-emerald"
                >
                  {["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block">
              <span className="text-xs font-mono text-slate mb-1 block">note (opzionale)</span>
              <textarea
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full bg-navy border border-border rounded-md px-3 py-2 text-sm text-lightest focus:outline-none focus:border-emerald resize-none"
                placeholder="kW installati, batterie, principali problemi…"
              />
            </label>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald text-navy py-3 rounded-md font-semibold hover:glow transition"
            >
              <Calendar size={16} /> Conferma prenotazione
            </button>
            <p className="text-[11px] text-slate text-center font-mono">
              Nessun spam · cancellazione libera · GDPR compliant
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
