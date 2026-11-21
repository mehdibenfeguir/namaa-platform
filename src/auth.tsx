import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { DEMO_USERS, type DemoUser, type Role } from './data/namaa'

const KEY = 'namaa-session'

type Session = Pick<DemoUser, 'email' | 'role' | 'name' | 'title' | 'initials' | 'partyId'>

type AuthValue = {
  user: Session | null
  login: (email: string, password: string) => string | null
  logout: () => void
}

const AuthContext = createContext<AuthValue | null>(null)

function read(): Session | null {
  try {
    const raw = sessionStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as Session) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Session | null>(() => read())

  const value = useMemo<AuthValue>(
    () => ({
      user,
      login(email, password) {
        const match = DEMO_USERS.find(
          (u) =>
            u.email.toLowerCase() === email.trim().toLowerCase() &&
            u.password === password,
        )
        if (!match) return 'Unknown account. Use one of the demo roles below.'
        const session: Session = {
          email: match.email,
          role: match.role,
          name: match.name,
          title: match.title,
          initials: match.initials,
          partyId: match.partyId,
        }
        sessionStorage.setItem(KEY, JSON.stringify(session))
        setUser(session)
        return null
      },
      logout() {
        sessionStorage.removeItem(KEY)
        setUser(null)
      },
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth outside AuthProvider')
  return ctx
}

export function roleLabel(role: Role) {
  if (role === 'government') return 'Government'
  if (role === 'owner') return 'Land proprietor'
  return 'Investor'
}
