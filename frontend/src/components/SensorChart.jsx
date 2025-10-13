import { useState, useEffect, useContext } from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js'
import { AppContext } from '../context/AppContext'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

function detectAnomalies(values){
  const mean = values.reduce((a,b)=>a+b,0)/values.length
  const sd = Math.sqrt(values.reduce((a,b)=>a + Math.pow(b-mean,2),0)/values.length)
  // anomaly if value more than 2*sd away
  return values.map(v => Math.abs(v-mean) > 2*sd)
}

// simple linear forecast of next n points using linear regression
function forecast(values, n=6){
  const m = values.length
  const xs = Array.from({length:m},(_,i)=>i)
  const ys = values
  const xmean = xs.reduce((a,b)=>a+b,0)/m
  const ymean = ys.reduce((a,b)=>a+b,0)/m
  const num = xs.reduce((s,xi,i)=>s + (xi-xmean)*(ys[i]-ymean),0)
  const den = xs.reduce((s,xi)=>s + Math.pow(xi-xmean,2),0)
  const slope = den === 0 ? 0 : num/den
  const intercept = ymean - slope * xmean
  const res = []
  for(let i=0;i<n;i++){
    const x = m + i
    res.push(Number((intercept + slope * x).toFixed(2)))
  }
  return res
}

export default function SensorChart({ sensorId = 's1' }){
  const ctx = useContext(AppContext)
  const [type, setType] = useState('flow')
  const [series, setSeries] = useState({ labels: [], values: [] })
  const [showForecast, setShowForecast] = useState(false)
  const [forecastValues, setForecastValues] = useState([])
  const [extended, setExtended] = useState(false)

  useEffect(()=>{
    if(ctx && ctx.getSensorSeries){
      const s = ctx.getSensorSeries(sensorId, type)
      setSeries(s)
      setShowForecast(false)
      setForecastValues([])
    }
  },[sensorId, type])

  const anomalies = detectAnomalies(series.values)

  const chartData = {
    labels: series.labels.concat(showForecast ? Array.from({length: forecastValues.length},(_,i)=>`+${i+1}h`) : []),
    datasets: [
      {
        label: `${type} value`,
        data: series.values,
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6,182,212,0.06)',
        tension: 0.2,
        pointRadius: 3,
      },
      // anomaly overlay
      {
        label: 'anomaly',
        data: series.values.map((v,i)=> anomalies[i] ? v : null),
        pointBackgroundColor: 'red',
        showLine: false,
        pointRadius: 6,
      }
    ]
  }

  if(showForecast && forecastValues.length){
    chartData.datasets.push({
      label: 'Forecast',
      data: Array(series.values.length).fill(null).concat(forecastValues),
      borderDash: [6,4],
      borderColor: '#f97316',
      tension: 0.2,
      pointRadius: 0,
    })
  }

  const handleForecast = (ext=false) =>{
    const n = ext ? 24 : 6
    const f = forecast(series.values, n)
    setForecastValues(f)
    setShowForecast(true)
    setExtended(ext)
  }

  const [enlarged, setEnlarged] = useState(false)

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <select value={type} onChange={e=>setType(e.target.value)} className="border px-2 py-1 rounded">
            <option value="temperature">Temperature</option>
            <option value="dissolved_oxygen">Dissolved Solids</option>
            <option value="chlorophyll">Chlorophyll</option>
            <option value="ph">pH</option>
            <option value="salinity">Salinity</option>
          </select>
          <button className="px-3 py-1 bg-slate-100 rounded text-sm" onClick={()=>{ const s = ctx.getSensorSeries(sensorId,type); setSeries(s); setShowForecast(false); setForecastValues([]) }}>Reload</button>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-amber-500 text-white rounded text-sm" onClick={()=>handleForecast(false)}>Forecast 6h</button>
          <button className="px-3 py-1 bg-orange-400 text-white rounded text-sm" onClick={()=>handleForecast(true)}>Forecast 24h</button>
          <button className="px-3 py-1 bg-slate-700 text-white rounded text-sm" onClick={()=>setEnlarged(true)}>Enlarge</button>
        </div>
      </div>

      <div className="h-84" style={{height: 340}}>
        <Line data={chartData} />
      </div>

      {enlarged && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" style={{background:'rgba(2,6,23,0.6)'}}>
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-6xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Expanded Trend — {type}</h3>
              <div>
                <button className="px-3 py-1 mr-2 bg-amber-500 text-white rounded" onClick={()=>handleForecast(false)}>Forecast 6h</button>
                <button className="px-3 py-1 mr-2 bg-orange-400 text-white rounded" onClick={()=>handleForecast(true)}>Forecast 24h</button>
                <button className="px-3 py-1 bg-slate-200 rounded" onClick={()=>setEnlarged(false)}>Close</button>
              </div>
            </div>
            <div style={{height: 520}}>
              <Line data={chartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
