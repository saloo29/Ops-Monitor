
export const formatDuration = (
  createdAt: string, 
  resolvedAt?: string | null
) => {
  const created = new Date(createdAt);

  const end = resolvedAt 
    ? new Date(resolvedAt)
    : new Date()

  const diffMs = end.getTime() - created.getTime();
  console.log(diffMs);

  const totalMinutes = Math.floor(diffMs / (1000 * 60))

  if(totalMinutes < 60){
    return `${totalMinutes}m`;
  } 
  
  const totalHours = Math.floor(totalMinutes / 60);

  if(totalHours < 24) {
    const remainingMinutes = totalMinutes % 60;

    return `${totalHours}h ${remainingMinutes}m`;
  };

  const days = Math.floor(totalHours / 24);

  const remainingHours = totalHours % 24;

  return `${days}d ${remainingHours}h`;
}