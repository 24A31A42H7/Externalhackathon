import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Route,Routes} from 'react-router-dom'
import AddStudent from './pages/AddStudent';
import ListStudent from './pages/ListStudent';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
export const url='http://localhost:4000'
const App = () => {
  const [filter, setFilter] = useState(null);
  return (
    <div className='flex items-start min-h-screen'>
      <ToastContainer/>
      <Sidebar setFilter={setFilter} />
        <div className='flex-1 h-screen overflow-y-scroll bg-[#F3FFF7]'>
          <Navbar/>
            <div className='pt-8 pl-5 sm:pt-12 sm:pl-12'>
                <Routes>
                    <Route path='/add-student'element={<AddStudent/>}/>
                   <Route path='/list-student' element={<ListStudent filter={filter}/>}/>
                </Routes>


            </div>

        </div>
    </div>
  )
}

export default App
