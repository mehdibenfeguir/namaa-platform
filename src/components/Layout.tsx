import { useState, type ComponentType } from 'react'
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Radio,
  Droplets,
  Sprout,
  Sun,
  Wallet,
  FileBarChart,
  Map,
  Gauge,
  Target,
  Menu,
  X,
  Bell,
  Leaf,
  Sparkles,
} from 'lucide-react'
import { BRAND, NAV } from '../data/namaa'
import { cx } from '../lib/format'

const ICONS: Record<string, ComponentType<{ size?: number }>> = {
  dashboard: LayoutDashboard,
  iot: Radio,
  irrigation: Droplets,
  cea: Sprout,
  energy: Sun,
  cost: Wallet,
  reports: FileBarChart,
  land: Map,
  ratios: Gauge,
  goals: Target,
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-5 py-5">
        <div className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-leaf-500 to-leaf-800 text-white shadow-lg shadow-leaf-800/30">
          <Leaf size={20} />
        </div>
        <div className="leading-tight">
          <div className="text-lg font-black tracking-tight text-white">
            {BRAND.nameAr} {BRAND.name}
          </div>
          <div className="text-[10px] font-medium uppercase tracking-widest text-leaf-300">
            {BRAND.tagline}
          </div>
        </div>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
        {NAV.map((group) => (
          <div key={group.id}>
            <div className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-200/50">
              {group.title}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const Icon = ICONS[item.icon] ?? LayoutDashboard
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={onNavigate}
                    className={({ isActive }) =>
                      cx(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors',
                        isActive
                          ? 'bg-white/10 font-semibold text-white'
                          : 'text-emerald-100/75 hover:bg-white/5 hover:text-white',
                      )
                    }
                  >
                    <Icon size={17} />
                    <span className="truncate">{item.name}</span>
                  </NavLink>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="mx-3 mb-4 rounded-2xl bg-gradient-to-br from-solar-500/90 to-leaf-700 p-4 text-emerald-950">
        <div className="text-xs font-bold uppercase tracking-wide text-emerald-950/70">
          Prepared by
        </div>
        <div className="mt-1 text-sm font-bold">{BRAND.preparedBy}</div>
        <div className="text-xs text-emerald-950/70">{BRAND.preparedByAr}</div>
        <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-950/90">
          <Sparkles size={14} /> Vision 2030 Ready
        </div>
      </div>
    </div>
  )
}

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const current =
    NAV.flatMap((g) => g.items).find((i) => i.path === location.pathname)?.name ??
    'NAMAA'

  return (
    <div className="min-h-full lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="sticky top-0 hidden h-screen bg-ink-950 lg:block">
        <Sidebar />
      </aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-emerald-950/50" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 bg-ink-950">
            <button
              className="absolute right-3 top-4 text-emerald-200"
              onClick={() => setOpen(false)}
            >
              <X size={20} />
            </button>
            <Sidebar onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-emerald-900/10 glass px-4 py-3 lg:px-8">
          <button
            className="grid size-9 place-items-center rounded-lg text-emerald-800 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="hidden text-sm text-emerald-900/50 sm:block">
            <span className="font-medium">NAMAA</span>
            <span className="mx-2">/</span>
            <span className="font-semibold text-emerald-950">{current}</span>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <button className="relative grid size-9 place-items-center rounded-lg text-emerald-800 hover:bg-leaf-50">
              <Bell size={18} />
              <span className="absolute right-1.5 top-1.5 size-2 rounded-full bg-solar-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2 rounded-full border border-emerald-900/10 bg-white/80 py-1 pl-1 pr-3">
              <div className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-leaf-500 to-leaf-800 text-[10px] font-bold text-white">
                FB
              </div>
              <div className="hidden sm:block">
                <div className="text-xs font-semibold leading-none text-emerald-950">
                  F. Ben Feguir
                </div>
                <div className="text-[10px] text-emerald-800/50">Project lead</div>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
