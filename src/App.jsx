import { React, useState, useEffect } from 'react'
import { GoogleGenAI } from "@google/genai";
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import SummariserPage from './pages/SummariserPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  
  return (
    <div className=''>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/summariser' element={<SummariserPage />}/>
      </Routes>
      <Footer />
    </div>
  )
}

export default App