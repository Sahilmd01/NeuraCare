import React, { useEffect, useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);
  const [filteredDocs, setFilteredDocs] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  useEffect(() => {
    setFilteredDocs(
      speciality
        ? doctors.filter(doc => doc.speciality === speciality)
        : doctors
    );
  }, [speciality, doctors]);

  const getIcon = (spec) => {
    const icons = {
      "General physician": "👨‍⚕️",
      "Gynecologist": "👩‍⚕️",
      "Dermatologist": "💆‍♂️",
      "Pediatricians": "🧒",
      "Neurologist": "🧠",
      "Gastroenterologist": "🤢",
    };
    return icons[spec] || "🩺";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">
            Find Your Perfect Doctor
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Connect with our network of highly qualified specialists
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <div className="lg:w-72 flex-shrink-0">
            <button
              onClick={() => setShowFilter(prev => !prev)}
              className={`w-full lg:hidden flex items-center justify-between py-3 px-5 mb-4 rounded-xl shadow-sm transition-all ${
                showFilter
                  ? 'bg-gradient-to-r from-blue-600 to-teal-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
              }`}
            >
              <span className="font-medium">{showFilter ? 'Hide Filters' : 'Filter Specialists'}</span>
              <svg className={`w-5 h-5 transition-transform ${showFilter ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`bg-white p-5 rounded-2xl shadow-sm border border-gray-100 ${showFilter ? 'block' : 'hidden lg:block'}`}>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filter by Specialty
              </h3>

              <div className="space-y-2">
                <button
                  onClick={() => navigate('/doctors')}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                    !speciality ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200' : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <span className="mr-2">👨‍⚕️</span> All Specialties
                </button>

                {specialities.map(spec => (
                  <button
                    key={spec}
                    onClick={() => navigate(`/doctors/${spec}`)}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center ${
                      speciality === spec
                        ? 'bg-blue-50 text-blue-600 font-semibold border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span className="mr-2">{getIcon(spec)}</span> {spec}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Doctors Grid */}
          <div className="flex-1">
            {filteredDocs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDocs.map(doc => (
                  <div
                    key={doc._id}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer hover:-translate-y-1"
                    onClick={() => navigate(`/appointment/${doc._id}`)}
                  >
                    {/* Image */}
                    <div className="relative h-64 bg-blue-50 flex items-center justify-center p-4">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="h-56 w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${doc.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                        <span className="text-xs font-medium">
                          {doc.available ? 'Available' : 'Unavailable'}
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-6 relative">
                      <h3 className="text-xl font-bold text-gray-900">{doc.name}</h3>
                      <p className="text-blue-600 font-semibold">{doc.speciality}</p>
                      <p className="text-gray-600 text-sm mb-4">
                        {doc.degree || 'BDS, MDS'} - {doc.experience || 1} Year{doc.experience > 1 ? 's' : ''} Experience
                      </p>

                      {/* Hover CTA */}
                      <div className="text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700">
                          Book Appointment
                          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>

                      {/* Hover Line */}
                      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-10 text-center shadow-sm border border-gray-200">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {speciality ? `No ${speciality} specialists available` : 'No doctors found'}
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  {speciality
                    ? "We couldn't find any specialists in this category at the moment."
                    : "We're having trouble loading doctors right now."}
                </p>
                {speciality && (
                  <button
                    onClick={() => navigate('/doctors')}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-500 text-white font-medium rounded-lg hover:opacity-90 transition"
                  >
                    View All Doctors
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
