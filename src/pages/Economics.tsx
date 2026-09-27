import { Wallet } from 'lucide-react'
import { Badge, Card, PageHeader, Progress } from '../components/ui'
import { COST_LINES } from '../data/namaa'
import { sar } from '../lib/format'

export default function Economics() {
  const capexPlan = COST_LINES.filter((c) => c.kind === 'capex').reduce((s, c) => s + c.plan, 0)
  const capexAct = COST_LINES.filter((c) => c.kind === 'capex').reduce((s, c) => s + c.actual, 0)
  const opexPlan = COST_LINES.filter((c) => c.kind === 'opex').reduce((s, c) => s + c.plan, 0)
  const opexAct = COST_LINES.filter((c) => c.kind === 'opex').reduce((s, c) => s + c.actual, 0)

  return (
    <div>
      <PageHeader
        kicker="Financial viability"
        title="CapEx & OpEx optimization"
        description="Static demo figures in SAR millions. Smart devices and water automation pull cost below plan."
        icon={<Wallet size={22} />}
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <Card className="p-5">
          <Badge tone="solar">CapEx</Badge>
          <div className="mt-2 text-2xl font-black">{sar(capexAct * 1_000_000, true)}</div>
          <div className="text-sm text-emerald-800/55">
            vs plan {sar(capexPlan * 1_000_000, true)} ·{' '}
            {(((capexAct - capexPlan) / capexPlan) * 100).toFixed(1)}%
          </div>
        </Card>
        <Card className="p-5">
          <Badge tone="leaf">OpEx / year</Badge>
          <div className="mt-2 text-2xl font-black">{sar(opexAct * 1_000_000, true)}</div>
          <div className="text-sm text-emerald-800/55">
            vs plan {sar(opexPlan * 1_000_000, true)} ·{' '}
            {(((opexAct - opexPlan) / opexPlan) * 100).toFixed(1)}%
          </div>
        </Card>
      </div>
      <Card className="overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-leaf-50 text-left text-xs uppercase text-emerald-800/60">
            <tr>
              <th className="px-5 py-3">Line</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Plan</th>
              <th className="px-5 py-3">Actual</th>
              <th className="px-5 py-3">vs plan</th>
            </tr>
          </thead>
          <tbody>
            {COST_LINES.map((c) => {
              const delta = ((c.actual - c.plan) / c.plan) * 100
              return (
                <tr key={c.item} className="border-t border-emerald-900/8">
                  <td className="px-5 py-3 font-medium text-emerald-950">{c.item}</td>
                  <td className="px-5 py-3">
                    <Badge tone={c.kind === 'capex' ? 'solar' : 'leaf'}>{c.kind}</Badge>
                  </td>
                  <td className="px-5 py-3">{c.plan} M</td>
                  <td className="px-5 py-3">{c.actual} M</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <span className="w-12 text-leaf-700">{delta.toFixed(1)}%</span>
                      <Progress value={Math.min(100, (c.actual / c.plan) * 100)} className="max-w-28" />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </Card>
    </div>
  )
}
