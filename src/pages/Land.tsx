import { useMemo, useState } from 'react'
import { Map } from 'lucide-react'
import { Badge, Button, Card, PageHeader, Progress } from '../components/ui'
import KsaMap from '../components/KsaMap'
import { LAND_SUMMARY, PARTIES, type LandStatus } from '../data/namaa'
import { useLands } from '../lands'
import { useI18n } from '../i18n'
import { cx, num } from '../lib/format'

const color: Record<LandStatus, string> = {
  active: '#22c55e',
  prepared: '#f59e0b',
  prep: '#a8a29e',
}

const FILTERS: { id: LandStatus; label: string; tone: 'leaf' | 'solar' | 'slate' }[] = [
  { id: 'active', label: 'Active cultivation', tone: 'leaf' },
  { id: 'prepared', label: 'Fully prepared', tone: 'solar' },
  { id: 'prep', label: 'Under preparation', tone: 'slate' },
]

const label: Record<LandStatus, string> = {
  active: 'Active cultivation',
  prepared: 'Fully prepared',
  prep: 'Under preparation',
}

export default function Land() {
  const { t } = useI18n()
  const { units, setOffer, interestFor, decide } = useLands()
  const [statuses, setStatuses] = useState<LandStatus[]>(['active', 'prepared', 'prep'])
  const pct = (LAND_SUMMARY.reclaimedHa / LAND_SUMMARY.targetHa) * 100
  const opened = units.filter((u) => u.offer === 'sale' || u.offer === 'exploit').length
  const counts = useMemo(() => {
    const c: Record<LandStatus, number> = { active: 0, prepared: 0, prep: 0 }
    for (const unit of units) c[unit.status] += 1
    return c
  }, [units])
  const visible = useMemo(
    () => units.filter((unit) => statuses.includes(unit.status)),
    [units, statuses],
  )

  function toggle(status: LandStatus) {
    setStatuses((current) =>
      current.includes(status) ? current.filter((item) => item !== status) : [...current, status],
    )
  }
  return (
    <div>
      <PageHeader
        kicker={t('Targets · land')}
        title={t('Land allocation & GIS status')}
        description={t(
          '10,000 ha desert target. Private proprietors decide their own parcels. You set the offer and accept or refuse requests only on public land.',
        )}
        icon={<Map size={22} />}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-4">
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Targeted area')}</div>
          <div className="text-2xl font-black">{num(LAND_SUMMARY.targetHa)} ha</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Reclaimed')}</div>
          <div className="text-2xl font-black">{num(LAND_SUMMARY.reclaimedHa)} ha</div>
          <Progress value={pct} className="mt-2" />
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Units')}</div>
          <div className="text-2xl font-black">
            {LAND_SUMMARY.unitsActive}/{LAND_SUMMARY.unitsTotal}
          </div>
          <div className="text-xs text-emerald-800/50">{t('active / planned')}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Offered')}</div>
          <div className="text-2xl font-black">
            {opened}/{units.length}
          </div>
          <div className="text-xs text-emerald-800/50">{t('for sale or exploitation')}</div>
        </Card>
      </div>

      <Card className="mb-4 p-4">
        <h2 className="font-bold text-emerald-950">{t('Investor requests')}</h2>
        <p className="mt-1 text-sm text-emerald-900/60">
          {t('Accept or refuse requests on public land only. Private proprietors decide their own parcels.')}
        </p>
        {units.filter((u) => u.ownerId === 'state').every((u) => interestFor(u.id).length === 0) ? (
          <p className="mt-3 text-sm text-emerald-900/60">{t('No requests yet.')}</p>
        ) : (
          <ul className="mt-3 space-y-2">
            {units.filter((u) => u.ownerId === 'state').flatMap((u) =>
              interestFor(u.id).map((ask) => (
                <li
                  key={`${u.id}-${ask.investorId}`}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-leaf-50 px-3 py-2 text-sm"
                >
                  <div>
                    <span className="font-semibold text-emerald-950">{t(ask.investorName)}</span>
                    <span className="text-emerald-900/70">
                      {' '}
                      {t(ask.kind === 'buy' ? 'wants to buy' : 'wants to exploit')} {u.id} · {t(u.region)}
                    </span>
                    <div className="text-xs text-emerald-800/50">{t(PARTIES[u.ownerId])}</div>
                  </div>
                  {ask.status === 'pending' ? (
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => decide(u.id, ask.investorId, 'accepted')}>
                        {t('Accept')}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => decide(u.id, ask.investorId, 'refused')}>
                        {t('Refuse')}
                      </Button>
                    </div>
                  ) : (
                    <Badge tone={ask.status === 'accepted' ? 'leaf' : 'rose'}>
                      {t(ask.status === 'accepted' ? 'Accepted' : 'Refused')}
                    </Badge>
                  )}
                </li>
              )),
            )}
          </ul>
        )}
      </Card>

      <Card className="overflow-hidden">
        <div className="flex flex-wrap items-center gap-2 border-b border-emerald-900/8 px-5 py-3">
          <div>
            <div className="font-bold text-emerald-950">{t('Parcel map (sample units)')}</div>
            <div className="text-[11px] text-emerald-800/50">{t('Kingdom of Saudi Arabia')}</div>
          </div>
          {FILTERS.map((filter) => {
            const on = statuses.includes(filter.id)
            return (
              <button
                key={filter.id}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(filter.id)}
                className={cx('rounded-full transition', on ? '' : 'opacity-40')}
              >
                <Badge tone={filter.tone}>
                  <span className="size-2 rounded-full" style={{ background: color[filter.id] }} />{' '}
                  {counts[filter.id]} {t(filter.label)}
                </Badge>
              </button>
            )
          })}
        </div>
        <KsaMap
          markers={visible.map((u) => ({
            id: u.id,
            lat: u.lat,
            lng: u.lng,
            color: u.offer === 'sale' ? '#d97706' : u.offer === 'exploit' ? '#16a34a' : color[u.status],
            popup: `<strong>${u.id}</strong><br/>${t(u.region)}<br/>${t(PARTIES[u.ownerId])}<br/>${t(
              u.offer === 'sale' ? 'For sale' : u.offer === 'exploit' ? 'Open for exploitation' : 'Kept private',
            )}`,
          }))}
        />
      </Card>

      <Card className="mt-4 overflow-hidden">
        <div className="border-b border-emerald-900/8 px-5 py-3">
          <div className="font-bold text-emerald-950">{t('Proprietor offer')}</div>
          <div className="text-[11px] text-emerald-800/50">
            {t('Private owners choose sale or exploitation. You can change only public land.')}
          </div>
        </div>
        <div className="divide-y divide-emerald-900/8">
          {visible.length === 0 && (
            <p className="px-5 py-6 text-sm text-emerald-900/60">
              {t('No parcels with this cultivation status.')}
            </p>
          )}
          {visible.map((u) => {
            const asks = interestFor(u.id)
            return (
              <div
                key={u.id}
                className="flex flex-wrap items-center justify-between gap-3 px-5 py-3"
              >
                <div>
                  <div className="font-semibold text-emerald-950">
                    {u.id} · {t(u.region)}
                  </div>
                  <div className="text-xs text-emerald-800/60">
                    {t(PARTIES[u.ownerId])} · {t(u.crop)} · {t(label[u.status])}
                    {asks.length > 0
                      ? ` · ${t('interest')}: ${asks.map((a) => t(a.investorName)).join(', ')}`
                      : ''}
                  </div>
                </div>
                {u.ownerId === 'state' ? (
                  <div className="flex flex-wrap gap-2">
                    {(
                      [
                        ['private', 'Keep private'],
                        ['sale', 'Sell'],
                        ['exploit', 'Open for exploitation'],
                      ] as const
                    ).map(([offer, name]) => (
                      <Button
                        key={offer}
                        size="sm"
                        variant={u.offer === offer ? 'primary' : 'outline'}
                        onClick={() => setOffer(u.id, offer)}
                      >
                        {t(name)}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <span className="rounded-full bg-leaf-50 px-3 py-1.5 text-xs font-semibold text-emerald-900">
                    {t(u.offer === 'sale' ? 'For sale' : u.offer === 'exploit' ? 'Open for exploitation' : 'Kept private')}
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
