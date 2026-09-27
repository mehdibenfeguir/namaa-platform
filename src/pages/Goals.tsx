import { Target } from 'lucide-react'
import { Card, PageHeader, Progress } from '../components/ui'
import { STRATEGIC_GOALS } from '../data/namaa'

export default function Goals() {
  return (
    <div>
      <PageHeader
        kicker="Targets · strategy"
        title="Strategic impact dashboard"
        description="Clean energy, carbon, organic yield, and cost targets for the full 500-unit build-out."
        icon={<Target size={22} />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {STRATEGIC_GOALS.map((g) => (
          <Card key={g.name} className="p-5">
            <div className="text-xs font-semibold uppercase tracking-wide text-emerald-800/45">
              {g.name}
            </div>
            <div className="mt-2 flex items-end justify-between">
              <div>
                <div className="text-2xl font-black text-emerald-950">{g.current}</div>
                <div className="text-xs text-emerald-800/50">Target {g.target}</div>
              </div>
              <div className="text-sm font-bold text-leaf-700">{g.progress}%</div>
            </div>
            <Progress value={g.progress} className="mt-3" />
            <p className="mt-3 text-sm text-emerald-900/65">{g.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
