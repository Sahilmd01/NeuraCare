import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import axios from 'axios'

const MyProfile = () => {
  const {userData,setUserData,backendUrl,token,getUserProfileData} = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)
  const [image,setImage] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const updateUserProfileData = async () => {
      setIsLoading(true)
      try {
         const formData = new FormData()
          formData.append("name",userData.name)
          formData.append("email",userData.email)
          formData.append("phone",userData.phone)
          formData.append("address",JSON.stringify(userData.address))
          formData.append("dob",userData.dob)
          formData.append("gender",userData.gender)

          image && formData.append("image",image)

          const {data} = await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})
          if(data.success){
            toast.success("Profile updated successfully!", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
              style: { backgroundColor: '#1e3a8a', color: '#fff' }
            })

            await getUserProfileData()
            setIsEdit(false)
            setImage(false)

          }else{
            toast.error(data.message || "Could not update profile. Please try again.", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            })
          }
      } catch (error) {
        toast.error("An unexpected error occurred while updating your profile.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        })
      } finally {
        setIsLoading(false)
      }
  }

  return userData && (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex justify-center items-center px-4 py-8'>
      <div className='w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl flex flex-col gap-6 text-sm transition-all duration-300 hover:shadow-2xl'>
        {/* Profile Header */}
        <div className='flex flex-col items-center gap-4 relative'>
          <div className='absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md'>
            WELCOME
          </div>
          
          {/* Profile Image */}
          {isEdit ? (
            <label htmlFor="image" className='group relative cursor-pointer'>
              <div className='w-36 h-36 rounded-full border-4 border-blue-800 overflow-hidden transition-all duration-300 group-hover:border-yellow-500'>
                <img 
                  src={image ? URL.createObjectURL(image) : userData.image} 
                  alt="profile" 
                  className='w-full h-full object-cover opacity-90 group-hover:opacity-70 transition-opacity duration-300'
                />
              </div>
              <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='bg-blue-800 bg-opacity-70 rounded-full p-2'>
                  <img src={assets.upload_icon} alt="upload" className='w-8 h-8 filter invert'/>
                </div>
              </div>
              <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden accept="image/*"/>
            </label>
          ) : (
            <div className='w-36 h-36 rounded-full border-4 border-blue-800 overflow-hidden shadow-lg'>
              <img src={userData.image} alt="profile" className='w-full h-full object-cover' />
            </div>
          )}

          {/* Name */}
          {isEdit ? (
            <input
              className="text-center text-2xl font-bold bg-blue-50 rounded-lg px-4 py-2 border border-blue-200 w-full max-w-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              type="text"
              onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
              value={userData.name}
            />
          ) : (
            <h1 className='text-3xl font-bold text-blue-900'>{userData.name}</h1>
          )}
        </div>

        <hr className='border-t border-blue-200 my-2' />

        {/* Contact Info Section */}
        <div className='space-y-4'>
          <h2 className='text-lg font-semibold text-blue-800 flex items-center'>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
            </svg>
            Contact Information
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-[120px_1fr] gap-y-4 gap-x-6'>
            {/* Email */}
            <div className='flex items-center text-blue-700 font-medium'>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
              Email:
            </div>
            {isEdit ? (
              <input
                className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="email"
                onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                value={userData.email}
              />
            ) : <p className='text-gray-800'>{userData.email}</p>}

            {/* Phone */}
            <div className='flex items-center text-blue-700 font-medium'>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              Phone:
            </div>
            {isEdit ? (
              <input
                className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                type="tel"
                onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                value={userData.phone}
              />
            ) : <p className='text-gray-800'>{userData.phone}</p>}

            {/* Address */}
            <div className='flex items-start text-blue-700 font-medium'>
              <svg className="w-4 h-4 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              Address:
            </div>
            {isEdit ? (
              <div className='space-y-2'>
                <input
                  type="text"
                  className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Address Line 1"
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value }
                  }))}
                  value={userData.address.line1}
                />
                <input
                  type="text"
                  className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Address Line 2"
                  onChange={(e) => setUserData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value }
                  }))}
                  value={userData.address.line2}
                />
              </div>
            ) : (
              <div>
                <p className='text-gray-800'>{userData.address.line1}</p>
                <p className='text-gray-800'>{userData.address.line2}</p>
              </div>
            )}
          </div>
        </div>

        <hr className='border-t border-blue-200 my-2' />

        {/* More Details Section */}
        <div className='space-y-4'>
          <h2 className='text-lg font-semibold text-blue-800 flex items-center'>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            Personal Details
          </h2>

          <div className='grid grid-cols-1 md:grid-cols-[120px_1fr] gap-y-4 gap-x-6'>
            {/* Gender */}
            <div className='flex items-center text-blue-700 font-medium'>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
              </svg>
              Gender:
            </div>
            {isEdit ? (
              <select
                className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                value={userData.gender}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            ) : <p className='text-gray-800'>{userData.gender}</p>}

            {/* Birthday */}
            <div className='flex items-center text-blue-700 font-medium'>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Birthday:
            </div>
            {isEdit ? (
              <input
                type="date"
                className="bg-blue-50 border border-blue-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                value={userData.dob}
              />
            ) : <p className='text-gray-800'>{userData.dob}</p>}
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-6 flex justify-end space-x-4'>
          {isEdit ? (
            <>
              <button 
                className={`px-6 py-2 rounded-lg border border-blue-800 text-blue-800 font-medium hover:bg-blue-50 transition-colors ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={() => {
                  setIsEdit(false)
                  setImage(false)
                }}
                disabled={isLoading}
              >
                Cancel
              </button>
              <button 
                className={`px-6 py-2 rounded-lg bg-gradient-to-r from-blue-800 to-blue-600 text-white font-medium hover:from-blue-700 hover:to-blue-500 shadow-md hover:shadow-lg transition-all flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={updateUserProfileData}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : 'Save Changes'}
              </button>
            </>
          ) : (
            <button 
              className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-800 to-blue-600 text-white font-medium hover:from-blue-700 hover:to-blue-500 shadow-md hover:shadow-lg transition-all flex items-center"
              onClick={() => setIsEdit(true)}
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyProfile
