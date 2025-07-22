import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaUser, FaSignOutAlt, FaUserMd, FaExternalLinkAlt,
  FaChevronDown, FaBars, FaTimes, FaPhoneAlt, FaMapMarkerAlt,
  FaUserNurse, FaInfoCircle, FaHandsHelping, FaEnvelope,
  FaCalendarAlt, FaHome
} from 'react-icons/fa';
import { HiOutlineLogin } from 'react-icons/hi';
import { GiMedicines } from 'react-icons/gi';
import { AppContext } from '../context/AppContext.jsx';
import { assets } from "../assets/assets.js";

const navLinks = [
  { path: "/", label: "Home", icon: FaHome },
  { path: "/doctors", label: "Doctors", icon: FaUserNurse },
  { path: "/about", label: "About", icon: FaInfoCircle },
  { path: "/services", label: "Services", icon: FaHandsHelping },
  { path: "/contact", label: "Contact", icon: FaEnvelope }
];

const staffLoginUrl = "https://staff.nauracare.example.com";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  const userMenu = [
    { path: "/my-profile", label: "My Profile", icon: FaUser },
    { path: "/my-appointments", label: "My Appointments", icon: FaCalendarAlt },
    { label: "Logout", icon: FaSignOutAlt, action: logout, isLogout: true }
  ];

  const AuthButtons = () => (
    <div className="hidden md:flex items-center space-x-3">
      <a
        href={staffLoginUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 px-4 py-2 rounded-full border border-teal-100 font-medium"
      >
        <FaUserMd /><span>Staff Login</span><FaExternalLinkAlt className="text-xs" />
      </a>
      <button
        onClick={() => navigate("/login")}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-medium shadow-md"
      >
        <HiOutlineLogin /><span>Login</span>
      </button>
    </div>
  );

  const NavItems = ({ mobile = false }) => (
    <>
      {navLinks.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          onClick={() => mobile && setShowMenu(false)}
          className={({ isActive }) =>
            `${mobile
              ? `py-2 px-4 rounded-lg flex items-center gap-3 ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-blue-50'}`
              : `py-1 flex items-center gap-1.5 font-medium relative group transition ${isActive ? 'text-blue-600' : 'text-gray-700 hover:text-blue-600'}`
            }`
          }
        >
          <Icon className="text-blue-500 text-lg" />
          {label}
          {!mobile && <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300" />}
        </NavLink>
      ))}
    </>
  );

  const UserDropdown = () => (
    <div className="absolute top-full right-0 pt-2 text-base font-medium z-30 animate-fade-in">
      <div className="min-w-48 bg-white rounded-lg shadow-xl flex flex-col p-4 gap-3 border border-gray-100">
        {userMenu.map(({ label, icon: Icon, path, action, isLogout }) => (
          <p
            key={label}
            onClick={() => {
              action ? action() : navigate(path);
              setShowDropdown(false);
            }}
            className={`cursor-pointer flex items-center gap-2 hover:text-blue-600 transition ${isLogout ? 'text-red-500 hover:text-red-600' : ''}`}
          >
            <Icon className={`${isLogout ? 'text-red-500' : 'text-blue-500'}`} />
            {label}
          </p>
        ))}
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Top Info */}
      <div className="hidden md:block bg-gradient-to-r from-blue-800 to-green-400 text-white text-sm py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <div className="flex items-center space-x-1"><FaPhoneAlt size={12} /><span>Emergency: (123) 456-7890</span></div>
            <div className="flex items-center space-x-1"><FaMapMarkerAlt size={12} /><span>123 Healing St, Medical City</span></div>
          </div>
          <div className="flex items-center space-x-1"><GiMedicines size={14} /><span>24/7 Pharmacy Services</span></div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
          <img src={assets.logo} alt="NauraCare Logo" className="h-10 mr-2" />
          <span className="text-2xl font-bold text-blue-800">NauraCare</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavItems />
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-6">
          {token && userData ? (
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="relative">
                <img
                  src={userData.image || assets.default_profile}
                  alt="Profile"
                  className="rounded-full w-10 h-10 object-cover border-2 border-blue-100"
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <FaChevronDown className="text-white text-xs" />
                </div>
              </div>
              {showDropdown && <UserDropdown />}
            </div>
          ) : (
            <AuthButtons />
          )}

          {/* Mobile Toggle */}
          <button className="md:hidden text-blue-900" onClick={() => setShowMenu(true)}>
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {showMenu && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={() => setShowMenu(false)} />}

      {/* Mobile Drawer */}
      <div className={`md:hidden fixed top-0 left-0 w-72 h-full z-50 bg-white transform transition-transform duration-300 shadow-2xl ${showMenu ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <div className="flex items-center cursor-pointer" onClick={() => { navigate("/"); setShowMenu(false); }}>
            <img src={assets.logo} alt="NauraCare Logo" className="h-8 mr-2" />
            <span className="text-xl font-bold text-blue-800">NauraCare</span>
          </div>
          <button className="text-gray-500" onClick={() => setShowMenu(false)}><FaTimes size={24} /></button>
        </div>

        <div className="p-4">
          <ul className="flex flex-col space-y-4"><NavItems mobile /></ul>

          <div className="mt-8 border-t border-gray-200 pt-4">
            {token && userData ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <img src={userData.image || assets.default_profile} alt="Profile" className="rounded-full w-12 h-12 object-cover border-2 border-blue-100" />
                  <div>
                    <p className="font-medium">{userData.name || "User"}</p>
                    <p className="text-sm text-gray-500">{userData.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {userMenu.map(({ label, icon: Icon, path, action, isLogout }) => (
                    <button
                      key={label}
                      onClick={() => { action ? action() : navigate(path); setShowMenu(false); }}
                      className={`w-full text-left py-2 px-4 rounded-lg flex items-center gap-3 hover:bg-blue-50 ${isLogout ? 'text-red-500' : ''}`}
                    >
                      <Icon className={`${isLogout ? 'text-red-500' : 'text-blue-500'}`} />
                      {label}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <a
                  href={staffLoginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-teal-50 hover:bg-teal-100 text-teal-700 px-6 py-3 rounded-full border border-teal-100 font-medium"
                >
                  <FaUserMd /><span>Staff Login</span><FaExternalLinkAlt className="text-xs" />
                </a>
                <button
                  onClick={() => { navigate("/login"); setShowMenu(false); }}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium shadow-md"
                >
                  <HiOutlineLogin /><span>Patient Login</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
