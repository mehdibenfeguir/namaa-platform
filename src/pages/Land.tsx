import { Map } from 'lucide-react'
import { Badge, Card, PageHeader, Progress } from '../components/ui'
import KsaMap from '../components/KsaMap'
import { LAND_SUMMARY, LAND_UNITS } from '../data/namaa'
import { cx, num } from '../lib/format'

const color: Record<string, string> = {
  active: '#22c55e',
  prepared: '#f59e0b',
  prep: '#a8a29e',
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
        description="10,000 ha desert target across the Kingdom, split into 500 independent 20 ha / 1.2 MW agricultural units."
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
          <div>
            <div className="font-bold text-emerald-950">Parcel map (sample units)</div>
            <div className="text-[11px] text-emerald-800/50">Kingdom of Saudi Arabia</div>
          </div>
          {Object.entries(label).map(([k, v]) => (
            <Badge key={k} tone={k === 'active' ? 'leaf' : k === 'prepared' ? 'solar' : 'slate'}>
              <span
                className={cx('size-2 rounded-full')}
                style={{ background: color[k] }}
              />{' '}
              {v}
            </Badge>
          ))}
        </div>
        <KsaMap
          markers={LAND_UNITS.map((u) => ({
            id: u.id,
            lat: u.lat,
            lng: u.lng,
            color: color[u.status],
            popup: `<strong>${u.id}</strong><br/>${u.region}<br/>${label[u.status]}<br/>${u.ha} ha · ${u.mw} MW`,
          }))}
        />
      </Card>
    </div>
  )
}
