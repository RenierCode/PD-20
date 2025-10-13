export default function Header(){
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="text-sm text-slate-500">Live sensor feed and analytics</p>
      </div>
      <div className="flex items-center gap-3">
        <input className="border rounded px-3 py-2 text-sm" placeholder="Search sensors" />
        <button className="px-3 py-2 bg-slate-800 text-white rounded text-sm">Invite</button>
      </div>
    </div>
  )
}
