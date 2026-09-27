import { Sprout } from 'lucide-react'
import { Card, PageHeader, Progress } from '../components/ui'
import { CEA_MODULES } from '../data/namaa'
import { num } from '../lib/format'

export default function Cea() {
  return (
    <div>
      <PageHeader
        kicker="Controlled environment"
        title="Vertical farming management"
        description="Nutrient and climate telemetry for high-value organic crops in CEA modules."
        icon={<Sprout size={22} />}
      />
      <div className="grid gap-4 md:grid-cols-2">
        {CEA_MODULES.map((m) => (
          <Card key={m.id} className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-800/45">{m.id}</div>
                <h3 className="text-lg font-bold text-emerald-950">{m.crop}</h3>
              </div>
              <div className="text-right">
                <div className="text-xl font-black text-leaf-700">{num(m.yieldKg)}</div>
                <div className="text-[11px] text-emerald-800/50">kg YTD</div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2 text-center">
              {[
                ['EC', m.ec, 2.2],
                ['pH', m.ph, 7],
                ['°C', m.temp, 28],
                ['RH%', m.rh, 100],
              ].map(([k, v, max]) => (
                <div key={String(k)} className="rounded-xl bg-leaf-50 p-2">
                  <div className="text-[10px] uppercase text-emerald-800/50">{k}</div>
                  <div className="font-bold text-emerald-950">{v}</div>
                  <Progress value={(Number(v) / Number(max)) * 100} className="mt-1" />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
