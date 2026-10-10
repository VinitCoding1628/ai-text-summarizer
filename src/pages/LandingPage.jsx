import React from 'react'
import PatternWaves from '../components/Bg.jsx'
import { HiOutlineLightningBolt } from "react-icons/hi";
import { GiPlainCircle } from "react-icons/gi";
import { ShimmerButton } from '@/components/ui/shimmer-button.jsx';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';

const LandingPage = () => {
    const navigate = useNavigate();
    const { theme } = useTheme();
    // Function to navigate
    const navigateToSummariser = () => {
        navigate('/summariser')
    }
    return (
        <div>
            {/* Hero Section */}
            <section className="relative flex min-h-[calc(100vh-14.5rem)] items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <PatternWaves
                        preset="silk"
                        color="#9D93FF"
                        backgroundColor={theme === 'dark' ? '#111827' : '#ffffff'}
                        fade="edges"
                        interactive={false}
                        pattern="glyph"
                        wave="silk"
                        spacing={9}
                        markSize={0.95}
                        depth={0.95}
                        light={0}
                        shine={0.8}
                        contrast={1.2}
                        speed={0.65}
                        scale={1}
                        direction={20}
                        opacity={1}
                        fadeSize={0.3}
                        characters=".:-=+*#%@"
                        intro
                        paused={false}
                    />
                </div>

                <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
                    <p className='jetbrains-mono bg-background text-primary px-4 py-2 rounded-full shadow shadow-primary text-sm flex justify-center items-center gap-2'><GiPlainCircle className='text-primary animate-ping transition-all duration-300 ease-in-out text-[10px]' /> ⚡ POWERED BY GOOGLE GEMINI • FAST & FREE</p>
                    <h1 className="max-w-4xl text-6xl font-semibold tracking-tight leading-tight">
                        Summarize Long Articles and Text <span className='text-primary'>Instantly</span>
                    </h1>
                    <p className='max-w-4xl text-lg text-muted-foreground'>Paste your text, articles, or notes and get instant, clear bullet-point summaries. No complicated setup, completely free to start.</p>
                    <ShimmerButton onClick={navigateToSummariser}><HiOutlineLightningBolt /> Start Summarizing Now</ShimmerButton>
                </div>
            </section>

            {/* Feature Section */}
            <section className='bg-feature rounded-lg p-4'>
                <div className='flex flex-col gap-4'>
                    <p className='jetbrains-mono text-lg rounded-md text-primary w-fit '>FEATURES</p>
                    <h1 className='text-3xl font-semibold'>Simple, Accurate Summaries in Seconds</h1>
                    <p className='max-w-3xl text-muted-foreground'>Built with the Google Gemini API to make reading and digesting long articles, essays, and notes quick and
                        effortless.</p>
                </div>
                <div></div>
            </section>
        </div>
    )
}

export default LandingPage