// Generates 24 hourly points for different sensor types with occasional anomalies
function randBetween(a, b){ return a + Math.random() * (b - a) }

export function generate24h(type){
  const now = new Date()
  const labels = []
  const values = []
  for(let i=23;i>=0;i--){
    const d = new Date(now.getTime() - i * 3600 * 1000)
    labels.push(d.toISOString().slice(11,16))
    let base = 0
    switch(type){
      case 'temperature': base = randBetween(17.0,33.0) ; break
      case 'dissolved_oxygen': base = randBetween(2, 10); break
      case 'chlorophyll': base = randBetween(0.0,50.0 ); break
      case 'pH': base = randBetween(7.0, 8.5); break
      case 'salinity': base = randBetween(0.15, 35); break
      default: base = randBetween(10,50)
    }
    // small random walk
    const noise = (Math.random() - 0.5) * (base * 0.05)
    values.push(Number((base + noise).toFixed(2)))
  }
  // inject occasional anomaly
  if(Math.random() < 0.4){
    const idx = Math.floor(Math.random() * values.length)
    values[idx] = Number((values[idx] * (1 + (Math.random() < 0.5 ? -0.5 : 1.5))).toFixed(2))
  }

  return { labels, values }
}

export function toCSV(sensorId, type, labels, values){
  const rows = [['sensor_id','type','timestamp','value']]
  for(let i=0;i<labels.length;i++) rows.push([sensorId, type, labels[i], values[i]])
  return rows.map(r => r.join(',')).join('\n')
}
