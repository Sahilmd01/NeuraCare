import React, { useState } from 'react';
import { 
    FaUserMd, 
    FaFemale, 
    FaChild, 
    FaBrain,
    FaFilter,
    FaSearch,
    FaClinicMedical,
    FaHandSparkles,
    FaHospital,
    FaHeartbeat,
    FaProcedures,
    FaChevronDown,
    FaChevronUp
} from 'react-icons/fa';
import { 
    GiMedicinePills, 
    GiHealthNormal,
    GiStomach
} from 'react-icons/gi';
import { motion, AnimatePresence } from 'framer-motion';

const Services = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [hoveredCard, setHoveredCard] = useState(null);
    const [expandedService, setExpandedService] = useState(null);
    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const mainServices = [
        {
            id: 1,
            title: 'General Physician',
            icon: <FaUserMd className="text-teal-600 text-3xl md:text-4xl" />,
            description: 'Comprehensive primary care for adults including health check-ups, diagnosis and treatment of common illnesses.',
            subServices: [
                'Annual Physical Exams',
                'Chronic Disease Management',
                'Vaccinations',
                'Health Counseling',
                'Minor Procedures'
            ]
        },
        {
            id: 2,
            title: 'Gynecology',
            icon: <FaFemale className="text-cyan-600 text-3xl md:text-4xl" />,
            description: 'Specialized care for women\'s reproductive health including pregnancy, childbirth, and disorders.',
            subServices: [
                'Prenatal Care',
                'Pap Smears',
                'Family Planning',
                'Menopause Management',
                'Fertility Treatments'
            ]
        },
        {
            id: 3,
            title: 'Dermatology',
            icon: <FaHandSparkles className="text-emerald-600 text-3xl md:text-4xl" />,
            description: 'Diagnosis and treatment of skin conditions, hair and nail disorders, and cosmetic procedures.',
            subServices: [
                'Acne Treatment',
                'Skin Cancer Screening',
                'Psoriasis Treatment',
                'Cosmetic Dermatology',
                'Hair Loss Treatments'
            ]
        },
        {
            id: 4,
            title: 'Pediatrics',
            icon: <FaChild className="text-sky-600 text-3xl md:text-4xl" />,
            description: 'Specialized medical care for infants, children, and adolescents focusing on growth and development.',
            subServices: [
                'Well-baby Checkups',
                'Immunizations',
                'Developmental Screening',
                'Adolescent Medicine',
                'Pediatric Nutrition'
            ]
        },
        {
            id: 5,
            title: 'Neurology',
            icon: <FaBrain className="text-blue-600 text-3xl md:text-4xl" />,
            description: 'Diagnosis and treatment of disorders of the nervous system including brain, spinal cord and nerves.',
            subServices: [
                'Epilepsy Treatment',
                'Stroke Management',
                'Headache/Migraine Treatment',
                'Multiple Sclerosis Care',
                'Parkinson\'s Disease Management'
            ]
        },
        {
            id: 6,
            title: 'Gastroenterology',
            icon: <GiStomach className="text-teal-500 text-3xl md:text-4xl" />,
            description: 'Specialized care for digestive system disorders including esophagus, stomach, intestines, liver and pancreas.',
            subServices: [
                'Colonoscopy',
                'Endoscopy',
                'GERD Treatment',
                'IBD Management',
                'Liver Disease Treatment'
            ]
        }
    ];

    const additionalServices = [
        {
            id: 7,
            title: 'Cardiology',
            icon: <FaHeartbeat className="text-cyan-700 text-3xl md:text-4xl" />,
            description: 'Heart care specialists treating conditions like heart disease, high blood pressure, and arrhythmias.',
            subServices: [
                'Echocardiograms',
                'Stress Tests',
                'Angioplasty',
                'Pacemaker Implantation',
                'Cholesterol Management'
            ]
        },
        {
            id: 8,
            title: 'Orthopedics',
            icon: <FaProcedures className="text-emerald-700 text-3xl md:text-4xl" />,
            description: 'Specialists in musculoskeletal system treating bones, joints, ligaments, tendons, muscles and nerves.',
            subServices: [
                'Joint Replacement',
                'Sports Medicine',
                'Spine Care',
                'Fracture Treatment',
                'Arthroscopic Surgery'
            ]
        },
        {
            id: 9,
            title: 'ENT Specialist',
            icon: <GiMedicinePills className="text-sky-700 text-3xl md:text-4xl" />,
            description: 'Treatment for conditions of the ear, nose, throat, and related structures of the head and neck.',
            subServices: [
                'Hearing Tests',
                'Tonsillectomy',
                'Sinus Treatment',
                'Voice Disorder Therapy',
                'Sleep Apnea Treatment'
            ]
        }
    ];

    const allServices = [...mainServices, ...additionalServices];

    const filteredServices = activeFilter === 'All' 
        ? allServices 
        : allServices.filter(service => 
            service.title.toLowerCase().includes(activeFilter.toLowerCase()) ||
            service.subServices.some(sub => sub.toLowerCase().includes(activeFilter.toLowerCase()))
        );

    const searchedServices = searchQuery 
        ? filteredServices.filter(service => 
            service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.subServices.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        : filteredServices;

    // Animation variants
    const cardVariants = {
        initial: { y: 0, opacity: 1, scale: 1 },
        hover: { 
            y: -8, 
            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.08)",
            transition: { duration: 0.3, ease: "easeOut" }
        }
    };

    const subListVariants = {
        open: { 
            opacity: 1,
            height: "auto",
            transition: { 
                staggerChildren: 0.05,
                when: "beforeChildren"
            }
        },
        closed: { 
            opacity: 0,
            height: 0,
            transition: { 
                staggerChildren: 0.05,
                staggerDirection: -1,
                when: "afterChildren"
            }
        }
    };

    const subItemVariants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10 }
    };

    const toggleService = (id) => {
        setExpandedService(expandedService === id ? null : id);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            {/* Premium Header */}
            <motion.div 
                className="text-center mb-12 md:mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Advanced Medical Specialties</h1>
                <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto mb-5"></div>
                <p className="text-gray-600 max-w-3xl mx-auto text-base md:text-lg px-4">
                    World-class healthcare delivered with compassion and cutting-edge technology by our team of board-certified specialists.
                </p>
            </motion.div>

            {/* Search and Filter - Mobile First */}
            <div className="mb-8 md:mb-12">
                {/* Search Bar */}
                <div className="relative w-full mb-4">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search specialties or treatments..."
                        className="pl-10 pr-4 py-3 w-full border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:border-transparent text-base"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Mobile Filter Toggle */}
                <div className="md:hidden">
                    <button
                        onClick={() => setShowMobileFilters(!showMobileFilters)}
                        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                        <span className="flex items-center">
                            <FaFilter className="mr-2 text-cyan-600" />
                            Filter Specialties
                        </span>
                        {showMobileFilters ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                </div>

                {/* Filter Buttons */}
                <AnimatePresence>
                    {(showMobileFilters || window.innerWidth >= 768) && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="mt-3 md:mt-0 overflow-hidden"
                        >
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={() => {
                                        setActiveFilter('All');
                                        if (window.innerWidth < 768) setShowMobileFilters(false);
                                    }}
                                    className={`px-4 py-2 rounded-lg text-sm md:text-base flex items-center transition-all ${activeFilter === 'All' ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                                >
                                    <FaFilter className="mr-1" /> All
                                </button>
                                {mainServices.map((service) => (
                                    <button
                                        key={service.id}
                                        onClick={() => {
                                            setActiveFilter(service.title);
                                            if (window.innerWidth < 768) setShowMobileFilters(false);
                                        }}
                                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-sm md:text-base transition-all ${activeFilter === service.title ? 'bg-gradient-to-r from-cyan-500 to-emerald-500 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'}`}
                                    >
                                        {service.title.split(' ')[0]}
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchedServices.length > 0 ? (
                    searchedServices.map((service) => (
                        <motion.div
                            key={service.id}
                            className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                            variants={cardVariants}
                            initial="initial"
                            whileHover="hover"
                            onMouseEnter={() => setHoveredCard(service.id)}
                            onMouseLeave={() => setHoveredCard(null)}
                        >
                            <div className="p-5 md:p-6">
                                <div 
                                    className="flex items-center justify-between cursor-pointer"
                                    onClick={() => toggleService(service.id)}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 md:p-3 rounded-lg transition-colors ${hoveredCard === service.id ? 'bg-cyan-50' : 'bg-gray-50'}`}>
                                            {service.icon}
                                        </div>
                                        <h3 className="text-lg md:text-xl font-semibold text-gray-800">{service.title}</h3>
                                    </div>
                                    {expandedService === service.id ? (
                                        <FaChevronUp className="text-gray-400" />
                                    ) : (
                                        <FaChevronDown className="text-gray-400" />
                                    )}
                                </div>
                                <p className="text-gray-600 mt-3 mb-4 text-sm md:text-base leading-relaxed">
                                    {service.description}
                                </p>

                                <AnimatePresence>
                                    {expandedService === service.id && (
                                        <motion.div
                                            className="overflow-hidden"
                                            initial="closed"
                                            animate="open"
                                            exit="closed"
                                            variants={subListVariants}
                                        >
                                            <h4 className="font-medium text-gray-700 mb-3 flex items-center text-sm md:text-base">
                                                <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                                                Treatments & Services
                                            </h4>
                                            <motion.ul className="space-y-2 pl-4">
                                                {service.subServices.map((subService, index) => (
                                                    <motion.li 
                                                        key={index} 
                                                        className="text-gray-600 text-sm md:text-base"
                                                        variants={subItemVariants}
                                                    >
                                                        <span className="text-cyan-500 mr-2">•</span>
                                                        {subService}
                                                    </motion.li>
                                                ))}
                                            </motion.ul>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                            <div className={`px-5 py-3 border-t border-gray-100 text-xs md:text-sm ${hoveredCard === service.id ? 'bg-cyan-50' : 'bg-gray-50'}`}>
                                <span className="text-cyan-600 font-medium">✓ Accepting new patients</span>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 md:py-16">
                        <div className="bg-gradient-to-r from-cyan-100 to-emerald-100 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-5">
                            <FaSearch className="text-cyan-600 text-xl md:text-2xl" />
                        </div>
                        <h3 className="text-lg md:text-xl font-medium text-gray-600 mb-2">No matching specialties found</h3>
                        <button 
                            onClick={() => {
                                setActiveFilter('All');
                                setSearchQuery('');
                            }}
                            className="text-cyan-600 hover:text-cyan-700 font-medium mt-3 text-sm md:text-base"
                        >
                            Reset all filters
                        </button>
                    </div>
                )}
            </div>

            {/* Premium Features Section */}
            <motion.div 
                className="mt-14 md:mt-20 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-2xl p-6 md:p-10 border border-gray-100"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
            >
                <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Exceptional Patient Experience</h2>
                    <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-emerald-400 mx-auto mb-5"></div>
                    <p className="text-gray-600 text-base md:text-lg">
                        Our hospital combines advanced medical technology with compassionate care to deliver outstanding patient outcomes.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">
                    {[
                        {
                            icon: (
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            ),
                            title: "Advanced Technology",
                            description: "State-of-the-art diagnostic equipment and minimally invasive surgical techniques for precise treatment.",
                            color: "cyan"
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            ),
                            title: "Expert Specialists",
                            description: "Board-certified physicians with specialized training and years of clinical experience.",
                            color: "emerald"
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                </svg>
                            ),
                            title: "Patient-Centered",
                            description: "Personalized treatment plans tailored to your unique health needs and lifestyle.",
                            color: "cyan"
                        }
                    ].map((feature, index) => (
                        <motion.div
                            key={index}
                            className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100"
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={`bg-${feature.color}-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-4 mx-auto`}>
                                {feature.icon}
                            </div>
                            <h4 className="font-semibold text-lg md:text-xl text-center mb-2 md:mb-3 text-gray-800">{feature.title}</h4>
                            <p className="text-gray-600 text-center text-sm md:text-base">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Accreditation Banner */}
            <motion.div 
                className="mt-12 md:mt-16 bg-white rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-6 md:mb-0 md:mr-8">
                        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">Accredited Excellence</h3>
                        <p className="text-gray-600 max-w-lg text-sm md:text-base">
                            Our hospital is accredited by the Joint Commission International, meeting the highest standards for quality and patient safety.
                        </p>
                    </div>
                    <div className="flex flex-wrap justify-center gap-3 md:gap-6">
                        {["JCI ACCREDITED", "ISO 9001:2015", "5-STAR RATING"].map((badge, i) => (
                            <motion.div
                                key={i}
                                className="bg-gray-50 p-3 md:p-4 rounded-lg flex items-center justify-center min-w-[100px]"
                                whileHover={{ scale: 1.05 }}
                            >
                                <span className="text-xs md:text-sm font-semibold text-gray-700">{badge}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Services;