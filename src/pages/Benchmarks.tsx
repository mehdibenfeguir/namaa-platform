import { Gauge } from 'lucide-react'
import { Card, PageHeader, Progress } from '../components/ui'
import { BENCHMARKS } from '../data/namaa'

export default function Benchmarks() {
  return (
    <div>
      <PageHeader
        kicker="Targets · ratios"
        title="Reclamation, LER, water & soil"
        description="Benchmarks versus conventional farming and the 80%+ uncultivated land challenge in Saudi Arabia."
        icon={<Gauge size={22} />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {BENCHMARKS.map((b) => {
          const toward = b.target === 0 ? 0 : (b.current / b.target) * 100
          return (
            <Card key={b.id} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-bold text-emerald-950">{b.name}</h3>
                <div className="text-right">
                  <div className="text-2xl font-black text-leaf-700">{b.current}</div>
                  <div className="text-[11px] text-emerald-800/50">{b.unit}</div>
                </div>
              </div>
              <div className="mt-3 text-xs text-emerald-800/55">
                Target {b.target} {b.unit}
              </div>
              <Progress value={Math.min(100, toward)} className="mt-2" />
              <p className="mt-3 text-sm text-emerald-900/65">{b.note}</p>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
