import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import MyAppointment from './pages/MyAppointment'
import MyProfile from './pages/MyProfile'
import Doctors from './pages/Doctors'
import Appointment from './pages/Appointment'
import Services from './pages/Services' // Import the new Services component
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Navbar />
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className='min-h-screen flex flex-col'>
        <main className='flex-grow mx-[5%] md:mx-[5%] py-4'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/login' element={<Login />} />
            <Route path='/my-appointment' element={<MyAppointment />} />
            <Route path='/appointment/:docId' element={<Appointment />} />
            <Route path='/my-profile' element={<MyProfile />} />
            <Route path='/doctors' element={<Doctors />} />
            <Route path='/doctors/:speciality' element={<Doctors />} />
            <Route path='/services' element={<Services />} /> {/* New Services route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App