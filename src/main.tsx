import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import IotAi from './pages/IotAi'
import Irrigation from './pages/Irrigation'
import Cea from './pages/Cea'
import Energy from './pages/Energy'
import Economics from './pages/Economics'
import Reports from './pages/Reports'
import Land from './pages/Land'
import Benchmarks from './pages/Benchmarks'
import Goals from './pages/Goals'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="iot" element={<IotAi />} />
          <Route path="irrigation" element={<Irrigation />} />
          <Route path="cea" element={<Cea />} />
          <Route path="energy" element={<Energy />} />
          <Route path="economics" element={<Economics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="targets/land" element={<Land />} />
          <Route path="targets/benchmarks" element={<Benchmarks />} />
          <Route path="targets/goals" element={<Goals />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  </StrictMode>,
)
