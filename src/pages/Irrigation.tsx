import { useState } from 'react'
import { Droplets } from 'lucide-react'
import { Badge, Button, Card, PageHeader, Progress } from '../components/ui'
import { IRRIGATION_ZONES } from '../data/namaa'

const tones: Record<string, 'leaf' | 'solar' | 'water'> = {
  running: 'leaf',
  scheduled: 'water',
  paused: 'solar',
}

export default function Irrigation() {
  const [zones, setZones] = useState(IRRIGATION_ZONES)

  return (
    <div>
      <PageHeader
        kicker="CEA · Water"
        title="Automated sub-surface drip"
        description="Schedule and control drip lines to cut evaporation. Conservation target: 35–40% versus flood / surface irrigation."
        icon={<Droplets size={22} />}
      />

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">Fleet water save</div>
          <div className="text-2xl font-black text-emerald-950">37.4%</div>
          <div className="text-xs text-emerald-800/55">Inside the 35–40% band</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">Active duty</div>
          <div className="text-2xl font-black text-emerald-950">2 zones</div>
          <div className="text-xs text-emerald-800/55">Night-shift preferred</div>
        </Card>
        <Card className="p-4">
          <div className="text-xs uppercase text-emerald-800/50">Today’s volume</div>
          <div className="text-2xl font-black text-emerald-950">18,420 m³</div>
          <div className="text-xs text-emerald-800/55">−11,020 m³ vs baseline</div>
        </Card>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {zones.map((z) => (
          <Card key={z.id} className="p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-bold text-emerald-800/45">{z.id}</div>
                <h3 className="font-bold text-emerald-950">{z.name}</h3>
              </div>
              <Badge tone={tones[z.status]}>{z.status}</Badge>
            </div>
            <div className="mt-4 text-xs text-emerald-800/55">Duty cycle</div>
            <Progress value={z.duty} tone="water" className="mt-1" />
            <div className="mt-3 flex justify-between text-sm">
              <span className="text-emerald-800/60">Water saved</span>
              <span className="font-semibold">{z.saved}%</span>
            </div>
            <div className="mt-1 flex justify-between text-sm">
              <span className="text-emerald-800/60">Next window</span>
              <span className="font-semibold">{z.next}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <Button
                size="sm"
                onClick={() =>
                  setZones((all) =>
                    all.map((x) =>
                      x.id === z.id
                        ? { ...x, status: 'running', duty: x.duty || 50 }
                        : x,
                    ),
                  )
                }
              >
                Run
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  setZones((all) =>
                    all.map((x) =>
                      x.id === z.id ? { ...x, status: 'paused', duty: 0 } : x,
                    ),
                  )
                }
              >
                Pause
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
