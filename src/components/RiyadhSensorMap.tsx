import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Sensor } from '../data/namaa'

const FILL: Record<Sensor['status'], string> = {
  online: '#22c55e',
  degraded: '#f59e0b',
  offline: '#f43f5e',
}

export default function RiyadhSensorMap({ sensors }: { sensors: Sensor[] }) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true,
    }).setView([24.7136, 46.6753], 11)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    const bounds = L.latLngBounds([])
    for (const s of sensors) {
      const marker = L.circleMarker([s.lat, s.lng], {
        radius: 8,
        color: '#fff',
        weight: 2,
        fillColor: FILL[s.status],
        fillOpacity: 1,
      })
        .bindPopup(
          `<strong>${s.id}</strong><br/>${s.type}<br/><span style="opacity:.7">${s.unit}</span>`,
        )
        .addTo(map)
      bounds.extend(marker.getLatLng())
    }
    if (sensors.length) map.fitBounds(bounds.pad(0.18))

    const onResize = () => map.invalidateSize()
    const t = window.setTimeout(onResize, 80)
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', onResize)
      map.remove()
    }
  }, [sensors])

  return <div ref={host} className="h-[420px] w-full bg-stone-100" />
}
