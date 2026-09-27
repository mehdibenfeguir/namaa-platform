import { Link } from 'react-router-dom'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ArrowRight, Leaf, Sparkles } from 'lucide-react'
import { Badge, Button, Card, Sparkline } from '../components/ui'
import { BRAND, DASHBOARD_KPIS, ENERGY_HOURLY, MICROCLIMATE } from '../data/namaa'

const sparkColor: Record<string, string> = {
  solar: '#f59e0b',
  water: '#06b6d4',
  leaf: '#16a34a',
  sand: '#d97706',
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-900 to-leaf-800" />
        <div className="absolute -right-10 -top-16 size-72 rounded-full bg-solar-400/20 blur-3xl" />
        <div className="relative flex flex-col gap-6 p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl text-white">
            <Badge tone="solar" className="mb-4 !bg-white/10 !text-solar-400 !ring-white/15">
              <Sparkles size={12} /> {BRAND.vision}
            </Badge>
            <div className="text-sm font-medium text-leaf-300">{BRAND.projectAr}</div>
            <h1 className="mt-1 text-3xl font-black tracking-tight lg:text-4xl">
              {BRAND.nameAr} · Smart agrivoltaic command
            </h1>
            <p className="mt-3 text-sm text-emerald-100/70">
              Live energy, water, and land-equivalent performance across desert
              reclamation units — dual-use PV + agriculture for Vision 2030.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/iot">
                <Button variant="solar">
                  Open IoT map <ArrowRight size={16} />
                </Button>
              </Link>
              <Link to="/targets/land">
                <Button variant="outline" className="!border-white/25 !bg-white/10 !text-white">
                  Land allocation
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-white">
            {[
              ['10,000 ha', 'Target reclamation'],
              ['500', 'Farm units'],
              ['1.2 MW', 'Per unit PV'],
              ['1.62', 'Current LER'],
            ].map(([k, v]) => (
              <div key={v} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xl font-black">{k}</div>
                <div className="text-xs text-emerald-100/60">{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {DASHBOARD_KPIS.map((k) => (
          <Card key={k.id} className="p-4">
            <div className="text-xs font-medium uppercase tracking-wide text-emerald-800/50">
              {k.label}
            </div>
            <div className="mt-1 flex items-end justify-between">
              <div className="text-2xl font-black text-emerald-950">{k.value}</div>
              <Sparkline data={k.spark} color={sparkColor[k.tone]} />
            </div>
            <div className="mt-2 text-xs text-emerald-800/60">{k.hint}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <Card className="p-5 lg:col-span-3">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-bold text-emerald-950">PV generation vs dispatch</h2>
            <Badge tone="solar">Today · MW</Badge>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ENERGY_HOURLY}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis dataKey="t" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Area type="monotone" dataKey="gen" name="Generated" stroke="#f59e0b" fill="#fde68a" />
                <Area type="monotone" dataKey="pump" name="Pumps" stroke="#06b6d4" fill="#a5f3fc" />
                <Area type="monotone" dataKey="battery" name="Battery" stroke="#16a34a" fill="#bbf7d0" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center gap-2 font-bold text-emerald-950">
            <Leaf size={16} /> Microclimate
          </div>
          <p className="mb-4 text-xs text-emerald-800/55">
            Soil, humidity, wind and irradiance under PV vs open desert.
          </p>
          <div className="space-y-3">
            {MICROCLIMATE.map((m) => (
              <div key={m.zone} className="rounded-xl border border-emerald-900/8 bg-leaf-50/60 p-3">
                <div className="text-sm font-semibold text-emerald-950">{m.zone}</div>
                <div className="mt-2 grid grid-cols-4 gap-1 text-center text-[11px] text-emerald-800/70">
                  <div>
                    <div className="font-bold text-emerald-950">{m.soilC}°</div>
                    Soil
                  </div>
                  <div>
                    <div className="font-bold text-emerald-950">{m.humidity}%</div>
                    RH
                  </div>
                  <div>
                    <div className="font-bold text-emerald-950">{m.wind}</div>
                    m/s
                  </div>
                  <div>
                    <div className="font-bold text-emerald-950">{m.irradiance}</div>
                    W/m²
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
