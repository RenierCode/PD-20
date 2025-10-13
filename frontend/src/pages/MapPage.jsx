import SensorMap from '../components/SensorMap'

export default function MapPage(){
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Map</h1>
      <div className="card">
        <SensorMap markers={[
          { id: 'm1', name: 'Subic Pier 1', lat: 14.7938, lng: 120.2716  },
          { id: 'm2', name: 'Olongapo Station', lat: 14.8376, lng: 120.2716 },
          { id: 'm3', name: 'Subic River', lat: 14.8156, lng: 120.2831 }
        ]} />
      </div>
    </div>
  )
}
