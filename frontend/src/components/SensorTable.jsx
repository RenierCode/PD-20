import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function SensorTable(){
  const { sensors } = useContext(AppContext)

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4">All Sensors</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-sky-400 text-white text-sm">
              <th className="px-4 py-2 text-left">Sensor ID</th>
              <th className="px-4 py-2 text-left">Location</th>
              <th className="px-4 py-2 text-left">Type</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {sensors.map(s => (
              <tr key={s.id} className="odd:bg-slate-50">
                <td className="px-4 py-3">{s.id}</td>
                <td className="px-4 py-3">{s.location}</td>
                <td className="px-4 py-3">Flow / pH / Turbidity</td>
                <td className="px-4 py-3">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
