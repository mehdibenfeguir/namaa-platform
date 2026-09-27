import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Sun } from 'lucide-react'
import { Badge, Card, PageHeader } from '../components/ui'
import { ENERGY_HOURLY } from '../data/namaa'

export default function Energy() {
  return (
    <div>
      <PageHeader
        kicker="Agrivoltaics"
        title="PV generation & energy routing"
        description="Real-time solar output routed to irrigation pumps or battery storage."
        icon={<Sun size={22} />}
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <Badge tone="solar">Live</Badge>
          <div className="mt-2 text-2xl font-black text-emerald-950">486.2 MW</div>
          <div className="text-xs text-emerald-800/55">Fleet generation now</div>
        </Card>
        <Card className="p-4">
          <Badge tone="water">Pumps</Badge>
          <div className="mt-2 text-2xl font-black text-emerald-950">110 MW</div>
          <div className="text-xs text-emerald-800/55">Irrigation load</div>
        </Card>
        <Card className="p-4">
          <Badge tone="leaf">Storage</Badge>
          <div className="mt-2 text-2xl font-black text-emerald-950">190 MW</div>
          <div className="text-xs text-emerald-800/55">Charging batteries</div>
        </Card>
      </div>
      <Card className="p-5">
        <h2 className="mb-4 font-bold text-emerald-950">Dispatch by hour</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ENERGY_HOURLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
              <XAxis dataKey="t" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="gen" name="Generated" fill="#f59e0b" radius={4} />
              <Bar dataKey="pump" name="Pumps" fill="#06b6d4" radius={4} />
              <Bar dataKey="battery" name="Battery" fill="#16a34a" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
