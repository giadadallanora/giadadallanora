import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Devo cambiare i miei inverter o batterie?",
    a: "No. GridMind AI si integra via Modbus / OPC-UA / API con la maggior parte dei sistemi SCADA, inverter (SMA, Huawei, Fronius, ABB) e BMS già installati. Aggiungiamo un livello di intelligenza, non sostituiamo hardware.",
  },
  {
    q: "Quanto tempo serve per vedere risultati?",
    a: "Il pilot dura 4 settimane: settimana 1 audit, 2-3 digital twin e simulazione, 4 deploy in produzione. I primi KPI verificati sono disponibili dopo 30 giorni di funzionamento reale.",
  },
  {
    q: "I miei dati energetici escono dall'azienda?",
    a: "Tu scegli. Modalità on-prem: tutto resta in stabilimento (edge box). Modalità cloud: dati anonimizzati, hosting EU, conformità GDPR. Nessun training su dati cliente senza consenso esplicito.",
  },
  {
    q: "Cosa succede se l'AI sbaglia una decisione?",
    a: "Ogni dispatch passa per un layer di safety rules (limiti hardware, sicurezza rete, contratto fornitura). L'AI propone, le regole filtrano, l'operatore può sempre tornare a manuale con un click.",
  },
  {
    q: "Quanto costa?",
    a: "Pilot a forfait (ROI verificabile in fase 1). Production: pricing performance-based, % sui risparmi misurati vs baseline contrattuale. Se non risparmi, non paghi la quota variabile.",
  },
  {
    q: "Funziona anche senza fotovoltaico?",
    a: "Sì, ovunque ci sia energia da gestire: ottimizzazione carichi, demand response, partecipazione a mercati di flessibilità (UVAM, MSD), gestione picchi tariffari. Il solare amplifica i benefici, ma non è un prerequisito.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <div className="reveal mb-10">
          <p className="font-mono text-emerald text-sm mb-3">// faq</p>
          <h2 className="text-3xl lg:text-5xl font-bold text-lightest">
            Domande <span className="text-emerald">frequenti</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="reveal space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={f.q}
              value={`item-${i}`}
              className="border border-border rounded-lg px-5 bg-navy-light/40 data-[state=open]:border-emerald/60 transition-colors"
            >
              <AccordionTrigger className="text-left text-lightest hover:text-emerald hover:no-underline py-4">
                <span className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-emerald">0{i + 1}</span>
                  <span>{f.q}</span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-light-slate leading-relaxed pb-4 pl-8">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
