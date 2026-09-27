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

export const NAV = [
  {
    id: 'ops',
    title: 'Operations',
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
    title: 'Targets & Strategic Impact',
    items: [
      { path: '/targets/land', name: 'Land Allocation', icon: 'land' },
      { path: '/targets/benchmarks', name: 'Ratios & Benchmarks', icon: 'ratios' },
      { path: '/targets/goals', name: 'Strategic Goals', icon: 'goals' },
    ],
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

export const SENSORS: Sensor[] = [
  { id: 'SN-014', lat: 24.7136, lng: 46.6753, status: 'online' as const, type: 'Soil moisture', unit: 'Unit 12 · Riyadh' },
  { id: 'SN-027', lat: 21.4858, lng: 39.1925, status: 'online' as const, type: 'Irradiance', unit: 'Unit 18 · Jeddah' },
  { id: 'SN-041', lat: 24.5247, lng: 39.5692, status: 'online' as const, type: 'Temp / RH', unit: 'Unit 33 · Madinah' },
  { id: 'SN-058', lat: 26.4207, lng: 50.0888, status: 'degraded' as const, type: 'Wind', unit: 'Unit 41 · Dammam' },
  { id: 'SN-073', lat: 28.3838, lng: 36.5550, status: 'online' as const, type: 'Soil moisture', unit: 'Unit 67 · Tabuk' },
  { id: 'SN-088', lat: 17.4924, lng: 44.1277, status: 'offline' as const, type: 'Flow meter', unit: 'Unit 09 · Najran' },
  { id: 'SN-102', lat: 26.3260, lng: 43.9750, status: 'online' as const, type: 'Nutrient EC', unit: 'CEA-A · Qassim' },
  { id: 'SN-119', lat: 18.2164, lng: 42.5053, status: 'online' as const, type: 'Temp / RH', unit: 'Unit 92 · Asir / Abha' },
]

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

export const LAND_UNITS = [
  { id: 'U-012', status: 'active' as const, ha: 20, mw: 1.2, lat: 24.7136, lng: 46.6753, region: 'Riyadh' },
  { id: 'U-033', status: 'active' as const, ha: 20, mw: 1.2, lat: 21.4858, lng: 39.1925, region: 'Jeddah' },
  { id: 'U-041', status: 'prepared' as const, ha: 20, mw: 1.2, lat: 24.5247, lng: 39.5692, region: 'Madinah' },
  { id: 'U-067', status: 'active' as const, ha: 20, mw: 1.2, lat: 26.4207, lng: 50.0888, region: 'Eastern Province' },
  { id: 'U-088', status: 'prep' as const, ha: 20, mw: 1.2, lat: 28.3838, lng: 36.5550, region: 'Tabuk' },
  { id: 'U-102', status: 'prepared' as const, ha: 20, mw: 1.2, lat: 26.6080, lng: 37.9230, region: 'AlUla' },
  { id: 'U-140', status: 'prep' as const, ha: 20, mw: 1.2, lat: 17.4924, lng: 44.1277, region: 'Najran' },
  { id: 'U-188', status: 'active' as const, ha: 20, mw: 1.2, lat: 26.3260, lng: 43.9750, region: 'Qassim' },
  { id: 'U-214', status: 'active' as const, ha: 20, mw: 1.2, lat: 16.8892, lng: 42.5706, region: 'Jazan' },
  { id: 'U-301', status: 'prep' as const, ha: 20, mw: 1.2, lat: 29.9697, lng: 40.2064, region: 'Al Jawf' },
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
