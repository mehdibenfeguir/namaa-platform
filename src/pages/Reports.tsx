import { FileBarChart, FileSpreadsheet, FileText } from 'lucide-react'
import { Badge, Button, Card, PageHeader } from '../components/ui'
import { IMPACT } from '../data/namaa'
import { num } from '../lib/format'

function download(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function Reports() {
  const csv = [
    'Metric,Value,Unit',
    `CO2 avoided,${IMPACT.co2AvoidedT},tCO2e/yr`,
    `Desert reclaimed,${IMPACT.desertReclaimedHa},ha`,
    `Water saved,${IMPACT.waterSavedM3},m3`,
    `Organic yield,${IMPACT.organicTons},t/yr`,
  ].join('\n')

  const reportText = `NAMAA · Vision 2030 Impact Report (demo)
Prepared by Fatma Ben Feguir

CO2 avoided: ${num(IMPACT.co2AvoidedT)} tCO2e / year
Desert land reclaimed: ${num(IMPACT.desertReclaimedHa)} ha
Water saved: ${num(IMPACT.waterSavedM3)} m3
Organic crop yield: ${num(IMPACT.organicTons)} t / year
`

  return (
    <div>
      <PageHeader
        kicker="Analytics"
        title="Sustainability & Vision 2030 reports"
        description="Periodic impact figures for partners, investors, and regulators. Exports are generated in-browser from static demo data."
        icon={<FileBarChart size={22} />}
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => download('namaa-impact.csv', csv, 'text/csv')}
            >
              <FileSpreadsheet size={16} /> Excel / CSV
            </Button>
            <Button
              onClick={() =>
                download('namaa-impact-report.txt', reportText, 'text/plain')
              }
            >
              <FileText size={16} /> PDF pack (text)
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['CO₂ avoided', `${num(IMPACT.co2AvoidedT)} t`, 'Annual, renewable displacement'],
          ['Desert reclaimed', `${num(IMPACT.desertReclaimedHa)} ha`, 'Of 10,000 ha target'],
          ['Water saved', `${num(IMPACT.waterSavedM3)} m³`, 'Vs conventional irrigation'],
          ['Organic yield', `${num(IMPACT.organicTons)} t`, 'CEA + field organics'],
        ].map(([k, v, h]) => (
          <Card key={k} className="p-5">
            <div className="text-xs uppercase text-emerald-800/50">{k}</div>
            <div className="mt-1 text-2xl font-black text-emerald-950">{v}</div>
            <div className="mt-1 text-xs text-emerald-800/55">{h}</div>
          </Card>
        ))}
      </div>

      <Card className="mt-4 p-6">
        <Badge tone="leaf">Q3 2026 · draft for stakeholders</Badge>
        <h2 className="mt-3 text-lg font-bold text-emerald-950">Narrative summary</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-emerald-900/70">
          NAMAA dual-uses unprepared desert land: 1.2 MW agrivoltaic blocks shade
          crops, cut soil temperature by 2.5°C, and power sub-surface drip. Water
          use is 37.4% below baseline (target 35–40%). Land Equivalent Ratio is
          1.62 — a 62% productivity lift versus single-use farming. Exports above
          are dummy files for the demo; a production build would stream signed
          PDF/XLSX from the reporting service.
        </p>
      </Card>
    </div>
  )
}
