import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function SensorMap({ markers = [] }){
  const { sensors } = useContext(AppContext)
  const source = markers.length ? markers : sensors
  // Subic/Olongapo approximate center
  const center = source.length ? [source[0].lat, source[0].lng] : [14.806, 120.278]

  return (
    <div className="h-96">
      <MapContainer center={center} zoom={12} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <FitBounds markers={source} />
        {source.map(m => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            <Popup>{m.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}

function FitBounds({ markers }){
  const map = useMap()
  if(!markers || markers.length === 0) return null
  const latLngs = markers.map(m => [m.lat, m.lng])
  map.fitBounds(latLngs, { padding: [40,40] })
  return null
}
