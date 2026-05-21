import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'

const ThemeToggle = () => {
  const {setTheme, resolvedTheme} = useTheme();


  return(
    <button 
      onClick={() => setTheme(resolvedTheme=== 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md text-grey-200 hover:bg-grey/10 hover:bg-white/10 transition-colors border border-grey-800 dark:border-grey-200"
  
    >
      {resolvedTheme === 'dark' ? <SunIcon className='h-5 w-5' /> : <MoonIcon className='h-5 w-5'/>}
    </button>

  )
}

export default ThemeToggle;