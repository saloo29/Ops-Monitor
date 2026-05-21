
const severityConfig = {
  HIGH: 'bg-orange-500/20 text-orange-400 dark:text-orange-500 border-orange-500/40',
  CRITICAL: 'bg-red-500/20 text-red-400 dark:text-red-800 border-red-500/40',
  MEDIUM: 'bg-yellow-500/20 text-yellow-400 dark:text-amber-400 border-amber-500/40',
  LOW: 'bg-blue-500/20 text-blue-400 dark:text-sky-400 border-sky-500/40',
}

type SeverityProps = keyof typeof severityConfig;

const SeverityBadge = ({level} : {level : SeverityProps}) => {
  const classes = severityConfig[level];

  return (
    <span className={`max-w-max rounded text-sm flex items-center justify-center font-sans font-semibold px-2 py-0.5 border
      ${classes}
    `}>
      {level}
    </span>
  )
}

export default SeverityBadge;