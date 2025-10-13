import SmallCard from '../components/SmallCard'
import SensorChart from '../components/SensorChart'
import SensorMap from '../components/SensorMap'
import Header from '../components/Header'

export default function Dashboard(){
  return (
    <div className="space-y-6">
      <Header />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SmallCard title="Active Sensors" value="4" />
        <SmallCard title="Anomalies" value="3" />
        <SmallCard title="Alerts" value="7" />
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card col-span-2">{/* chart */}
          <h2 className="text-lg font-medium mb-2">Sensor Trends</h2>
          <SensorChart sensorId={'s1'} />
        </div>
        <div className="card">{/* map / summary */}
          <h2 className="text-lg font-medium mb-2">Map</h2>
          <SensorMap markers={[
                    { id: 'm1', name: 'Subic Pier 1', lat: 14.7938, lng: 120.2716  },
                    { id: 'm2', name: 'Olongapo Station', lat: 14.8376, lng: 120.2716 },
                    { id: 'm3', name: 'Subic River', lat: 14.8156, lng: 120.2831 }
                  ]} />
        </div>
      </section>
    </div>
  )
}
