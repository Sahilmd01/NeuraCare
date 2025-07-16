import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-green-50 py-16 px-4">
      <div className='max-w-6xl mx-auto'>
        <div className='text-center mb-16'>
          <p className='text-3xl md:text-4xl font-light text-blue-600'>
            CONTACT <span className='text-green-500 font-medium'>US</span>
          </p>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-400 to-green-400 mx-auto mt-4'></div>
        </div>
        
        <div className='flex flex-col items-center justify-center lg:flex-row gap-16'>
          <div className='relative lg:w-1/2'>
            <img 
              src={assets.contact_image} 
              alt="contact_image" 
              className='rounded-xl shadow-xl w-full max-w-lg border-4 border-white' 
            />
            <div className='absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-lg hidden md:block'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
          </div>
          
          <div className='lg:w-1/2 bg-white p-8 rounded-xl shadow-lg border border-gray-100'>
            <div className='mb-8'>
              <p className='font-semibold text-xl text-blue-600 mb-4 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Our Office
              </p>
              <p className='text-gray-600 mb-2'>54709 Willms Station</p>
              <p className='text-gray-600'>Suite 350, Washington, USA</p>
            </div>
            
            <div className='mb-8'>
              <p className='text-gray-600 mb-2 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                Tel: (415) 555‑0132
              </p>
              <p className='text-gray-600 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                Email: Codewithkinu@gmail.com
              </p>
            </div>
            
            <div>
              <p className='font-semibold text-xl text-green-500 mb-4 flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                </svg>
                Careers at NauraCare
              </p>
              <p className='text-gray-600 mb-6'>Learn more about our teams and job openings.</p>
              <button className='bg-gradient-to-r from-blue-400 to-green-400 text-white px-8 py-3 rounded-full font-medium hover:from-blue-500 hover:to-green-500 transition-all duration-300 shadow-md hover:shadow-lg'>
                Explore Jobs
              </button>
            </div>
          </div>
        </div>

        {/* Map and QR Code Section */}
        <div className='mt-20 grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Map Section */}
          <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100'>
            <h3 className='text-xl font-semibold text-blue-600 mb-4 flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Find Us on Map
            </h3>
            <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden border-2 border-white shadow-md'>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573291865!2d-73.98784468459382!3d40.74844017932799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623862340000!5m2!1sen!2sus" 
                width="100%" 
                height="300" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>

          {/* QR Code Section */}
          <div className='bg-white p-6 rounded-xl shadow-lg border border-gray-100 flex flex-col items-center justify-center'>
            <h3 className='text-xl font-semibold text-green-500 mb-4 flex items-center'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
              Hire Here!
            </h3>
            <div className='bg-white p-4 rounded-lg border-2 border-blue-100 shadow-inner mb-4'>
              {/* Replace with your QR code image from public folder */}
              <img 
                src="/qr-code.png" 
                alt="QR Code" 
                className='w-48 h-48 object-contain'
              />
            </div>
            <p className='text-gray-600 text-center'>Scan this QR code to contact Developer</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact