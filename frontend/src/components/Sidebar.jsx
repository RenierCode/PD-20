import { NavLink } from 'react-router-dom'

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/sensors', label: 'Sensors' },
  { to: '/map', label: 'Map' },
  { to: '/reports', label: 'Reports' },
]

export default function Sidebar(){
  return (
    <aside className="sidebar p-6 flex flex-col">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">Argus</h2>
        <p className="text-sm text-slate-500">Monitoring dashboard</p>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map(l => (
          <NavLink key={l.to} to={l.to} className={({isActive}) => `block px-3 py-2 rounded-md ${isActive ? 'bg-slate-100 text-slate-900' : 'text-slate-700 hover:bg-slate-50'}`}>
            {l.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 text-sm text-slate-500">v0.1.0</div>
    </aside>
  )
}
