import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const RelatedDoctors = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc._id !== docId && doc.speciality === speciality);
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        relDoc.length > 0 && (
            <section className="py-16 bg-gradient-to-b from-white to-blue-50">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                                Related Specialists
                            </span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Other {speciality} specialists you might consider
                        </p>
                    </motion.div>

                    {/* Doctors Grid */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                    >
                        {relDoc.slice(0, 4).map((doctor) => (
                            <motion.div
                                key={doctor._id}
                                variants={itemVariants}
                                whileHover={{ y: -5 }}
                                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer"
                                onClick={() => {
                                    navigate(`/appointment/${doctor._id}`);
                                    window.scrollTo(0, 0);
                                }}
                            >
                                {/* Doctor Image */}
                                <div className="relative h-60 bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center p-4">
                                    <img
                                        src={doctor.image}
                                        alt={doctor.name}
                                        className="h-48 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                                    />
                                    {/* Availability Badge */}
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${doctor.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                                        <span className="text-xs font-medium">{doctor.available ? 'Available' : 'Unavailable'}</span>
                                    </div>
                                </div>

                                {/* Doctor Info */}
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                                    <p className="text-blue-600 font-medium mb-1">{doctor.speciality}</p>
                                    
                                    {/* Added Degree and Experience */}
                                    <p className="text-gray-600 text-sm mb-3">
                                        {doctor.degree || 'BDS, MDS'} - {doctor.experience || '16'} Years Experience
                                    </p>

                                    {/* CTA on Hover */}
                                    <div className="absolute bottom-0 left-0 right-0 h-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:h-1 group-hover:opacity-100 transition-all duration-300"></div>
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center mt-4">
                                        <span className="inline-flex items-center text-sm text-blue-600 font-medium">
                                            Book Appointment
                                            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* View More Button */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center mt-12"
                    >
                        <button
                            onClick={() => { navigate('/doctors'); window.scrollTo(0, 0); }}
                            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-medium rounded-full shadow-md hover:shadow-lg transition-all hover:from-blue-500 hover:to-cyan-400"
                        >
                            View All {speciality} Specialists
                            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.div>
                </div>
            </section>
        )
    );
};

export default RelatedDoctors;