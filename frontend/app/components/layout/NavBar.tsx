'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ThemeToggle from '../shared/ThemeToggle'

const links = [
  {href: '/dashboard', label: 'Dashboard'},
  {href: '/incidents', label: 'Incident'},
  {href: '/teams', label: 'Teams'}
]

const NavBar = () => {
  const pathname = usePathname();

  return(
    <header className=" relative flex p-4 gap-x-8 items-center justify-between border-b border-border">
      <div className="flex items-center gap-2 ml-8">
        <span className="text-xl font-bold bg-indigo-600 w-8 h-8 rounded-sm flex items-center justify-center shadow-[0_0_12px_rgba(99,102,241,0.6)]">
          O
        </span>
        <span className="text-xl font-bold">
          OpsMonitor
          <span className="text-indigo-600 shadow-[0_0_0_rgba(99,102,241,0.8)]">
            Intelligence
          </span>
        </span>
      </div>

      <div className="flex gap-6 items-center absolute left-1/2 -translate-x-1/2">
        {links.map((link) => { 
          const isActive = pathname === link.href

          return(
            <Link
              key={link.href}
              href={link.href}
              className={`
                font-bold text-lg hover:text-slate-900 dark:hover:text-white transition-colors duration-200
                ${isActive 
                  ? 'text-indigo-600 dark:text-indigo-400 underline' 
                  : 'text-slate-500 dark:text-slate-400'
                } 
              `}
            >
              {link.label}
            </Link>
          )
        })
        }
      </div>
        <div  className="mr-14 flex items-center justify-center gap-3">
          <ThemeToggle />
          <span className='font-bold'>Admin</span>
        </div>
    </header>
  )
}

export default NavBar;