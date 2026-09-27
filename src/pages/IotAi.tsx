import { Radio } from 'lucide-react'
import { Badge, Card, PageHeader, Progress } from '../components/ui'
import KsaMap from '../components/KsaMap'
import { AI_RECS, SENSORS } from '../data/namaa'

const statusColor = {
  online: '#22c55e',
  degraded: '#f59e0b',
  offline: '#f43f5e',
}

export default function IotAi() {
  const online = SENSORS.filter((s) => s.status === 'online').length
  return (
    <div>
      <PageHeader
        kicker="IoT & AI"
        title="Sensor network & recommendations"
        description="Field sensors plotted across the Kingdom of Saudi Arabia, plus AI irrigation and shading advice from solar tracking and weather."
        icon={<Radio size={22} />}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="overflow-hidden lg:col-span-3">
          <div className="flex items-center justify-between border-b border-emerald-900/8 px-5 py-3">
            <div>
              <div className="font-bold text-emerald-950">Site sensor map</div>
              <div className="text-[11px] text-emerald-800/50">
                Kingdom of Saudi Arabia
              </div>
            </div>
            <div className="flex gap-2 text-xs">
              <Badge tone="leaf">{online} online</Badge>
              <Badge tone="solar">1 degraded</Badge>
              <Badge tone="rose">1 offline</Badge>
            </div>
          </div>
          <KsaMap
            heightClass="h-[420px]"
            markers={SENSORS.map((s) => ({
              id: s.id,
              lat: s.lat,
              lng: s.lng,
              color: statusColor[s.status],
              popup: `<strong>${s.id}</strong><br/>${s.type}<br/><span style="opacity:.7">${s.unit}</span>`,
            }))}
          />
        </Card>

        <div className="space-y-3 lg:col-span-2">
          {AI_RECS.map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex items-center justify-between">
                <Badge tone="leaf">{r.type}</Badge>
                <span className="text-xs text-emerald-800/50">{r.confidence}% conf.</span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-emerald-950">{r.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-emerald-800/65">{r.detail}</p>
              <div className="mt-3 text-xs font-medium text-leaf-700">{r.impact}</div>
              <Progress value={r.confidence} className="mt-2" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
