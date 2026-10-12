import React from 'react'
import PatternWaves from '../components/Bg.jsx'
import { HiOutlineLightningBolt } from "react-icons/hi";
import { GiPlainCircle } from "react-icons/gi";
import { ShimmerButton } from '@/components/ui/shimmer-button.jsx';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/useTheme';
import { Zap, Copy, List, KeyRound, ShieldCheck } from 'lucide-react'

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
            <section className="bg-feature rounded-lg p-4 md:p-8 mb-6">
                <div className="mb-8 flex max-w-3xl flex-col gap-4">
                    <p className="jetbrains-mono w-fit text-lg text-primary">FEATURES</p>
                    <h2 className="text-3xl font-semibold">Simple, Accurate Summaries in Seconds</h2>
                    <p className="text-muted-foreground">
                        Built with the Google Gemini API to make reading and digesting long articles, essays, and notes quick and effortless.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Wide card */}
                    <article className="flex flex-col gap-6 rounded-3xl bg-background p-6 shadow-sm lg:col-span-2">
                        <div className="flex items-start justify-between">
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-feature text-primary">
                                <Zap size={22} />
                            </span>
                            <span className="rounded-full bg-feature px-3 py-1 text-xs font-medium tracking-wide text-primary">
                                REAL-TIME FLASH STREAM
                            </span>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-2xl font-semibold">Fast Gemini AI Processing</h3>
                            <p className="max-w-xl text-muted-foreground">
                                Google&apos;s Gemini Flash model delivers crisp, concise summaries in seconds without long wait times, streaming tokens directly as they are generated.
                            </p>
                        </div>
                        <div className="mt-auto flex items-center justify-between rounded-2xl bg-feature px-5 py-4">
                            <div>
                                <p className="text-4xl font-semibold text-primary">&lt; 2s</p>
                                <p className="text-sm font-medium">Average Latency</p>
                                <p className="text-sm text-muted-foreground">Gemini 1.5 Flash endpoint</p>
                            </div>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-600">
                                99.9% High Availability
                            </span>
                        </div>
                    </article>
                    {/* Narrow card */}
                    <article className="flex flex-col gap-4 rounded-3xl bg-background p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-feature text-primary">
                                <Copy size={22} />
                            </span>
                            <span className="rounded-full bg-feature px-3 py-1 text-xs font-medium text-primary">
                                INSTANT EXPORT
                            </span>
                        </div>
                        <h3 className="text-5xl font-semibold text-primary">1-Click</h3>
                        <h4 className="text-xl font-semibold">Markdown & Text Export</h4>
                        <p className="text-muted-foreground">
                            Instantly copy, export, or download your distilled summaries formatted in clean Markdown, bullet points, or executive briefings with a single click.
                        </p>
                    </article>

                    <article className="flex flex-col gap-4 rounded-3xl bg-background p-6 shadow-sm">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-feature text-primary">
                            <List size={22} />
                        </span>
                        <h3 className="text-xl font-semibold">Structured Key Takeaways</h3>
                        <p className="text-muted-foreground">
                            Converts dense paragraphs into clear, bulleted takeaways and executive summaries you can skim immediately.
                        </p>
                        <ul className="mt-auto space-y-2 rounded-2xl bg-feature p-4 text-sm">
                            <li className="text-primary">Executive summary preview</li>
                            <li className="text-violet-500">Actionable highlight bullets</li>
                            <li className="text-emerald-600">Instant export & copy controls</li>
                        </ul>
                    </article>
                    <article className="flex flex-col gap-4 rounded-3xl bg-background p-6 shadow-sm">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                            <KeyRound size={22} />
                        </span>
                        <h3 className="text-xl font-semibold">Use Your Own Free API Key</h3>
                        <p className="text-muted-foreground">
                            Get 5 free summaries to start, then easily connect your free Google AI Studio key for unlimited personal use.
                        </p>
                        <div className="mt-auto flex items-center justify-between rounded-2xl bg-feature px-4 py-3 text-sm">
                            <span className="font-mono">AIzaSy••••••••••</span>
                            <span className="font-medium text-primary">READY TO USE</span>
                        </div>
                    </article>
                    <article className="flex flex-col gap-4 rounded-3xl bg-background p-6 shadow-sm">
                        <div className="flex items-start justify-between">
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                                <ShieldCheck size={22} />
                            </span>
                            <span className="rounded-full bg-feature px-3 py-1 text-xs font-medium text-primary">
                                ENTERPRISE SECURITY
                            </span>
                        </div>
                        <h3 className="text-5xl font-semibold text-emerald-600">100%</h3>
                        <h4 className="text-xl font-semibold">Client-Side Privacy</h4>
                        <p className="text-muted-foreground">
                            Your text and summaries are processed entirely in session memory. Zero logs, zero data training, and complete enterprise confidentiality.
                        </p>
                        <p className="mt-auto border-t pt-4 text-sm text-emerald-600">No training on user data</p>
                    </article>
                </div>
            </section>
        </div>
    )
}

export default LandingPage