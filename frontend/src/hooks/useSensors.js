import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

export default function useSensors(){
  const ctx = useContext(AppContext)
  if(!ctx) return { sensors: [] }
  return { sensors: ctx.sensors }
}
