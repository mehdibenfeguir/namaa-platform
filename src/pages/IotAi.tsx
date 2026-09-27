import { Radio } from 'lucide-react'
import { Badge, Card, PageHeader, Progress } from '../components/ui'
import { AI_RECS, SENSORS } from '../data/namaa'
import { cx } from '../lib/format'

const statusDot: Record<string, string> = {
  online: 'bg-leaf-500',
  degraded: 'bg-solar-500',
  offline: 'bg-rose-500',
}

export default function IotAi() {
  const online = SENSORS.filter((s) => s.status === 'online').length
  return (
    <div>
      <PageHeader
        kicker="IoT & AI"
        title="Sensor network & recommendations"
        description="Field sensors on an interactive site map, plus AI irrigation and shading advice from solar tracking and weather."
        icon={<Radio size={22} />}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="overflow-hidden lg:col-span-3">
          <div className="flex items-center justify-between border-b border-emerald-900/8 px-5 py-3">
            <div className="font-bold text-emerald-950">Site sensor map</div>
            <div className="flex gap-2 text-xs">
              <Badge tone="leaf">{online} online</Badge>
              <Badge tone="solar">1 degraded</Badge>
              <Badge tone="rose">1 offline</Badge>
            </div>
          </div>
          <div className="relative h-[420px] desert-grid bg-gradient-to-br from-amber-50 to-leaf-50">
            {SENSORS.map((s) => (
              <div
                key={s.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${s.x}%`, top: `${s.y}%` }}
              >
                <div className="group relative">
                  <span
                    className={cx(
                      'block size-3.5 rounded-full ring-4 ring-white shadow',
                      statusDot[s.status],
                    )}
                  />
                  <div className="pointer-events-none absolute left-5 top-0 z-10 hidden w-40 rounded-lg bg-ink-950 p-2 text-[11px] text-white shadow-lg group-hover:block">
                    <div className="font-bold">{s.id}</div>
                    <div className="text-leaf-300">{s.type}</div>
                    <div className="text-white/60">{s.unit}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
