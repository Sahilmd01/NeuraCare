import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import { toast } from 'react-toastify';
import RelatedDoctors from '../components/RelatedDoctors';
import axios from 'axios';

const Appointment = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext);
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');
  const [isBooking, setIsBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const getAvailableSlot = async () => {
    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        const slotDate = day + '-' + month + '-' + year;
        const isSlotAvailable =
          docInfo &&
          (!docInfo.slot_booked[slotDate] || !docInfo.slot_booked[slotDate].includes(formattedTime));

        if (isSlotAvailable) {
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  const handleDateSelect = (index) => {
    setSlotIndex(index);
    setSelectedDate(docSlots[index][0]?.datetime);
    setAvailableTimes(docSlots[index]);
    setSlotTime('');
    setShowDropdown(false);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Please log in to book an appointment.');
      return navigate('/login');
    }

    if (!slotTime) {
      toast.warn('Please select a time slot.');
      return;
    }

    setIsBooking(true);

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      const slotDate = day + '-' + month + '-' + year;

      const { data } = await axios.post(
        backendUrl + '/api/user/book-appointment',
        { slotDate, slotTime, docId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success('Your appointment has been successfully booked.');
        getDoctorsData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to book the appointment. Please try again.');
    } finally {
      setIsBooking(false);
    }
  };

  useEffect(() => {
    if (doctors.length > 0) {
      const foundDoctor = doctors.find((doc) => doc._id === docId);
      setDocInfo(foundDoctor);
    }
  }, [docId, doctors]);

  useEffect(() => {
    if (docInfo) getAvailableSlot();
  }, [docInfo]);

  useEffect(() => {
    if (docSlots.length > 0) {
      setSelectedDate(docSlots[0][0]?.datetime);
      setAvailableTimes(docSlots[0]);
    }
  }, [docSlots]);

  return (
    docInfo && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-400 to-green-400 text-white py-12 text-center">
          <h1 className="text-4xl font-bold mb-2">Book Your Consultation</h1>
          <p className="text-xl">Schedule an appointment with {docInfo.name}</p>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 grid lg:grid-cols-3 gap-10">
          {/* Doctor Info */}
          <div className="bg-white rounded-xl shadow border border-blue-100 overflow-hidden">
            <div className="relative h-72">
              <img src={docInfo.image} alt={docInfo.name} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 bg-gradient-to-t from-black/50 to-transparent w-full p-4 text-white">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  {docInfo.name}
                  <img src={assets.verified_icon} className="w-5 h-5" alt="verified" />
                </h2>
                <p className="text-sm">{docInfo.speciality}</p>
              </div>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-semibold text-blue-700">{docInfo.experience}+ years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Qualification</p>
                  <p className="font-semibold text-blue-700">{docInfo.degree}</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-sm text-blue-600">Consultation Fee</p>
                <p className="text-2xl font-bold text-green-600">
                  {currencySymbol}
                  {docInfo.fees}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-700 mb-1">About Doctor</h3>
                <p className="text-gray-600">{docInfo.about}</p>
              </div>
            </div>
          </div>

          {/* Booking Panel */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-8 border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-800 mb-6">Select Appointment Time</h2>

            {/* Date Selection */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">Available Dates</h3>
              <div className="grid grid-cols-7 gap-3">
                {docSlots.map((item, index) => {
                  const date = item[0]?.datetime;
                  return (
                    <button
                      key={index}
                      onClick={() => handleDateSelect(index)}
                      className={`flex flex-col items-center justify-center p-3 rounded-lg ${
                        slotIndex === index
                          ? 'bg-gradient-to-br from-blue-400 to-green-400 text-white shadow'
                          : 'bg-white border border-blue-100 hover:bg-blue-50 text-gray-700'
                      }`}
                    >
                      <span className="text-sm">{date && daysOfWeek[date.getDay()].slice(0, 3)}</span>
                      <span className="text-xl font-bold">{date?.getDate()}</span>
                      <span className="text-xs">{date && months[date.getMonth()]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Dropdown */}
            <div className="mb-8 relative max-w-md">
              <h3 className="text-lg font-semibold text-blue-700 mb-4">
                Available Time Slots{' '}
                {selectedDate && `on ${selectedDate.getDate()} ${months[selectedDate.getMonth()]}`}
              </h3>

              {availableTimes.length > 0 ? (
                <div>
                  <button
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="w-full px-4 py-3 text-left bg-white border border-blue-200 rounded-lg shadow-sm hover:bg-blue-50"
                  >
                    {slotTime || 'Select a time'}
                    <svg
                      className={`w-4 h-4 float-right transform transition-transform ${
                        showDropdown ? 'rotate-180' : 'rotate-0'
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {showDropdown && (
                    <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-lg mt-2 max-h-64 overflow-y-auto shadow-lg">
                      {availableTimes.map((item, index) => (
                        <li
                          key={index}
                          onClick={() => {
                            setSlotTime(item.time);
                            setShowDropdown(false);
                          }}
                          className={`px-4 py-2 cursor-pointer hover:bg-blue-100 ${
                            item.time === slotTime ? 'bg-blue-50 font-semibold text-blue-700' : ''
                          }`}
                        >
                          {item.time.toLowerCase()}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-yellow-800">
                  No available slots for this date
                </div>
              )}
            </div>

            {/* Confirm Button */}
            <button
              onClick={bookAppointment}
              disabled={!slotTime || isBooking}
              className={`w-full py-4 rounded-xl text-white font-bold text-lg shadow transition-all ${
                slotTime
                  ? 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600'
                  : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              {isBooking ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 inline-block text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                  Booking...
                </>
              ) : (
                'Confirm Appointment'
              )}
            </button>
          </div>
        </div>

        {/* Related Doctors */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-6">You May Also Like</h2>
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;
