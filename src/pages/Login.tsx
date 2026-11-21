import { useState, type FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Landmark, Leaf, Sprout, Building2, ChevronDown } from 'lucide-react'
import { DEMO_USERS, homeFor, type DemoUser, type Role } from '../data/namaa'
import { useAuth } from '../auth'
import { useI18n } from '../i18n'
import { Button, Card } from '../components/ui'

const ROLE_COPY: Record<Role, { title: string; body: string; icon: typeof Landmark }> = {
  government: {
    title: 'Government',
    body: 'Full operations portal. Decide which parcels external investors may exploit.',
    icon: Landmark,
  },
  owner: {
    title: 'Land proprietor',
    body: 'Your holdings only. You decide to sell a parcel or open it for exploitation.',
    icon: Sprout,
  },
  investor: {
    title: 'Investor',
    body: 'Only parcels the government has released for external exploitation.',
    icon: Building2,
  },
}

function AccountButton({ account, onPick }: { account: DemoUser; onPick: () => void }) {
  const { t } = useI18n()
  const copy = ROLE_COPY[account.role]
  const Icon = copy.icon
  return (
    <button
      type="button"
      onClick={onPick}
      className="flex w-full items-start gap-3 rounded-2xl border border-emerald-900/10 bg-white/80 p-3 text-start hover:border-leaf-600"
    >
      <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-leaf-50 text-leaf-800">
        <Icon size={16} />
      </div>
      <div>
        <div className="text-sm font-bold text-emerald-950">{t(account.name)}</div>
        <div className="text-xs text-emerald-800/60">
          {t(copy.title)} · <span dir="ltr">{account.email}</span>
        </div>
        {account.role !== 'owner' && (
          <div className="mt-1 text-xs text-emerald-900/70">{t(copy.body)}</div>
        )}
      </div>
    </button>
  )
}

export default function Login() {
  const { user, login } = useAuth()
  const { t, toggle, languageLabel } = useI18n()
  const navigate = useNavigate()
  const [email, setEmail] = useState('gov@namaa.sa')
  const [password, setPassword] = useState('namaa')
  const [error, setError] = useState<string | null>(null)
  const [ownersOpen, setOwnersOpen] = useState(false)
  const owners = DEMO_USERS.filter((account) => account.role === 'owner')
  const others = DEMO_USERS.filter((account) => account.role !== 'owner')

  if (user) return <Navigate to={homeFor(user.role)} replace />

  function submit(e: FormEvent) {
    e.preventDefault()
    const message = login(email, password)
    if (message) {
      setError(message)
      return
    }
    const match = DEMO_USERS.find((u) => u.email === email.trim().toLowerCase())
    navigate(match ? homeFor(match.role) : '/', { replace: true })
  }

  return (
    <div className="grid min-h-full lg:grid-cols-[1.1fr_0.9fr]">
      <div className="relative hidden overflow-hidden bg-ink-950 text-white lg:block">
        <div className="absolute -left-16 top-10 size-72 rounded-full bg-leaf-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 size-80 rounded-full bg-solar-500/20 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <button
            type="button"
            onClick={toggle}
            className="absolute end-8 top-8 rounded-full border border-white/20 px-3 py-1 text-xs font-semibold"
          >
            {languageLabel}
          </button>
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-leaf-500 to-leaf-800">
              <Leaf size={22} />
            </div>
            <div>
              <div className="text-xl font-black">نماء NAMAA</div>
              <div className="text-xs uppercase tracking-widest text-leaf-300">
                {t('Smart agrivoltaics')}
              </div>
            </div>
          </div>
          <div>
            <h1 className="max-w-md text-3xl font-black leading-tight">
              {t('Namaa : Toward Sustainable Investment of Underutilized Lands in the Kingdom.')}
            </h1>
            <p className="mt-4 max-w-md text-sm text-emerald-100/70">
              {t(
                'A digital platform that seamlessly and transparently connects underutilized lands with reclamation, rehabilitation, and investment opportunities.',
              )}
            </p>
          </div>
          <div className="text-xs text-emerald-100/40">{t('Vision 2030 · demo roles')}</div>
        </div>
      </div>

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="mb-6 flex items-start justify-between gap-3 lg:hidden">
            <div>
              <div className="text-2xl font-black text-emerald-950">نماء NAMAA</div>
              <p className="text-sm text-emerald-900/60">{t('Sign in with a portal role.')}</p>
            </div>
            <button
              type="button"
              onClick={toggle}
              className="rounded-full border border-emerald-900/15 px-3 py-1 text-xs font-semibold text-emerald-950"
            >
              {languageLabel}
            </button>
          </div>
          <Card className="p-6">
            <h2 className="text-lg font-bold text-emerald-950">{t('Sign in')}</h2>
            <p className="mt-1 text-sm text-emerald-900/60">
              {t('Password for every demo account is')} <span className="font-semibold">namaa</span>.
            </p>
            <form className="mt-5 space-y-3" onSubmit={submit}>
              <label className="block text-xs font-semibold uppercase tracking-wide text-emerald-800/70">
                {t('Email')}
                <input
                  className="mt-1 w-full rounded-xl border border-emerald-900/15 bg-white px-3 py-2 text-sm font-medium text-emerald-950 outline-none focus:border-leaf-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="username"
                />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-wide text-emerald-800/70">
                {t('Password')}
                <input
                  type="password"
                  className="mt-1 w-full rounded-xl border border-emerald-900/15 bg-white px-3 py-2 text-sm font-medium text-emerald-950 outline-none focus:border-leaf-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </label>
              {error && <p className="text-sm text-rose-700">{t(error)}</p>}
              <Button type="submit" className="w-full">
                {t('Enter portal')}
              </Button>
            </form>
          </Card>

          <div className="mt-4 space-y-2">
            {others.map((account) => {
              const beforeOwners = account.role === 'government'
              return (
                <div key={account.email} className="space-y-2">
                  <AccountButton
                    account={account}
                    onPick={() => {
                      setEmail(account.email)
                      setPassword(account.password)
                      setError(null)
                    }}
                  />
                  {beforeOwners && (
                    <div>
                      <button
                        type="button"
                        onClick={() => setOwnersOpen((open) => !open)}
                        aria-expanded={ownersOpen}
                        className="flex w-full items-center gap-3 rounded-2xl border border-emerald-900/10 bg-white/80 p-3 text-start hover:border-leaf-600"
                      >
                        <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-leaf-50 text-leaf-800">
                          <Sprout size={16} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-bold text-emerald-950">{t('Land proprietors')}</div>
                          <div className="mt-1 text-xs text-emerald-900/70">{t(ROLE_COPY.owner.body)}</div>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-emerald-800 transition-transform ${ownersOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {ownersOpen && (
                        <div className="mt-2 space-y-2 ps-4">
                          {owners.map((owner) => (
                            <AccountButton
                              key={owner.email}
                              account={owner}
                              onPick={() => {
                                setEmail(owner.email)
                                setPassword(owner.password)
                                setError(null)
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
