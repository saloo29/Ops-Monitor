const statusConfig = {
  OPEN: { dot : 'bg-orange-400', pill: 'bg-orange-400'},
  INVESTIGATING: { dot : 'bg-indigo-500', pill : 'bg-indigo-500' },
  IDENTIFIED: { dot: 'bg-purple-500', pill: 'bg-purple-500'},
  MONITORING: { dot: 'bg-teal-500', pill: 'bg-teal-500'},
  RESOLVED: { dot: 'bg-green-500', pill: 'bg-green-500'}
};

type StatusProps = keyof typeof statusConfig; 

const StatusBadge= ({
  status,
  variant = 'dot'
} : {
  status : StatusProps
  variant?: 'dot' | 'pill'
}) => {
  const config = statusConfig [status];


  if( variant === 'pill') {
    return (
      <div className={`
        text-xs font-bold px-4 py-1 rounded-2xl 
        dark:text-white text-slate-800
        ${config.pill}
      `}>
        {status}
      </div>
    )
  }

  return(
    <div className="flex items-center gap-2 rounded-full px-4 py-1 max-w-max border">
      <span className={`w-2 h-2 rounded-full ${config.dot}`} />
      <span className="text-sm font-sans">{status}</span>
    </div>
  )

}

export default StatusBadge;