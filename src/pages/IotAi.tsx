import { useMemo, useState } from 'react'
import { Radio } from 'lucide-react'
import { Badge, Card, PageHeader, Progress } from '../components/ui'
import KsaMap from '../components/KsaMap'
import { AI_RECS, SENSORS } from '../data/namaa'
import { useI18n } from '../i18n'
import { cx } from '../lib/format'

type SensorStatus = 'online' | 'degraded' | 'offline'

const statusColor: Record<SensorStatus, string> = {
  online: '#22c55e',
  degraded: '#f59e0b',
  offline: '#f43f5e',
}

const FILTERS: { id: SensorStatus; label: string; tone: 'leaf' | 'solar' | 'rose' }[] = [
  { id: 'online', label: 'online', tone: 'leaf' },
  { id: 'degraded', label: 'degraded', tone: 'solar' },
  { id: 'offline', label: 'offline', tone: 'rose' },
]

export default function IotAi() {
  const { t } = useI18n()
  const [active, setActive] = useState<SensorStatus[]>(['online', 'degraded', 'offline'])
  const counts = useMemo(() => {
    const c = { online: 0, degraded: 0, offline: 0 }
    for (const s of SENSORS) c[s.status] += 1
    return c
  }, [])
  const markers = useMemo(
    () =>
      SENSORS.filter((s) => active.includes(s.status)).map((s) => ({
        id: s.id,
        lat: s.lat,
        lng: s.lng,
        color: statusColor[s.status],
        popup: `<strong>${s.id}</strong><br/>${t(s.type)} · ${t(s.status)}<br/><span style="opacity:.7">${s.unit.replace(
          /Unit (\d+) · (.+)/,
          (_, n, region) => `${t('Unit')} ${n} · ${t(region)}`,
        )}</span>`,
      })),
    [active, t],
  )

  function toggle(status: SensorStatus) {
    setActive((current) =>
      current.includes(status) ? current.filter((s) => s !== status) : [...current, status],
    )
  }
  return (
    <div>
      <PageHeader
        kicker={t('IoT & AI')}
        title={t('Sensor network & recommendations')}
        description={t(
          'Field sensors plotted across the Kingdom of Saudi Arabia, plus AI irrigation and shading advice from solar tracking and weather.',
        )}
        icon={<Radio size={22} />}
      />

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="overflow-hidden lg:col-span-3">
          <div className="flex items-center justify-between border-b border-emerald-900/8 px-5 py-3">
            <div>
              <div className="font-bold text-emerald-950">{t('Site sensor map')}</div>
              <div className="text-[11px] text-emerald-800/50">
                {t('Kingdom of Saudi Arabia')}
              </div>
            </div>
            <div className="flex flex-wrap justify-end gap-2 text-xs">
              {FILTERS.map((filter) => {
                const on = active.includes(filter.id)
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(filter.id)}
                    className={cx('rounded-full transition', on ? '' : 'opacity-40')}
                  >
                    <Badge tone={filter.tone}>
                      {counts[filter.id]} {t(filter.label)}
                    </Badge>
                  </button>
                )
              })}
            </div>
          </div>
          <KsaMap heightClass="h-[420px]" markers={markers} />
        </Card>

        <div className="space-y-3 lg:col-span-2">
          {AI_RECS.map((r) => (
            <Card key={r.id} className="p-4">
              <div className="flex items-center justify-between">
                <Badge tone="leaf">{t(r.type)}</Badge>
                <span className="text-xs text-emerald-800/50">{r.confidence}% {t('conf.')}</span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-emerald-950">{t(r.title)}</h3>
              <p className="mt-1 text-xs leading-relaxed text-emerald-800/65">{t(r.detail)}</p>
              <div className="mt-3 text-xs font-medium text-leaf-700">{t(r.impact)}</div>
              <Progress value={r.confidence} className="mt-2" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
