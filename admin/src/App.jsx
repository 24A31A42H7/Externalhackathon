import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import {Route,Routes} from 'react-router-dom'
import AddStudent from './pages/AddStudent';
import ListStudent from './pages/ListStudent';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import AddListStudent from './pages/AddListStudent';
export const url='http://localhost:4000'
const App = () => {
  const [filter, setFilter] = useState(null);
  const [search,setSearch]=useState("");
  
  return (
    <div className='flex items-start min-h-screen mix-sm:flex-col'>
      <ToastContainer/>
      <Sidebar setFilter={setFilter} setSearch={setSearch}/>
        <div className='flex-3 h-screen overflow-y-scroll bg-[#F3FFF7]'>
          <Navbar onSearch={setSearch}/>
            <div className='pt-8 pl-5 flex flex-row sm:pt-12 sm:pl-12'>
                <Routes>
                    <Route path='/add-student'element={<AddStudent/>}/>
                    <Route path='/addlist-student'element={<AddListStudent/>}/>
                   <Route path='/list-student' element={<ListStudent filter={filter} search={search}/>}/>
                </Routes>


            </div>

        </div>
    </div>
  )
}

export default App
