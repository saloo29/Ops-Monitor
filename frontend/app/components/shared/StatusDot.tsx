
const statusDotConfig = {
  OPEN: 'bg-orange-500 text-slate-800 animate-pulse',
  INVESTIGATING: 'bg-indigo-600 text-white animate-pulse',
  IDENTIFIED: 'bg-purple-600 text-white',
  MONITORING: 'bg-teal-600 text-white',
  RESOLVED: 'bg-green-600 text-white'
};

type StatusProps = keyof typeof statusDotConfig; 

const StatusDot= ({status} : {status : StatusProps}) => {
  const dotColor= statusDotConfig [status];

  return(
    <div className="flex items-center gap-2 border rounded-full px-4 py-1 max-w-max">
      <span className={`w-2 h-2 rounded-full ${dotColor}`} />
      <span className="text-sm font-sans">{status}</span>
    </div>
  )

}

export default StatusDot;