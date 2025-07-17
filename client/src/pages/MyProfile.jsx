import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiEdit, FiSave, FiUpload, FiUser, FiChevronDown
} from 'react-icons/fi';

const InputField = ({ label, value, onChange, type = 'text', editable = false, placeholder = '' }) => (
  <div>
    <label className="block text-sm font-medium text-gray-500 mb-1">{label}</label>
    {editable ? (
      <input
        className="w-full bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type={type}
        value={value || ''}
        onChange={onChange}
        placeholder={placeholder}
      />
    ) : (
      <div className="text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">{value || 'Not specified'}</div>
    )}
  </div>
);

const Section = ({ title, icon: Icon, children, expanded, toggle }) => (
  <div className="p-6">
    <div className="flex justify-between items-center cursor-pointer" onClick={toggle}>
      <h3 className="text-lg font-semibold text-gray-800 flex items-center">
        <Icon className="mr-3 text-blue-500" />
        {title}
      </h3>
      <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
        <FiChevronDown className="text-gray-400" />
      </motion.div>
    </div>
    <AnimatePresence>
      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const MyProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', userData.name);
      formData.append('phone', userData.phone);
      formData.append('address', JSON.stringify(userData.address));
      formData.append('gender', userData.gender);
      formData.append('dob', userData.dob);
      image && formData.append('image', image);

      const { data } = await axios.post(`${backendUrl}/api/user/update-profile`, formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const formatDate = (dateString) =>
    dateString ? new Date(dateString).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not specified';

  if (!userData) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-100 rounded-full filter blur-[100px] opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-cyan-100 rounded-full filter blur-[120px] opacity-10"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">My Profile</span>
          </h1>
          <p className="text-lg text-gray-600">Manage your personal information and preferences</p>
        </motion.div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="p-8 flex flex-col md:flex-row items-start md:items-center gap-8 border-b border-gray-100">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative">
                <img
                  src={image ? URL.createObjectURL(image) : userData.image}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
                {isEdit && (
                  <label
                    htmlFor="image"
                    className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="text-white flex flex-col items-center">
                      <FiUpload className="w-8 h-8 mb-1" />
                      <span className="text-sm">Change Photo</span>
                    </div>
                    <input type="file" id="image" className="hidden" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                  </label>
                )}
              </div>
            </div>

            <div className="flex-1">
              {isEdit ? (
                <input
                  className="w-full text-3xl font-bold bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={userData.name}
                  onChange={(e) => setUserData((prev) => ({ ...prev, name: e.target.value }))}
                />
              ) : (
                <h2 className="text-3xl font-bold text-gray-800">{userData.name}</h2>
              )}
              <p className="text-gray-500 mt-1">{userData.email}</p>

              <div className="mt-6 flex gap-3">
                {isEdit ? (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={updateUserProfileData}
                      className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg shadow-md hover:shadow-lg flex items-center"
                    >
                      <FiSave className="mr-2" />
                      Save Changes
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setIsEdit(false);
                        setImage(false);
                      }}
                      className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setIsEdit(true)}
                    className="px-6 py-2.5 bg-white border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 flex items-center"
                  >
                    <FiEdit className="mr-2" />
                    Edit Profile
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            <Section
              title="Contact Information"
              icon={FiUser}
              expanded={expandedSection === 'contact'}
              toggle={() => setExpandedSection(expandedSection === 'contact' ? null : 'contact')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Email" value={userData.email} editable={false} />
                <InputField
                  label="Phone"
                  value={userData.phone}
                  editable={isEdit}
                  onChange={(e) => setUserData((prev) => ({ ...prev, phone: e.target.value }))}
                />
                <div className="md:col-span-2 space-y-3">
                  <InputField
                    label="Address Line 1"
                    value={userData.address?.line1}
                    editable={isEdit}
                    onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                  />
                  <InputField
                    label="Address Line 2"
                    value={userData.address?.line2}
                    editable={isEdit}
                    onChange={(e) => setUserData((prev) => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                  />
                </div>
              </div>
            </Section>

            <Section
              title="Basic Information"
              icon={FiUser}
              expanded={expandedSection === 'basic'}
              toggle={() => setExpandedSection(expandedSection === 'basic' ? null : 'basic')}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
                  {isEdit ? (
                    <select
                      className="w-full bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={userData.gender}
                      onChange={(e) => setUserData((prev) => ({ ...prev, gender: e.target.value }))}
                    >
                      <option value="Not Selected">Not Selected</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                  ) : (
                    <div className="text-gray-700 bg-gray-50 px-4 py-2 rounded-lg">{userData.gender || 'Not specified'}</div>
                  )}
                </div>
                <InputField
                  label="Date of Birth"
                  type="date"
                  value={userData.dob}
                  editable={isEdit}
                  onChange={(e) => setUserData((prev) => ({ ...prev, dob: e.target.value }))}
                />
              </div>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
