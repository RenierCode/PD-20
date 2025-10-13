import { createContext, useState } from 'react'
import { generate24h } from '../utils/mockData'

export const AppContext = createContext(null)

const mockSensors = [
  { id: 's1', name: 'Subic Pier 1', location: 'Subic', status: 'ok', lat: 14.7938, lng: 120.2716 },
  { id: 's2', name: 'Olongapo Station', location: 'Olongapo', status: 'ok', lat: 14.8376, lng: 120.2842 },
  { id: 's3', name: 'Subic River', location: 'Subic', status: 'alert', lat: 14.8042, lng: 120.2790 },
]

export function AppProvider({ children }){
  const [sensors, setSensors] = useState(mockSensors)
  const [theme, setTheme] = useState('light')

  // runtime helper to fetch mock time-series for a sensor
  const getSensorSeries = (sensorId, type='flow') => {
    return generate24h(type)
  }

  return (
    <AppContext.Provider value={{ sensors, setSensors, theme, setTheme, getSensorSeries }}>
      {children}
    </AppContext.Provider>
  )
}
