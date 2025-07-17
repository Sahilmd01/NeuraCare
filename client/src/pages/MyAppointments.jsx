import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiCheckCircle, FiXCircle, FiDollarSign, FiChevronDown } from 'react-icons/fi';

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext);
    const navigate = useNavigate();

    const [appointments, setAppointments] = useState([]);
    const [payment, setPayment] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [expandedAppointment, setExpandedAppointment] = useState(null);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_');
        return `${dateArray[0]} ${months[Number(dateArray[1]) - 1]} ${dateArray[2]}`;
    };

    const getUserAppointments = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.get(`${backendUrl}/api/user/appointments`, { headers: { token } });
            setAppointments(data.appointments.reverse());
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/cancel-appointment`,
                { appointmentId },
                { headers: { token } }
            );

            if (data.success) {
                toast.success(data.message);
                getUserAppointments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(
                        `${backendUrl}/api/user/verifyRazorpay`,
                        response,
                        { headers: { token } }
                    );
                    if (data.success) {
                        navigate('/my-appointments');
                        getUserAppointments();
                    }
                } catch (error) {
                    console.error(error);
                    toast.error(error.message);
                }
            },
            theme: {
                color: '#4f46e5'
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/payment-razorpay`,
                { appointmentId },
                { headers: { token } }
            );
            if (data.success) {
                initPay(data.order);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(
                `${backendUrl}/api/user/payment-stripe`,
                { appointmentId },
                { headers: { token } }
            );
            if (data.success) {
                const { session_url } = data;
                window.location.replace(session_url);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserAppointments();
        }
    }, [token]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center">
                    <div className="relative w-24 h-24 mx-auto mb-6">
                        <div className="absolute inset-0 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        <div className="absolute inset-4 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin animation-delay-200"></div>
                    </div>
                    <h3 className="text-xl font-medium text-gray-700">Loading your appointments</h3>
                    <p className="text-gray-500 mt-2">We're fetching your medical history</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
            {/* Decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full filter blur-[100px] opacity-10"></div>
                <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-100 rounded-full filter blur-[120px] opacity-10"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-3">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                            My Appointments
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Manage your upcoming consultations and view past medical visits
                    </p>
                </motion.div>

                {appointments.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden max-w-md mx-auto"
                    >
                        <div className="p-8 text-center">
                            <div className="w-48 h-48 mx-auto mb-6">
                                <img src={assets.empty_appointments} alt="No appointments" className="w-full h-full object-contain" />
                            </div>
                            <h3 className="text-xl font-medium text-gray-800 mb-2">No appointments scheduled</h3>
                            <p className="text-gray-500 mb-6">You haven't booked any medical consultations yet</p>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => navigate('/doctors')}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all"
                            >
                                Find a Specialist
                                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </motion.button>
                        </div>
                    </motion.div>
                ) : (
                    <div className="space-y-6">
                        {appointments.map((item, index) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transition-all hover:shadow-xl"
                            >
                                <div 
                                    className="p-6 cursor-pointer"
                                    onClick={() => setExpandedAppointment(expandedAppointment === index ? null : index)}
                                >
                                    <div className="flex items-start">
                                        {/* Doctor Avatar */}
                                        <div className="relative flex-shrink-0 mr-6">
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-2 border-white shadow-md">
                                                <img 
                                                    src={item.docData.image} 
                                                    alt={item.docData.name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent via-blue-500/10"></div>
                                            </div>
                                            {item.isCompleted && (
                                                <div className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center shadow-sm">
                                                    <FiCheckCircle className="mr-1" size={12} />
                                                    Completed
                                                </div>
                                            )}
                                            {item.cancelled && (
                                                <div className="absolute -top-2 -right-2 bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center shadow-sm">
                                                    <FiXCircle className="mr-1" size={12} />
                                                    Cancelled
                                                </div>
                                            )}
                                        </div>

                                        {/* Appointment Info */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h3 className="text-xl font-bold text-gray-800">{item.docData.name}</h3>
                                                    <p className="text-blue-600 font-medium">{item.docData.speciality}</p>
                                                </div>
                                                {item.payment && !item.cancelled && (
                                                    <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                                                        <FiDollarSign className="mr-1" size={14} />
                                                        Paid
                                                    </div>
                                                )}
                                            </div>

                                            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                                <div className="flex items-center text-gray-600">
                                                    <FiCalendar className="mr-2 text-blue-500" size={18} />
                                                    <span>{slotDateFormat(item.slotDate)}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <FiClock className="mr-2 text-cyan-500" size={18} />
                                                    <span>{item.slotTime}</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <FiMapPin className="mr-2 text-purple-500" size={18} />
                                                    <span>{item.docData.address.line1}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="ml-4 flex-shrink-0">
                                            <motion.div
                                                animate={{ rotate: expandedAppointment === index ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FiChevronDown className="text-gray-400" size={20} />
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {expandedAppointment === index && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-6 pb-6"
                                        >
                                            <div className="border-t border-gray-100 pt-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                                            Clinic Information
                                                        </h4>
                                                        <p className="text-gray-700 mb-2">
                                                            <span className="font-medium">Address:</span> {item.docData.address.line1}, {item.docData.address.line2}
                                                        </p>
                                                        <p className="text-gray-700">
                                                            <span className="font-medium">Contact:</span> {item.docData.contact || 'Not provided'}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
                                                            Appointment Details
                                                        </h4>
                                                        <p className="text-gray-700 mb-2">
                                                            <span className="font-medium">Status:</span> {item.isCompleted ? 'Completed' : item.cancelled ? 'Cancelled' : 'Upcoming'}
                                                        </p>
                                                        <p className="text-gray-700">
                                                            <span className="font-medium">Payment:</span> {item.payment ? 'Completed' : 'Pending'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="mt-6 flex flex-wrap gap-3">
                                                    {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.03 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            onClick={() => setPayment(item._id)}
                                                            className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all"
                                                        >
                                                            Pay Consultation Fee
                                                        </motion.button>
                                                    )}

                                                    {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                                        <div className="flex flex-wrap gap-3">
                                                            <motion.button
                                                                whileHover={{ scale: 1.03 }}
                                                                whileTap={{ scale: 0.97 }}
                                                                onClick={() => appointmentStripe(item._id)}
                                                                className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center"
                                                            >
                                                                <img 
                                                                    src={assets.stripe_logo} 
                                                                    alt="Stripe" 
                                                                    className="h-5"
                                                                />
                                                                <span className="ml-2 text-gray-700">Pay with Stripe</span>
                                                            </motion.button>
                                                            <motion.button
                                                                whileHover={{ scale: 1.03 }}
                                                                whileTap={{ scale: 0.97 }}
                                                                onClick={() => appointmentRazorpay(item._id)}
                                                                className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors flex items-center"
                                                            >
                                                                <img 
                                                                    src={assets.razorpay_logo} 
                                                                    alt="Razorpay" 
                                                                    className="h-5"
                                                                />
                                                                <span className="ml-2 text-gray-700">Pay with Razorpay</span>
                                                            </motion.button>
                                                        </div>
                                                    )}

                                                    {!item.cancelled && !item.isCompleted && (
                                                        <motion.button
                                                            whileHover={{ scale: 1.03 }}
                                                            whileTap={{ scale: 0.97 }}
                                                            onClick={() => cancelAppointment(item._id)}
                                                            className="px-5 py-2.5 bg-white border border-red-500 text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                                        >
                                                            Cancel Appointment
                                                        </motion.button>
                                                    )}

                                                    {item.isCompleted && (
                                                        <button className="px-5 py-2.5 bg-white border border-green-500 text-green-500 rounded-lg cursor-default">
                                                            Consultation Completed
                                                        </button>
                                                    )}

                                                    {item.cancelled && (
                                                        <button className="px-5 py-2.5 bg-white border border-gray-300 text-gray-500 rounded-lg cursor-default">
                                                            Appointment Cancelled
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyAppointments;