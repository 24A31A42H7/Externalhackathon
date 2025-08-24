import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import ContactUs from './components/ContactUs'
import {Toaster}from 'react-hot-toast'
import Footer from './components/Footer'
import Predictions from './components/Predictions'
import Pec from './components/Pec'

const App = () => {
  return (
    <div className='relative'>
      <Toaster/>
      <Pec/>
      <Navbar/>
      <Hero/>
      <Predictions/>
      <About/>
      <ContactUs/>
      <Footer/>
    </div>
  )
}

export default App
