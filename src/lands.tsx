import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { LAND_UNITS, type LandUnit } from './data/namaa'

const KEY = 'namaa-land-access'

export type Offer = 'private' | 'sale' | 'exploit'
export type DealKind = 'buy' | 'exploit'

export type Decision = 'pending' | 'accepted' | 'refused'

export type Interest = {
  unitId: string
  investorId: string
  investorName: string
  kind: DealKind
  status: Decision
}

type Store = {
  offer: Record<string, Offer>
  interest: Interest[]
}

type LandsValue = {
  units: LandUnit[]
  setOffer: (id: string, offer: Offer) => void
  expressInterest: (
    unitId: string,
    investorId: string,
    investorName: string,
    kind: DealKind,
  ) => void
  withdraw: (unitId: string, investorId: string) => void
  decide: (unitId: string, investorId: string, status: 'accepted' | 'refused') => void
  interestFor: (unitId: string) => Interest[]
  mine: (investorId: string) => Interest[]
}

const LandsContext = createContext<LandsValue | null>(null)

function defaultOffer(unit: LandUnit): Offer {
  if (unit.id === 'U-012') return 'sale'
  return unit.openToInvestors ? 'exploit' : 'private'
}

function seed(): Store {
  return {
    offer: Object.fromEntries(LAND_UNITS.map((u) => [u.id, defaultOffer(u)])),
    interest: [
      {
        unitId: 'U-033',
        investorId: 'gulf',
        investorName: 'Gulf Green Capital',
        kind: 'exploit',
        status: 'pending',
      },
    ],
  }
}

function read(): Store {
  const base = seed()
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return base
    const parsed = JSON.parse(raw) as Partial<Store> & { open?: Record<string, boolean> }
    const offer = { ...base.offer }
    if (parsed.offer) Object.assign(offer, parsed.offer)
    else if (parsed.open) {
      for (const [id, open] of Object.entries(parsed.open)) {
        offer[id] = open ? 'exploit' : 'private'
      }
    }
    const interest = Array.isArray(parsed.interest)
      ? parsed.interest.map((item) => ({
          ...item,
          kind: item.kind ?? 'exploit',
          status: item.status ?? 'pending',
        }))
      : base.interest
    return { offer, interest }
  } catch {
    return base
  }
}

export function LandsProvider({ children }: { children: ReactNode }) {
  const [store, setStore] = useState<Store>(() => read())

  const value = useMemo<LandsValue>(() => {
    const persist = (next: Store) => {
      localStorage.setItem(KEY, JSON.stringify(next))
      setStore(next)
    }
    const units = LAND_UNITS.map((u) => {
      const offer = store.offer[u.id] ?? defaultOffer(u)
      return { ...u, offer, openToInvestors: offer === 'exploit' }
    })
    return {
      units,
      setOffer(id, offer) {
        persist({ ...store, offer: { ...store.offer, [id]: offer } })
      },
      expressInterest(unitId, investorId, investorName, kind) {
        const unit = units.find((u) => u.id === unitId)
        if (!unit) return
        if (kind === 'buy' && unit.offer !== 'sale') return
        if (kind === 'exploit' && unit.offer !== 'exploit') return
        const existing = store.interest.find(
          (i) => i.unitId === unitId && i.investorId === investorId,
        )
        if (existing && existing.status !== 'refused') return
        const next = { unitId, investorId, investorName, kind, status: 'pending' as const }
        persist({
          ...store,
          interest: existing
            ? store.interest.map((i) =>
                i.unitId === unitId && i.investorId === investorId ? next : i,
              )
            : [...store.interest, next],
        })
      },
      withdraw(unitId, investorId) {
        persist({
          ...store,
          interest: store.interest.filter(
            (i) => !(i.unitId === unitId && i.investorId === investorId),
          ),
        })
      },
      decide(unitId, investorId, status) {
        persist({
          ...store,
          interest: store.interest.map((i) =>
            i.unitId === unitId && i.investorId === investorId ? { ...i, status } : i,
          ),
        })
      },
      interestFor(unitId) {
        return store.interest.filter((i) => i.unitId === unitId)
      },
      mine(investorId) {
        return store.interest.filter((i) => i.investorId === investorId)
      },
    }
  }, [store])

  return <LandsContext.Provider value={value}>{children}</LandsContext.Provider>
}

export function useLands() {
  const ctx = useContext(LandsContext)
  if (!ctx) throw new Error('useLands outside LandsProvider')
  return ctx
}
