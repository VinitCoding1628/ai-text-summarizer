import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@/hooks/useTheme'
import { TooltipProvider } from '@/components/ui/tooltip'

createRoot(document.getElementById('root')).render(
  // Prod Mode
  <TooltipProvider>
    <ThemeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </TooltipProvider>,

  // Dev Mode
  // <StrictMode>
  //   <TooltipProvider>
  //     <ThemeProvider>
  //       <BrowserRouter>
  //         <App />
  //       </BrowserRouter>
  //     </ThemeProvider>
  //   </TooltipProvider>
  // </StrictMode>,
)
