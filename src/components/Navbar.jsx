import React from 'react'
import logo from '../assets/images/icon.svg'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
const Navbar = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <nav className='sticky top-0 z-50 flex justify-between items-center w-full gap-3'>
            <div className="flex items-center gap-3">
                <img src={logo} alt="logo" />
                <h2 className="text-2xl font-semibold">Summarizo</h2>
            </div>
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                className="rounded-full cursor-pointer p-2"
            >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </nav>
    )
}

export default Navbar