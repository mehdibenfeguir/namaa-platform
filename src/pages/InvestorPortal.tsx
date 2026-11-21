import { Handshake, Unlock } from 'lucide-react'
import { Badge, Button, Card, PageHeader } from '../components/ui'
import KsaMap from '../components/KsaMap'
import { PARTIES } from '../data/namaa'
import { useAuth } from '../auth'
import { useLands } from '../lands'
import { useI18n } from '../i18n'

export function InvestorOpen() {
  const { t } = useI18n()
  const { user } = useAuth()
  const { units, expressInterest, mine } = useLands()
  const open = units.filter((u) => u.offer === 'sale' || u.offer === 'exploit')
  const asked = mine(user?.partyId ?? '')

  return (
    <div>
      <PageHeader
        kicker={t('External investor')}
        title={t('Lands for sale or exploitation')}
        description={t(
          'You only see parcels a proprietor has offered. Buy a parcel that is for sale, or ask to exploit one that is open.',
        )}
        icon={<Unlock size={22} />}
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Open parcels')}</div>
          <div className="text-2xl font-black">{open.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Capacity')}</div>
          <div className="text-2xl font-black">
            {(open.length * 1.2).toFixed(1)} MW
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">{t('Your requests')}</div>
          <div className="text-2xl font-black">{asked.length}</div>
        </Card>
      </div>
      <Card className="mb-4 overflow-hidden">
        <KsaMap
          markers={open.map((u) => ({
            id: u.id,
            lat: u.lat,
            lng: u.lng,
            color: u.offer === 'sale' ? '#d97706' : '#16a34a',
            popup: `<strong>${u.id}</strong><br/>${t(u.region)}<br/>${t(PARTIES[u.ownerId])}<br/>${t(u.offer === 'sale' ? 'For sale' : 'Open for exploitation')}`,
          }))}
        />
      </Card>
      <div className="grid gap-3">
        {open.map((u) => (
          <Card key={u.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <div className="font-bold text-emerald-950">
                {u.id} · {t(u.region)}
              </div>
              <div className="text-sm text-emerald-900/60">
                {t('Proprietor')}: {t(PARTIES[u.ownerId])} · {t(u.crop)} · {u.ha} ha · {u.mw} MW
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge tone={u.offer === 'sale' ? 'solar' : 'leaf'}>
                {t(u.offer === 'sale' ? 'For sale' : 'Open for exploitation')}
              </Badge>
              {asked.some((i) => i.unitId === u.id && i.status !== 'refused') ? (
                <Badge tone={asked.find((i) => i.unitId === u.id)?.status === 'accepted' ? 'leaf' : 'solar'}>
                  {t(
                    asked.find((i) => i.unitId === u.id)?.status === 'accepted'
                      ? 'Accepted'
                      : 'Request sent',
                  )}
                </Badge>
              ) : (
                <Button
                  size="sm"
                  onClick={() =>
                    user &&
                    expressInterest(
                      u.id,
                      user.partyId,
                      user.name,
                      u.offer === 'sale' ? 'buy' : 'exploit',
                    )
                  }
                >
                  {t(u.offer === 'sale' ? 'Buy the land' : 'Exploit the land')}
                </Button>
              )}
            </div>
          </Card>
        ))}
        {open.length === 0 && (
          <Card className="p-6 text-sm text-emerald-900/60">
            {t('No parcels are offered. Proprietors have not put land up for sale or exploitation.')}
          </Card>
        )}
      </div>
    </div>
  )
}

export function InvestorInterest() {
  const { t } = useI18n()
  const { user } = useAuth()
  const { units, mine, withdraw } = useLands()
  const rows = mine(user?.partyId ?? '')
    .map((i) => ({ interest: i, unit: units.find((u) => u.id === i.unitId) }))
    .filter((r) => r.unit)

  return (
    <div>
      <PageHeader
        kicker={t('External investor')}
        title={t('My interest')}
        description={t(
          'Buy requests and exploitation requests you have sent. If the proprietor withdraws the offer, the parcel is no longer available.',
        )}
        icon={<Handshake size={22} />}
      />
      <div className="grid gap-3">
        {rows.map(({ interest, unit }) => (
          <Card
            key={interest.unitId}
            className="flex flex-wrap items-center justify-between gap-3 p-4"
          >
            <div>
              <div className="font-bold text-emerald-950">
                {unit!.id} · {t(unit!.region)}
              </div>
              <div className="text-sm text-emerald-900/60">
                {t(PARTIES[unit!.ownerId])} · {t(unit!.crop)} · {t(interest.kind === 'buy' ? 'Buy' : 'Exploit')}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                tone={
                  interest.status === 'accepted'
                    ? 'leaf'
                    : interest.status === 'refused'
                      ? 'rose'
                      : (interest.kind === 'buy' && unit!.offer === 'sale') ||
                          (interest.kind === 'exploit' && unit!.offer === 'exploit')
                        ? 'solar'
                        : 'rose'
                }
              >
                {interest.status === 'accepted'
                  ? t('Accepted')
                  : interest.status === 'refused'
                    ? t('Refused')
                    : (interest.kind === 'buy' && unit!.offer === 'sale') ||
                        (interest.kind === 'exploit' && unit!.offer === 'exploit')
                      ? t('Still offered')
                      : t('Proprietor withdrew the offer')}
              </Badge>
              {interest.status === 'pending' && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => user && withdraw(interest.unitId, user.partyId)}
                >
                  {t('Withdraw')}
                </Button>
              )}
            </div>
          </Card>
        ))}
        {rows.length === 0 && (
          <Card className="p-6 text-sm text-emerald-900/60">
            {t('No request yet. Buy a parcel that is for sale, or exploit one that is open.')}
          </Card>
        )}
      </div>
    </div>
  )
}
