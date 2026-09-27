import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

/** Full Kingdom of Saudi Arabia (mainland + east). */
export const KSA_BOUNDS = L.latLngBounds(
  [16.0, 34.4],
  [32.3, 55.7],
)

export type MapMarker = {
  id: string
  lat: number
  lng: number
  color: string
  popup: string
  label?: string
}

export default function KsaMap({
  markers,
  heightClass = 'h-[440px]',
}: {
  markers: MapMarker[]
  heightClass?: string
}) {
  const host = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = host.current
    if (!el) return

    const map = L.map(el, {
      scrollWheelZoom: false,
      zoomControl: true,
      maxBounds: KSA_BOUNDS.pad(0.15),
      maxBoundsViscosity: 0.7,
      minZoom: 5,
    }).fitBounds(KSA_BOUNDS, { padding: [16, 16] })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '&copy; OpenStreetMap',
    }).addTo(map)

    for (const m of markers) {
      const marker = L.circleMarker([m.lat, m.lng], {
        radius: m.label ? 11 : 8,
        color: '#fff',
        weight: 2,
        fillColor: m.color,
        fillOpacity: 1,
      }).bindPopup(m.popup)

      if (m.label) {
        marker.bindTooltip(m.label, {
          permanent: true,
          direction: 'center',
          className: 'ksa-map-label',
        })
      }
      marker.addTo(map)
    }

    const onResize = () => map.invalidateSize()
    const t = window.setTimeout(onResize, 80)
    window.addEventListener('resize', onResize)

    return () => {
      window.clearTimeout(t)
      window.removeEventListener('resize', onResize)
      map.remove()
    }
  }, [markers])

  return <div ref={host} className={`${heightClass} w-full bg-stone-100`} />
}
