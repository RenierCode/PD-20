import SensorList from '../components/SensorList'
import SensorTable from '../components/SensorTable'
import SensorMap from '../components/SensorMap'

export default function Sensors(){
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold hero-title">Sensor Management</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-2">
          <SensorTable />
        </div>
        <div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Recent Activity Feed</h3>
            <div className="h-56 bg-slate-50 rounded border border-slate-100"></div>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-2">Map</h3>
        <SensorMap markers={[]}/>
      </div>
    </div>
  )
}
