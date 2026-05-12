// Generate a simple text whitepaper as Blob and trigger download
export function downloadWhitepaper() {
  const content = `GRIDMIND.AI — WHITEPAPER
================================================================
Micro-grid intelligenti: dalla bolletta al risparmio in 30 giorni
Autore: Giada Dalla Nora · Edizione 2026

1. IL PROBLEMA
----------------------------------------------------------------
I poli industriali italiani hanno investito miliardi in fotovoltaico
e batterie, ma il 60% dell'energia prodotta viene dispersa o ceduta
alla rete a prezzi marginali. Il motivo è semplice: gli impianti
non parlano tra loro e nessuno coordina in tempo reale produzione,
accumulo e carichi.

2. LA SOLUZIONE
----------------------------------------------------------------
GridMind.AI è un layer software che trasforma asset esistenti in
una micro-grid intelligente:
  • forecast meteo + carichi a 24h (accuratezza 92%)
  • ottimizzazione MILP ogni 5 minuti
  • dispatch automatico inverter / BESS / EVSE
  • dashboard real-time + report ESG automatici

3. RISULTATI MISURATI (caso TechGreen Srl)
----------------------------------------------------------------
  Auto-consumo solare    45%  →  78%
  Picchi prelievo rete    —   →  −62%
  Bolletta annua        100%  →  −38%
  Blackout locali      3/anno →  0
  Payback medio: 14 mesi

4. ARCHITETTURA TECNICA
----------------------------------------------------------------
  • Edge: Raspberry/Industrial PC, latenza <200ms
  • Cloud: digital twin + ML training pipeline
  • Protocolli: Modbus TCP, OCPP 2.0, IEC 61850, MQTT
  • Sicurezza: zero-trust, on-prem option, GDPR compliant

5. COME INIZIARE
----------------------------------------------------------------
  Step 1 — Audit gratuito (7 giorni)
  Step 2 — Pilot 30 giorni (€ 4.900)
  Step 3 — Scale roll-out enterprise

Contatti: giada.dallanora@outlook.it
LinkedIn: linkedin.com/in/giadadallanora

© 2026 GridMind.AI · Progetto UNITS — Digital Transformation, AI & Green Economy
`;
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "GridMind-Whitepaper-2026.txt";
  a.click();
  URL.revokeObjectURL(url);
}
