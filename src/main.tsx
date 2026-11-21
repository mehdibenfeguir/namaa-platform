import { StrictMode, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import './index.css'
import { AuthProvider, useAuth } from './auth'
import { I18nProvider } from './i18n'
import { LandsProvider } from './lands'
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
import Login from './pages/Login'
import { OwnerAccess, OwnerHoldings } from './pages/OwnerPortal'
import { InvestorInterest, InvestorOpen } from './pages/InvestorPortal'
import { homeFor, type Role } from './data/namaa'

function Gate({ role, children }: { role: Role; children: ReactNode }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== role) return <Navigate to={homeFor(user.role)} replace />
  return children
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <Gate role="government">
            <Layout />
          </Gate>
        }
      >
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
      </Route>
      <Route
        path="/owner"
        element={
          <Gate role="owner">
            <Layout />
          </Gate>
        }
      >
        <Route index element={<OwnerHoldings />} />
        <Route path="access" element={<OwnerAccess />} />
      </Route>
      <Route
        path="/investor"
        element={
          <Gate role="investor">
            <Layout />
          </Gate>
        }
      >
        <Route index element={<InvestorOpen />} />
        <Route path="interest" element={<InvestorInterest />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <AuthProvider>
        <LandsProvider>
          <HashRouter>
            <AppRoutes />
          </HashRouter>
        </LandsProvider>
      </AuthProvider>
    </I18nProvider>
  </StrictMode>,
)
