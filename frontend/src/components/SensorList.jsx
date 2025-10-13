import useSensors from '../hooks/useSensors'

export default function SensorList(){
  const { sensors } = useSensors()

  return (
    <div className="space-y-3">
      {sensors.map(s => (
        <div key={s.id} className="flex items-center justify-between p-3 bg-white border rounded-md">
          <div>
            <p className="font-medium text-slate-900">{s.name}</p>
            <p className="text-sm muted">{s.location}</p>
          </div>
          <div className={`px-3 py-1 rounded text-sm ${s.status === 'ok' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
            {s.status}
          </div>
        </div>
      ))}
    </div>
  )
}
