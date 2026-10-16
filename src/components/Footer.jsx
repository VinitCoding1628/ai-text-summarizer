import React from 'react'
import logo from '../assets/images/icon.svg'

const Footer = () => {
    return (
        <div className='flex-col sm:flex-col md:flex-row lg:flex-row flex justify-between lg:items-center md:items-center sm:items-start items-start gap-3 bg-background py-6 px-4'>
            <div className='flex justify-start items-center gap-2'>
                <img src={logo} alt="logo" />
                <h2 className='text-2xl font-semibold'>Summarizo</h2>
            </div>
            <div>
                <p className='text-muted-foreground text-balance'>© 2025 Summarizo. Powered by Google Gemini. Developed by <span className='text-primary hover:underline transition-all duration-150 ease-in-out'><a href="https://www.artfolio.tech/vinitgite" target='_blank'>Vinit Gite</a></span></p>
            </div>
        </div>
    )
}

export default Footer