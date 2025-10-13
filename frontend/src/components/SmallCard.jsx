export default function SmallCard({title, value}){
  return (
    <div className="card flex flex-col items-start">
      <p className="text-sm muted">{title}</p>
      <p className="text-2xl font-semibold mt-2 text-slate-900">{value}</p>
    </div>
  )
}
