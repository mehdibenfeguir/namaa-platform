import { Map } from 'lucide-react'
import { Badge, Card, PageHeader, Progress } from '../components/ui'
import { LAND_SUMMARY, LAND_UNITS } from '../data/namaa'
import { cx, num } from '../lib/format'

const color: Record<string, string> = {
  active: 'bg-leaf-500',
  prepared: 'bg-solar-500',
  prep: 'bg-stone-400',
}

const label: Record<string, string> = {
  active: 'Active cultivation',
  prepared: 'Fully prepared',
  prep: 'Under preparation',
}

export default function Land() {
  const pct = (LAND_SUMMARY.reclaimedHa / LAND_SUMMARY.targetHa) * 100
  return (
    <div>
      <PageHeader
        kicker="Targets · land"
        title="Land allocation & GIS status"
        description="10,000 ha desert target, split into 500 independent 20 ha / 1.2 MW agricultural units."
        icon={<Map size={22} />}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">Targeted area</div>
          <div className="text-2xl font-black">{num(LAND_SUMMARY.targetHa)} ha</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">Reclaimed</div>
          <div className="text-2xl font-black">{num(LAND_SUMMARY.reclaimedHa)} ha</div>
          <Progress value={pct} className="mt-2" />
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">Units</div>
          <div className="text-2xl font-black">
            {LAND_SUMMARY.unitsActive}/{LAND_SUMMARY.unitsTotal}
          </div>
          <div className="text-xs text-emerald-800/50">active / planned</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">Capacity / unit</div>
          <div className="text-2xl font-black">{LAND_SUMMARY.mwPerUnit} MW</div>
        </Card>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-emerald-900/8 px-5 py-3">
          <div className="font-bold text-emerald-950">Parcel map (sample units)</div>
          {Object.entries(label).map(([k, v]) => (
            <Badge key={k} tone={k === 'active' ? 'leaf' : k === 'prepared' ? 'solar' : 'slate'}>
              <span className={cx('size-2 rounded-full', color[k])} /> {v}
            </Badge>
          ))}
        </div>
        <div className="relative h-[440px] desert-grid bg-gradient-to-br from-amber-100/80 to-leaf-50">
          {LAND_UNITS.map((u) => (
            <div
              key={u.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${u.x}%`, top: `${u.y}%` }}
            >
              <div className="group">
                <div
                  className={cx(
                    'grid size-9 place-items-center rounded-lg text-[10px] font-bold text-white shadow-md',
                    color[u.status],
                  )}
                >
                  {u.id.slice(2)}
                </div>
                <div className="pointer-events-none absolute left-10 top-0 hidden w-40 rounded-lg bg-ink-950 p-2 text-[11px] text-white group-hover:block">
                  <div className="font-bold">{u.id}</div>
                  <div>{label[u.status]}</div>
                  <div className="text-white/60">
                    {u.ha} ha · {u.mw} MW
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
