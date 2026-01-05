import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About1'
import ContactUs from '../components/ContactUs'
import Chatbot from '../components/Chatbot'
import About2 from '../components/About2'
const Home = () => {
  return (
    <div>
       <Hero/>
       <About/>
      <About2/>
      <ContactUs/>
      <Chatbot />
    </div>
  )
}

export default Home
