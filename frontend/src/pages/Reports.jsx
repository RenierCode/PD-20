import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toCSV, generate24h } from '../utils/mockData'

export default function Reports(){
  const { sensors } = useContext(AppContext)
  const [sensorId, setSensorId] = useState(sensors[0]?.id)
  const [type, setType] = useState('flow')

  const handleExport = () =>{
    const s = generate24h(type)
    const csv = toCSV(sensorId, type, s.labels, s.values)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${sensorId}_${type}_24h.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reports</h1>
      <div className="card space-y-4">
        <div className="flex items-center gap-3">
          <select value={sensorId} onChange={e=>setSensorId(e.target.value)} className="border px-2 py-1 rounded">
            {sensors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
          <select value={type} onChange={e=>setType(e.target.value)} className="border px-2 py-1 rounded">
            <option value="flow">Flow rate</option>
            <option value="level">Water level</option>
            <option value="ph">pH</option>
            <option value="turbidity">Turbidity</option>
            <option value="ts">Dissolved solids</option>
          </select>
          <button className="px-3 py-1 bg-slate-800 text-white rounded" onClick={handleExport}>Export CSV (24h)</button>
        </div>

        <p className="text-sm muted">Click Export to download a generated 24-hour CSV for the selected sensor and metric.</p>
      </div>
    </div>
  )
}
