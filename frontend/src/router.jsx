import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import Sensors from './pages/Sensors'
import MapPage from './pages/MapPage'
import Sidebar from './components/Sidebar'

export default function Router(){
  return (
    <div className="w-full flex">
      <Sidebar />
      <main className="main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sensors" element={<Sensors />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}
