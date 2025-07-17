import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const Appointment = () => {
    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [isLoading, setIsLoading] = useState(true)

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
        setIsLoading(false)
    }

    const getAvailableSolts = async () => {
        setDocSlots([])
        let today = new Date()

        for (let i = 0; i < 7; i++) {
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    const bookAppointment = async () => {
        if (!token) {
            toast.warning('Please login to book an appointment')
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        try {
            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                toast.success(data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white">
                <div className="animate-pulse flex flex-col items-center">
                    <div className="w-32 h-32 bg-blue-200 rounded-full mb-4"></div>
                    <div className="h-6 bg-blue-200 rounded w-64 mb-2"></div>
                    <div className="h-4 bg-blue-200 rounded w-48"></div>
                </div>
            </div>
        )
    }

    return docInfo ? (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
        >
            {/* Background decorations */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-10"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-100 rounded-full filter blur-3xl opacity-10"></div>
            </div>

            {/* Doctor Details Section */}
            <div className="relative z-10 flex flex-col lg:flex-row gap-8 mb-16">
                {/* Doctor Image */}
                <motion.div 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="lg:w-1/3"
                >
                    <div className="relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-md transition-all duration-300"></div>
                        <img 
                            className="w-full h-auto rounded-2xl shadow-xl border-4 border-white transform group-hover:-translate-y-1 transition-transform duration-300" 
                            src={docInfo.image} 
                            alt={docInfo.name} 
                        />
                        <div className="absolute -bottom-4 -right-4 bg-white rounded-full p-2 shadow-lg">
                            <img className="w-8 h-8" src={assets.verified_icon} alt="Verified" />
                        </div>
                    </div>
                </motion.div>

                {/* Doctor Info */}
                <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="lg:w-2/3 bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
                >
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center justify-between">
                            <h1 className="text-3xl font-bold text-gray-800">
                                {docInfo.name}
                                <span className="ml-2 inline-block align-middle">
                                    <img className="w-5 h-5" src={assets.verified_icon} alt="Verified" />
                                </span>
                            </h1>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                                {docInfo.experience} years experience
                            </span>
                        </div>

                        <p className="text-xl text-blue-600 font-medium">
                            {docInfo.degree} - {docInfo.speciality}
                        </p>

                        <div className="py-4 border-t border-b border-gray-100">
                            <h3 className="flex items-center text-lg font-semibold text-gray-700 mb-2">
                                <img className="w-5 h-5 mr-2" src={assets.info_icon} alt="About" />
                                About Doctor
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {docInfo.about}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Consultation Fee</p>
                                <p className="text-2xl font-bold text-blue-600">
                                    {currencySymbol}{docInfo.fees}
                                </p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex items-center text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <svg key={star} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <span className="text-gray-500 text-sm">(245 reviews)</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Booking Section */}
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 mb-16"
            >
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Appointment</h2>
                
                {/* Date Selection */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Select Date</h3>
                    <div className="flex space-x-4 overflow-x-auto pb-4">
                        {docSlots.length > 0 && docSlots.map((item, index) => (
                            <motion.div 
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSlotIndex(index)}
                                className={`flex flex-col items-center justify-center min-w-20 p-4 rounded-xl cursor-pointer transition-all ${slotIndex === index ? 'bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
                            >
                                <span className="font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</span>
                                <span className="text-2xl font-bold">{item[0] && item[0].datetime.getDate()}</span>
                                <span className="text-xs opacity-80">{item[0] && item[0].datetime.toLocaleString('default', { month: 'short' })}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Time Slot Selection */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Time Slots</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => setSlotTime(item.time)}
                                className={`p-3 rounded-lg text-center cursor-pointer transition-all ${item.time === slotTime ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'}`}
                            >
                                {item.time.toLowerCase()}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Book Button */}
                <div className="flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={bookAppointment}
                        disabled={!slotTime}
                        className={`px-12 py-4 rounded-full text-lg font-medium shadow-lg transition-all ${slotTime ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-xl' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    >
                        Confirm Appointment
                        <svg className="w-5 h-5 ml-2 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.button>
                </div>
            </motion.div>

            {/* Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </motion.div>
    ) : null
}

export default Appointment