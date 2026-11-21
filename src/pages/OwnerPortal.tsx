import { Map, Tags } from 'lucide-react'
import { Badge, Button, Card, PageHeader } from '../components/ui'
import KsaMap from '../components/KsaMap'
import { PARTIES } from '../data/namaa'
import { useAuth } from '../auth'
import { useLands, type Interest, type Offer } from '../lands'
import { useI18n } from '../i18n'
import { num } from '../lib/format'

const statusLabel = {
  active: 'Active cultivation',
  prepared: 'Fully prepared',
  prep: 'Under preparation',
} as const

const offerLabel: Record<Offer, string> = {
  private: 'Kept private',
  sale: 'For sale',
  exploit: 'Open for exploitation',
}

const offers = [
  ['private', 'Keep private'],
  ['sale', 'Sell'],
  ['exploit', 'Open for exploitation'],
] as const

function OfferSwitch({
  value,
  onChange,
}: {
  value: Offer
  onChange: (offer: Offer) => void
}) {
  const { t } = useI18n()
  return (
    <div className="flex flex-wrap gap-2">
      {offers.map(([offer, label]) => (
        <Button
          key={offer}
          size="sm"
          variant={value === offer ? 'primary' : 'outline'}
          onClick={() => onChange(offer)}
        >
          {t(label)}
        </Button>
      ))}
    </div>
  )
}

function Requests({
  rows,
  onDecide,
}: {
  rows: { unitId: string; region: string; interest: Interest }[]
  onDecide: (unitId: string, investorId: string, status: 'accepted' | 'refused') => void
}) {
  const { t } = useI18n()
  const buys = rows.filter((row) => row.interest.kind === 'buy')
  const exploits = rows.filter((row) => row.interest.kind === 'exploit')

  return (
    <Card className="mb-4 p-4">
      <h2 className="font-bold text-emerald-950">{t('Requests on your land')}</h2>
      {rows.length === 0 ? (
        <p className="mt-2 text-sm text-emerald-900/60">{t('No requests yet.')}</p>
      ) : (
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <div>
            <div className="text-xs font-semibold uppercase text-emerald-800/50">{t('Buy requests')}</div>
            {buys.length === 0 ? (
              <p className="mt-2 text-sm text-emerald-900/60">{t('No requests yet.')}</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {buys.map((row) => (
                  <li key={`${row.unitId}-buy-${row.interest.investorId}`} className="rounded-xl bg-amber-50 px-3 py-2 text-sm">
                    <div>
                      <span className="font-semibold text-emerald-950">{t(row.interest.investorName)}</span>
                      <span className="text-emerald-900/70">
                        {' '}
                        {t('wants to buy')} {row.unitId} · {t(row.region)}
                      </span>
                    </div>
                    <Decision
                      status={row.interest.status}
                      onAccept={() => onDecide(row.unitId, row.interest.investorId, 'accepted')}
                      onRefuse={() => onDecide(row.unitId, row.interest.investorId, 'refused')}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <div className="text-xs font-semibold uppercase text-emerald-800/50">{t('Exploitation requests')}</div>
            {exploits.length === 0 ? (
              <p className="mt-2 text-sm text-emerald-900/60">{t('No requests yet.')}</p>
            ) : (
              <ul className="mt-2 space-y-2">
                {exploits.map((row) => (
                  <li key={`${row.unitId}-exploit-${row.interest.investorId}`} className="rounded-xl bg-leaf-50 px-3 py-2 text-sm">
                    <div>
                      <span className="font-semibold text-emerald-950">{t(row.interest.investorName)}</span>
                      <span className="text-emerald-900/70">
                        {' '}
                        {t('wants to exploit')} {row.unitId} · {t(row.region)}
                      </span>
                    </div>
                    <Decision
                      status={row.interest.status}
                      onAccept={() => onDecide(row.unitId, row.interest.investorId, 'accepted')}
                      onRefuse={() => onDecide(row.unitId, row.interest.investorId, 'refused')}
                    />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Card>
  )
}

function Decision({
  status,
  onAccept,
  onRefuse,
}: {
  status: Interest['status']
  onAccept: () => void
  onRefuse: () => void
}) {
  const { t } = useI18n()
  if (status === 'accepted') {
    return <Badge tone="leaf" className="mt-2">{t('Accepted')}</Badge>
  }
  if (status === 'refused') {
    return <Badge tone="rose" className="mt-2">{t('Refused')}</Badge>
  }
  return (
    <div className="mt-2 flex gap-2">
      <Button size="sm" onClick={onAccept}>{t('Accept')}</Button>
      <Button size="sm" variant="outline" onClick={onRefuse}>{t('Refuse')}</Button>
    </div>
  )
}

export function OwnerHoldings() {
  const { t } = useI18n()
  const { user } = useAuth()
  const { units, interestFor, setOffer, decide } = useLands()
  const mine = units.filter((u) => u.ownerId === user?.partyId)
  const ha = mine.reduce((s, u) => s + u.ha, 0)
  const listed = mine.filter((u) => u.offer !== 'private')
  const requests = mine.flatMap((u) =>
    interestFor(u.id).map((interest) => ({ unitId: u.id, region: u.region, interest })),
  )

  return (
    <div>
      <PageHeader
        kicker={t('Land proprietor')}
        title={t(user?.name ?? 'Holdings')}
        description={t(
          'Only parcels registered to your estate. You choose whether each one stays private, is offered for sale, or is opened for exploitation.',
        )}
        icon={<Map size={22} />}
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Parcels')}</div>
          <div className="text-2xl font-black">{mine.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Area')}</div>
          <div className="text-2xl font-black">{num(ha)} ha</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Offered')}</div>
          <div className="text-2xl font-black">
            {listed.length}/{mine.length}
          </div>
        </Card>
      </div>
      <Requests rows={requests} onDecide={decide} />
      <Card className="mb-4 overflow-hidden">
        <KsaMap
          markers={mine.map((u) => ({
            id: u.id,
            lat: u.lat,
            lng: u.lng,
            color: u.offer === 'sale' ? '#d97706' : u.offer === 'exploit' ? '#16a34a' : '#a8a29e',
            popup: `<strong>${u.id}</strong><br/>${t(u.region)} · ${t(u.crop)}<br/>${t(offerLabel[u.offer ?? 'private'])}`,
          }))}
        />
      </Card>
      <Card className="overflow-x-auto">
        <table className="w-full text-start text-sm">
          <thead className="bg-leaf-50 text-xs uppercase text-emerald-800/60">
            <tr>
              <th className="px-4 py-3">{t('Parcel')}</th>
              <th className="px-4 py-3">{t('Crop')}</th>
              <th className="px-4 py-3">{t('Status')}</th>
              <th className="px-4 py-3">{t('Your offer')}</th>
              <th className="px-4 py-3">{t('Investor interest')}</th>
            </tr>
          </thead>
          <tbody>
            {mine.map((u) => (
              <tr key={u.id} className="border-t border-emerald-900/8">
                <td className="px-4 py-3 font-semibold">
                  {u.id}
                  <div className="text-xs font-normal text-emerald-800/50">{t(u.region)}</div>
                </td>
                <td className="px-4 py-3">{t(u.crop)}</td>
                <td className="px-4 py-3">{t(statusLabel[u.status])}</td>
                <td className="px-4 py-3">
                  <OfferSwitch value={u.offer ?? 'private'} onChange={(offer) => setOffer(u.id, offer)} />
                </td>
                <td className="px-4 py-3 text-emerald-900/70">
                  {interestFor(u.id)
                    .map(
                      (i) =>
                        `${t(i.investorName)} · ${t(i.kind === 'buy' ? 'Buy' : 'Exploit')} · ${t(i.status === 'accepted' ? 'Accepted' : i.status === 'refused' ? 'Refused' : 'Pending')}`,
                    )
                    .join(', ') || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

export function OwnerAccess() {
  const { t } = useI18n()
  const { user } = useAuth()
  const { units, setOffer, interestFor, decide } = useLands()
  const mine = units.filter((u) => u.ownerId === user?.partyId)
  const requests = mine.flatMap((u) =>
    interestFor(u.id).map((interest) => ({ unitId: u.id, region: u.region, interest })),
  )

  return (
    <div>
      <PageHeader
        kicker={t('Land proprietor')}
        title={t('Sell or open for exploitation')}
        description={t(
          'You decide for each parcel. Sell it, open it so an investor can exploit it, or keep it private. Investors only see what you offer.',
        )}
        icon={<Tags size={22} />}
      />
      <Requests rows={requests} onDecide={decide} />
      <div className="grid gap-3">
        {mine.map((u) => (
          <Card key={u.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <div className="font-bold text-emerald-950">
                {u.id} · {t(u.region)}
              </div>
              <div className="text-sm text-emerald-900/60">
                {t(PARTIES[u.ownerId])} · {t(u.crop)} · {u.ha} ha · {u.mw} MW
              </div>
            </div>
            <OfferSwitch value={u.offer ?? 'private'} onChange={(offer) => setOffer(u.id, offer)} />
          </Card>
        ))}
      </div>
    </div>
  )
}
