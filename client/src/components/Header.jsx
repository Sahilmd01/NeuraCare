import React, { useState } from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  const [hoverState, setHoverState] = useState(false);

  return (
    <div className='relative flex flex-col lg:flex-row bg-gradient-to-br from-[#001529] to-[#0c2135] rounded-2xl px-8 md:px-16 lg:px-28 overflow-hidden border border-[#1a3a5a] shadow-2xl'>

      {/* Background Decorative Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#0a2d4a] rounded-full filter blur-[100px] opacity-20'></div>
        <div className='absolute -bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#1a4a7a] rounded-full filter blur-[100px] opacity-20'></div>
        <svg className='absolute top-1/4 left-1/4 opacity-5 w-48 h-48 text-blue-300' viewBox='0 0 24 24' fill='none' stroke='currentColor'>
          <path d='M12 3C16 3 19 6 19 10C19 14 16 17 12 17C8 17 5 14 5 10C5 6 8 3 12 3Z' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
          <path d='M12 21C8 21 5 18 5 14C5 10 8 7 12 7C16 7 19 10 19 14C19 18 16 21 12 21Z' strokeWidth='1.5' strokeLinecap='round' strokeLinejoin='round' />
        </svg>
      </div>

      {/* Left Side Content */}
      <div className='lg:w-1/2 flex flex-col items-start justify-center gap-8 py-16 lg:py-24 z-10'>

        {/* Heading */}
        <div className='relative'>
          <div className='absolute -left-8 -top-4 w-4 h-4 bg-cyan-400 rounded-full animate-pulse'></div>
          <h1 className='text-4xl md:text-5xl lg:text-[3.5rem] text-white font-bold leading-tight tracking-tight'>
            Exceptional Care <br />
            <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400'>
              For Discerning Patients
            </span>
          </h1>
        </div>

        {/* Description */}
        <p className='text-blue-100/80 text-lg max-w-lg leading-relaxed'>
          Our concierge medical team provides white-glove service with
          <span className='font-medium text-white'> same-day appointments</span> and
          <span className='font-medium text-white'> 24/7 specialist access</span>.
        </p>

        {/* Buttons */}
        <div className='flex flex-col sm:flex-row gap-5 w-full mt-2'>
          <a
            href="#speciality"
            onMouseEnter={() => setHoverState(true)}
            onMouseLeave={() => setHoverState(false)}
            className='group relative overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 rounded-full flex items-center justify-center gap-3 px-8 py-4 text-white font-medium text-base transition-all duration-500 hover:shadow-2xl'
          >
            <span className='relative z-10 flex items-center gap-2'>
              Schedule Consultation
              <svg className={`w-4 h-4 transition-transform duration-300 ${hoverState ? 'translate-x-1' : ''}`} viewBox='0 0 24 24' fill='none' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M14 5l7 7m0 0l-7 7m7-7H3' />
              </svg>
            </span>
            <span className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500'></span>
          </a>

          <button className='relative overflow-hidden border-2 border-blue-400/30 hover:border-blue-300 rounded-full flex items-center justify-center gap-3 px-7 py-3.5 text-white font-medium text-base transition-all duration-300 hover:shadow-lg group'>
            <a
              href="https://sahilfullstackportfolio.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className='relative z-10 flex items-center gap-2'
            >
              <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 text-cyan-300' viewBox='0 0 20 20' fill='currentColor'>
                <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z' clipRule='evenodd' />
              </svg>
              My Portfolio
            </a>
            <span className='absolute inset-0 bg-blue-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></span>
          </button>
        </div>

        {/* Stats */}
        <div className='flex flex-wrap items-center gap-6 mt-6'>
          {/* VIP Members */}
          <div className='flex items-center gap-3'>
            <div className='flex -space-x-3'>
              {[1, 2, 3].map((item) => (
                <div key={item} className='w-9 h-9 rounded-full bg-white/90 border-2 border-blue-800 shadow-sm'></div>
              ))}
              <div className='w-9 h-9 rounded-full bg-blue-800/80 border-2 border-blue-700 shadow-sm flex items-center justify-center text-white text-xs font-bold'>
                +27
              </div>
            </div>
            <p className='text-blue-100/80 text-sm'>
              <span className='font-medium text-white'>VIP Members</span>
            </p>
          </div>

          {/* Rating */}
          <div className='flex items-center gap-3'>
            <div className='relative'>
              <svg className='w-8 h-8 text-amber-400' viewBox='0 0 24 24' fill='currentColor'>
                <path d='M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z' />
              </svg>
              <div className='absolute -bottom-1 -right-1 bg-blue-600 rounded-full w-5 h-5 flex items-center justify-center text-white text-xs font-bold border-2 border-[#0c2135]'>
                5.0
              </div>
            </div>
            <p className='text-blue-100/80 text-sm'>
              <span className='font-medium text-white'>Patient Rating</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side (Image + Floating Cards) */}
      <div className='lg:w-1/2 relative hidden lg:flex items-end justify-end'>
        <div className='relative w-full h-full min-h-[500px]'>
          <img
            src={assets.header_img}
            alt="doctor with patient"
            className='absolute bottom-0 right-0 z-10 w-full max-w-xl h-auto object-contain rounded-tl-[100px] rounded-br-2xl transform translate-y-8 border border-blue-900/30 shadow-2xl'
          />

          {/* Floating Certification Badge */}
          <div className='absolute top-16 right-0 bg-white/95 backdrop-blur-sm rounded-xl shadow-2xl p-5 w-56 z-20 border border-gray-100/20'>
            <div className='flex items-start gap-4'>
              <div className='bg-blue-100/80 p-2.5 rounded-lg flex-shrink-0'>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6 text-blue-600' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' />
                </svg>
              </div>
              <div>
                <p className='text-xs text-gray-500 font-medium uppercase tracking-wider'>Certified</p>
                <p className='font-bold text-blue-900 text-lg'>JCI Accredited</p>
                <p className='text-gray-500 text-xs mt-1'>Gold Standard in Healthcare</p>
              </div>
            </div>
          </div>

          {/* Appointment Info Card */}
          <div className='absolute bottom-16 left-0 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-2xl p-5 w-64 z-20'>
            <div className='text-white'>
              <p className='text-sm font-medium opacity-90'>Next Available</p>
              <p className='text-2xl font-bold mt-1'>Today</p>
              <p className='text-sm opacity-90 mt-2'>Emergency cases prioritized</p>
              <div className='w-full bg-white/30 h-px my-3'></div>
              <p className='text-xs flex items-center gap-1'>
                <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                24/7 Availability
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Badge – bottom left corner (only on large screens) */}
      <div className='hidden lg:block absolute bottom-5 right-5 bg-white p-3 rounded-xl shadow-lg border border-gray-100 z-30'>
        <h3 className='text-sm font-semibold text-green-500 mb-2 flex items-center'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
          </svg>
          Hire Me Here
        </h3>
        <img
          src="/qr-code.png"
          alt="QR Code"
          className='w-24 h-24 object-contain mx-auto mb-1'
        />
        <p className='text-xs text-gray-600 text-center'>Scan to contact</p>
      </div>
    </div>
  );
};

export default Header;
