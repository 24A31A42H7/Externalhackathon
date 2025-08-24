import React from 'react'
import TitleCords from './TitleCords'
import assets from '../assets/asserts'
import toast from 'react-hot-toast'

const ContactUs = () => {
  const onSubmit=async(event)=>{
    event.preventDefault();
    
    const formData = new FormData(event.target);

    formData.append("access_key", "a8b92d0d-1d6e-4329-a96f-763011bafb21");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      toast.success('Thank you for your submission!')
      event.target.reset();
    } else {
      toast.error(data.message)
    }
      
    } catch (error) {
      toast.error(error.message)
      
    }

    
  }
  return (
    <div id='contact-us' className='flex flex-col items-center gap-7 px-4 bg-gray-100 py-12 sm:px-12 lg:px-24 xl:px-40 pt-10 text-black-700 '>
      <TitleCords heading="Reach Out to Us" description="Have questions about this project or want to know more about how student performance is predicted?
Feel free to reach out to us for feedback, collaboration, or guidance.
We value your thoughts and are happy to connect with students, teachers, and recruiters"/>
      <form onSubmit={onSubmit} className='grid sm:grid-cols-2 gap-3 sm:gap-5 max-w-2xl w-full' >
        <div>
          <p className='mb-2 text-sm font-medium'> Your Name</p>
          <div className='flex pl-3 rounded-lg border border-gray-700'>
            <img src={assets.user_icon} alt="" className='w-8 h-8 mt-2'/>
            <input type="text" name="name" placeholder='Enter your name' className='w-full p-3 text-sm outline-none text-black-600' required/>
          </div>
        </div>
        <div>
          <p className='mb-2 text-sm font-medium'>Email id</p>
          <div className='flex pl-3 rounded-lg border border-gray-700'>
            <img src={assets.user_mail} alt="" className='w-8 h-8 mt-2'/>
            <input type="text" name="email" placeholder='Enter your email' className='w-full p-3 text-sm outline-none' required/>
          </div>
        </div>
        <div className='sm:col-span-2'>
          <p className='mb-2 text-sm font-medium'>Message</p>
          <textarea name="message" rows={8} placeholder='Enter your message' className='w-full p-3 text-sm outline-none rounded-lg border border-gray-300 'required/>
        </div>
        <button type="submit" className='w-max flex gap-2 bg-blue-500 text-white text-sm px-10 py-3 rounded-full cursor-pointer hover:scale-103 transition-all'>
          Submit
        </button>

      </form>
    </div>
  )
}

export default ContactUs
