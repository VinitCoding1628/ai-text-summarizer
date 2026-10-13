import React from 'react'
import logo from '../assets/images/icon.svg'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/hooks/useTheme'
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const handleLogoClick = () => {
        navigate('/')
    }
    return (
        <nav className='sticky top-0 z-50 flex justify-between items-center w-full gap-2 border-b-[0.1px] border-b-muted-foreground backdrop-blur-lg p-4'>
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
                <img src={logo} alt="logo" />
                <h2 className="text-2xl font-semibold">Summarizo</h2>
            </div>

            <Tooltip>
                <TooltipTrigger render={<button
                    type="button"
                    onClick={toggleTheme}
                    position='top'
                    aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
                    className="rounded-full cursor-pointer p-2"
                >
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>} />
                <TooltipContent>
                    <p>{theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}</p>
                </TooltipContent>
            </Tooltip>
        </nav>
    )
}

export default Navbar