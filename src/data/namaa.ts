export const BRAND = {
  name: 'NAMAA',
  nameAr: 'نماء',
  tagline: 'Smart Agrivoltaics',
  project: 'Unprepared Land Utilization Project',
  projectAr: 'مشروع استغلال الأراضي غير المهيأة',
  preparedBy: 'Fatma Ben Feguir',
  preparedByAr: 'فاطمة بن فقير',
  vision: 'Vision 2030 · Desert Reclamation',
}

export type Role = 'government' | 'owner' | 'investor'

export type NavGroup = {
  id: string
  title: string
  items: { path: string; name: string; icon: string }[]
}

/** Existing operations portal — government only. */
export const NAV: NavGroup[] = [
  {
    id: 'ops',
    title: 'Government operations',
    items: [
      { path: '/', name: 'Main Dashboard', icon: 'dashboard' },
      { path: '/iot', name: 'IoT & AI Management', icon: 'iot' },
      { path: '/irrigation', name: 'Precision Irrigation', icon: 'irrigation' },
      { path: '/cea', name: 'Vertical Farming / CEA', icon: 'cea' },
      { path: '/energy', name: 'Agrivoltaics & Energy', icon: 'energy' },
      { path: '/economics', name: 'Cost & Economic Impact', icon: 'cost' },
      { path: '/reports', name: 'Analytics & Reports', icon: 'reports' },
    ],
  },
  {
    id: 'targets',
    title: 'Targets & investor access',
    items: [
      { path: '/targets/land', name: 'Land & investor access', icon: 'land' },
      { path: '/targets/benchmarks', name: 'Ratios & Benchmarks', icon: 'ratios' },
      { path: '/targets/goals', name: 'Strategic Goals', icon: 'goals' },
    ],
  },
]

export const OWNER_NAV: NavGroup[] = [
  {
    id: 'holdings',
    title: 'My land',
    items: [
      { path: '/owner', name: 'Holdings', icon: 'land' },
      { path: '/owner/access', name: 'Sale or exploitation', icon: 'unlock' },
    ],
  },
]

export const INVESTOR_NAV: NavGroup[] = [
  {
    id: 'deals',
    title: 'External investment',
    items: [
      { path: '/investor', name: 'Open lands', icon: 'unlock' },
      { path: '/investor/interest', name: 'My interest', icon: 'handshake' },
    ],
  },
]

export function navFor(role: Role): NavGroup[] {
  if (role === 'owner') return OWNER_NAV
  if (role === 'investor') return INVESTOR_NAV
  return NAV
}

export function homeFor(role: Role) {
  if (role === 'owner') return '/owner'
  if (role === 'investor') return '/investor'
  return '/'
}

export type DemoUser = {
  email: string
  password: string
  role: Role
  name: string
  title: string
  initials: string
  partyId: string
}

export const DEMO_USERS: DemoUser[] = [
  {
    email: 'gov@namaa.sa',
    password: 'namaa',
    role: 'government',
    name: 'MEWA Operator',
    title: 'Government',
    initials: 'GV',
    partyId: 'mewa',
  },
  {
    email: 'owner@namaa.sa',
    password: 'namaa',
    role: 'owner',
    name: 'Al-Nakheel Holdings',
    title: 'Land proprietor',
    initials: 'NH',
    partyId: 'nakheel',
  },
  {
    email: 'waha@namaa.sa',
    password: 'namaa',
    role: 'owner',
    name: 'Waha Desert Estates',
    title: 'Land proprietor',
    initials: 'WE',
    partyId: 'waha',
  },
  {
    email: 'investor@namaa.sa',
    password: 'namaa',
    role: 'investor',
    name: 'Gulf Green Capital',
    title: 'External investor',
    initials: 'GG',
    partyId: 'gulf',
  },
]

export const DASHBOARD_KPIS = [
  {
    id: 'solar',
    label: 'Solar output',
    value: '486.2 MW',
    hint: 'Live · +4.8% vs yesterday',
    spark: [310, 340, 380, 420, 455, 470, 486],
    tone: 'solar' as const,
  },
  {
    id: 'water',
    label: 'Water consumption',
    value: '18,420 m³/d',
    hint: '−37.4% vs conventional',
    spark: [28, 26, 24, 22, 20, 19, 18.4],
    tone: 'water' as const,
  },
  {
    id: 'ler',
    label: 'Land Equivalent Ratio',
    value: '1.62 LER',
    hint: '+62% vs mono-use land',
    spark: [1.0, 1.12, 1.24, 1.35, 1.48, 1.55, 1.62],
    tone: 'leaf' as const,
  },
  {
    id: 'units',
    label: 'Active farm units',
    value: '214 / 500',
    hint: '1.2 MW each · 256.8 MW online',
    spark: [40, 80, 120, 150, 180, 200, 214],
    tone: 'sand' as const,
  },
]

export const MICROCLIMATE = [
  { zone: 'Under PV canopy', soilC: 29.4, humidity: 41, wind: 2.1, irradiance: 412 },
  { zone: 'Crop inter-row', soilC: 31.1, humidity: 38, wind: 2.8, irradiance: 640 },
  { zone: 'Open desert control', soilC: 33.9, humidity: 22, wind: 4.6, irradiance: 980 },
]

export const ENERGY_HOURLY = [
  { t: '06:00', gen: 42, pump: 8, battery: 12 },
  { t: '08:00', gen: 180, pump: 55, battery: 70 },
  { t: '10:00', gen: 340, pump: 90, battery: 140 },
  { t: '12:00', gen: 486, pump: 110, battery: 190 },
  { t: '14:00', gen: 455, pump: 105, battery: 175 },
  { t: '16:00', gen: 290, pump: 70, battery: 95 },
  { t: '18:00', gen: 85, pump: 40, battery: 20 },
]

export type Sensor = {
  id: string
  lat: number
  lng: number
  status: 'online' | 'degraded' | 'offline'
  type: string
  unit: string
}

/** Inland boxes, clear of the Red Sea and the Gulf. */
const INLAND_BOXES = [
  { region: 'Riyadh', lat: [23.9, 26.3], lng: [44.7, 47.5] },
  { region: 'Qassim', lat: [25.6, 27.2], lng: [42.7, 44.8] },
  { region: 'Hail', lat: [27.0, 28.4], lng: [40.8, 42.9] },
  { region: 'Al Jawf', lat: [29.4, 31.2], lng: [38.6, 40.8] },
  { region: 'Tabuk', lat: [27.5, 29.2], lng: [37.0, 38.5] },
  { region: 'Madinah', lat: [24.0, 25.6], lng: [39.0, 40.5] },
  { region: 'Makkah', lat: [21.3, 22.5], lng: [39.7, 41.3] },
  { region: 'Asir', lat: [18.3, 20.2], lng: [42.1, 43.5] },
  { region: 'Najran', lat: [17.5, 18.6], lng: [43.9, 45.2] },
  { region: 'Jazan', lat: [17.05, 17.55], lng: [42.75, 43.35] },
  { region: 'Eastern Province', lat: [24.9, 27.0], lng: [47.8, 49.6] },
  { region: 'AlUla', lat: [26.3, 27.1], lng: [37.7, 38.5] },
] as const

const SENSOR_TYPES = [
  'Soil moisture',
  'Irradiance',
  'Temp / RH',
  'Wind',
  'Flow meter',
  'Nutrient EC',
] as const

function mulberry32(seed: number) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function buildSensors(): Sensor[] {
  const rand = mulberry32(2030)
  const statuses: Sensor['status'][] = [
    ...Array.from({ length: 100 }, () => 'online' as const),
    ...Array.from({ length: 25 }, () => 'degraded' as const),
    ...Array.from({ length: 25 }, () => 'offline' as const),
  ]
  const areas = INLAND_BOXES.map(
    (b) => (b.lat[1] - b.lat[0]) * (b.lng[1] - b.lng[0]),
  )
  const areaSum = areas.reduce((sum, area) => sum + area, 0)
  const counts = areas.map((area) =>
    Math.max(3, Math.round((area / areaSum) * statuses.length)),
  )
  let drift = statuses.length - counts.reduce((sum, n) => sum + n, 0)
  for (let i = 0; drift !== 0; i++) {
    const idx = i % counts.length
    if (drift > 0) {
      counts[idx] += 1
      drift -= 1
    } else if (counts[idx] > 3) {
      counts[idx] -= 1
      drift += 1
    }
  }

  const placed: { region: string; lat: number; lng: number }[] = []
  INLAND_BOXES.forEach((box, boxIndex) => {
    const latSpan = box.lat[1] - box.lat[0]
    const lngSpan = box.lng[1] - box.lng[0]
    const farms = Array.from({ length: 3 }, () => ({
      lat: box.lat[0] + (0.2 + rand() * 0.6) * latSpan,
      lng: box.lng[0] + (0.2 + rand() * 0.6) * lngSpan,
    }))
    const here: { lat: number; lng: number }[] = []
    for (let n = 0; n < counts[boxIndex]; n++) {
      let lat = box.lat[0] + rand() * latSpan
      let lng = box.lng[0] + rand() * lngSpan
      for (let attempt = 0; attempt < 20; attempt++) {
        const farm = farms[Math.floor(rand() * farms.length)]
        const loose = rand() < 0.45
        const candidateLat = Math.min(
          box.lat[1],
          Math.max(
            box.lat[0],
            loose
              ? box.lat[0] + rand() * latSpan
              : farm.lat + (rand() + rand() - 1) * latSpan * 0.55,
          ),
        )
        const candidateLng = Math.min(
          box.lng[1],
          Math.max(
            box.lng[0],
            loose
              ? box.lng[0] + rand() * lngSpan
              : farm.lng + (rand() + rand() - 1) * lngSpan * 0.55,
          ),
        )
        const minGap = Math.min(latSpan, lngSpan) * 0.12
        const crowded = here.some((p) => {
          const dLat = p.lat - candidateLat
          const dLng = p.lng - candidateLng
          return dLat * dLat + dLng * dLng < minGap * minGap
        })
        lat = candidateLat
        lng = candidateLng
        if (!crowded) break
      }
      here.push({ lat, lng })
      placed.push({ region: box.region, lat, lng })
    }
  })

  for (let i = statuses.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[statuses[i], statuses[j]] = [statuses[j], statuses[i]]
  }

  return statuses.map((status, i) => {
    const spot = placed[i % placed.length]
    return {
      id: `SN-${String(i + 1).padStart(3, '0')}`,
      lat: spot.lat,
      lng: spot.lng,
      status,
      type: SENSOR_TYPES[i % SENSOR_TYPES.length],
      unit: `Unit ${i + 1} · ${spot.region}`,
    }
  })
}

export const SENSORS: Sensor[] = buildSensors()

export const AI_RECS = [
  {
    id: 'R-1',
    title: 'Advance night irrigation on Units 12–18',
    detail:
      'Soil moisture trending −8% with forecast 41°C peak. Shift 2.4h of drip to 01:00–04:00 to cut evaporative loss.',
    impact: 'Est. +1.8% water saved this week',
    confidence: 92,
    type: 'Irrigation',
  },
  {
    id: 'R-2',
    title: 'Increase PV tracking tilt 6° (west) after 14:30',
    detail:
      'Afternoon irradiance on crop rows is 18% above stress threshold. Extra shade protects leafy greens without losing >2% yield.',
    impact: 'Hold soil ΔT at −2.5°C',
    confidence: 87,
    type: 'Shading',
  },
  {
    id: 'R-3',
    title: 'Charge battery bank B before 11:20',
    detail:
      'Cloud band incoming 13:40. Pre-charging 18 MWh keeps irrigation pumps off-grid through the dip.',
    impact: 'Avoid 3.1 MWh grid draw',
    confidence: 90,
    type: 'Energy',
  },
]

export const IRRIGATION_ZONES = [
  { id: 'Z-A', name: 'Dates · Units 1–40', status: 'running', duty: 68, saved: 39, next: '01:15' },
  { id: 'Z-B', name: 'Forage · Units 41–90', status: 'scheduled', duty: 0, saved: 36, next: '02:40' },
  { id: 'Z-C', name: 'Vegetables · Units 91–140', status: 'running', duty: 44, saved: 41, next: '03:10' },
  { id: 'Z-D', name: 'Pilots · Units 141–214', status: 'paused', duty: 0, saved: 34, next: '—' },
]

export const CEA_MODULES = [
  { id: 'CEA-A', crop: 'Basil · organic', ec: 1.8, ph: 6.1, temp: 22.4, rh: 68, yieldKg: 1240 },
  { id: 'CEA-B', crop: 'Lettuce · organic', ec: 1.4, ph: 6.0, temp: 20.8, rh: 72, yieldKg: 2860 },
  { id: 'CEA-C', crop: 'Strawberry · organic', ec: 1.6, ph: 5.9, temp: 21.2, rh: 70, yieldKg: 910 },
  { id: 'CEA-D', crop: 'Microgreens', ec: 1.2, ph: 6.2, temp: 19.6, rh: 74, yieldKg: 640 },
]

export const COST_LINES = [
  { item: 'PV + trackers (CapEx)', plan: 420, actual: 388, kind: 'capex' as const },
  { item: 'Drip + sensors (CapEx)', plan: 86, actual: 71, kind: 'capex' as const },
  { item: 'CEA racks (CapEx)', plan: 54, actual: 49, kind: 'capex' as const },
  { item: 'Water & pumping (OpEx / yr)', plan: 38, actual: 24, kind: 'opex' as const },
  { item: 'O&M labour (OpEx / yr)', plan: 22, actual: 18, kind: 'opex' as const },
  { item: 'Spare parts (OpEx / yr)', plan: 9, actual: 7, kind: 'opex' as const },
]

export const IMPACT = {
  co2AvoidedT: 18420,
  desertReclaimedHa: 4280,
  waterSavedM3: 6_840_000,
  organicTons: 1840,
}

export const PARTIES = {
  nakheel: 'Al-Nakheel Holdings',
  waha: 'Waha Desert Estates',
  state: 'Public land (state)',
  gulf: 'Gulf Green Capital',
} as const

export type LandStatus = 'active' | 'prepared' | 'prep'

export type LandUnit = {
  id: string
  status: LandStatus
  ha: number
  mw: number
  lat: number
  lng: number
  region: string
  ownerId: keyof typeof PARTIES
  crop: string
  /** Government seed: external investors may exploit this parcel. */
  openToInvestors: boolean
  /** Proprietor decision. Filled from local state at runtime. */
  offer?: 'private' | 'sale' | 'exploit'
}

export const LAND_UNITS: LandUnit[] = [
  { id: 'U-012', status: 'active', ha: 20, mw: 1.2, lat: 24.7136, lng: 46.6753, region: 'Riyadh', ownerId: 'nakheel', crop: 'Dates', openToInvestors: false },
  { id: 'U-033', status: 'active', ha: 20, mw: 1.2, lat: 21.4858, lng: 39.1925, region: 'Jeddah', ownerId: 'nakheel', crop: 'Vegetables', openToInvestors: true },
  { id: 'U-041', status: 'prepared', ha: 20, mw: 1.2, lat: 24.5247, lng: 39.5692, region: 'Madinah', ownerId: 'waha', crop: 'Forage', openToInvestors: false },
  { id: 'U-067', status: 'active', ha: 20, mw: 1.2, lat: 26.4207, lng: 50.0888, region: 'Eastern Province', ownerId: 'nakheel', crop: 'Forage', openToInvestors: true },
  { id: 'U-088', status: 'prep', ha: 20, mw: 1.2, lat: 28.3838, lng: 36.555, region: 'Tabuk', ownerId: 'state', crop: 'Pilot', openToInvestors: false },
  { id: 'U-102', status: 'prepared', ha: 20, mw: 1.2, lat: 26.608, lng: 37.923, region: 'AlUla', ownerId: 'waha', crop: 'Dates', openToInvestors: true },
  { id: 'U-140', status: 'prep', ha: 20, mw: 1.2, lat: 17.72, lng: 44.18, region: 'Najran', ownerId: 'state', crop: 'Pilot', openToInvestors: false },
  { id: 'U-188', status: 'active', ha: 20, mw: 1.2, lat: 26.326, lng: 43.975, region: 'Qassim', ownerId: 'nakheel', crop: 'Vegetables', openToInvestors: false },
  { id: 'U-214', status: 'active', ha: 20, mw: 1.2, lat: 17.12, lng: 42.68, region: 'Jazan', ownerId: 'waha', crop: 'Forage', openToInvestors: false },
  { id: 'U-301', status: 'prep', ha: 20, mw: 1.2, lat: 29.9697, lng: 40.2064, region: 'Al Jawf', ownerId: 'state', crop: 'Pilot', openToInvestors: false },
]

export const LAND_SUMMARY = {
  targetHa: 10000,
  reclaimedHa: 4280,
  unitsTotal: 500,
  unitsActive: 214,
  unitsPrepared: 96,
  unitsPrep: 190,
  mwPerUnit: 1.2,
}

export const BENCHMARKS = [
  {
    id: 'reclaim',
    name: 'Reclamation ratio',
    current: 42.8,
    target: 100,
    unit: '% of 10,000 ha',
    note: 'Focus: 80%+ of KSA land is uncultivated desert.',
  },
  {
    id: 'ler',
    name: 'Land Equivalent Ratio boost',
    current: 62,
    target: 60,
    unit: '% vs conventional',
    note: 'Target ≥ 60% productivity lift from dual-use agrivoltaics.',
  },
  {
    id: 'water',
    name: 'Water conservation',
    current: 37.4,
    target: 40,
    unit: '% saved',
    note: 'Sub-surface drip target band: 35–40%.',
  },
  {
    id: 'soil',
    name: 'Soil temperature reduction',
    current: 2.5,
    target: 2.5,
    unit: '°C under canopy',
    note: 'Panel shading microclimate vs open desert control.',
  },
]

export const STRATEGIC_GOALS = [
  {
    name: 'Clean energy per unit',
    current: '1.20 MW',
    target: '1.2 MW',
    progress: 100,
    detail: 'Powers irrigation pumps and site automation.',
  },
  {
    name: 'Fleet PV capacity',
    current: '256.8 MW',
    target: '600 MW',
    progress: 42.8,
    detail: '500 units × 1.2 MW when fully deployed.',
  },
  {
    name: 'Carbon offset',
    current: '18,420 tCO₂e/yr',
    target: '43,000 tCO₂e/yr',
    progress: 43,
    detail: 'Avoided emissions from renewable generation.',
  },
  {
    name: 'Organic crop yield',
    current: '1,840 t/yr',
    target: '4,200 t/yr',
    progress: 44,
    detail: 'CEA + shaded field crops (high-value organics).',
  },
  {
    name: 'CapEx vs plan',
    current: '−9.4%',
    target: '−8%',
    progress: 100,
    detail: 'Cost-effective sensors and modular PV.',
  },
  {
    name: 'OpEx vs plan',
    current: '−29%',
    target: '−20%',
    progress: 100,
    detail: 'Water + labour savings from automation.',
  },
]
