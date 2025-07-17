import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMail, FiLock, FiUser, FiArrowRight } from 'react-icons/fi'

const Login = () => {
  const { backendUrl, setToken, token } = useContext(AppContext)
  const [state, setState] = useState("signup")
  const [form, setForm] = useState({ name: "", email: "", password: "" })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const endpoint = state === "signup" ? "/register" : "/login"
      const { data } = await axios.post(`${backendUrl}/api/user${endpoint}`, form)
      if (data.success) {
        localStorage.setItem("token", data.token)
        setToken(data.token)
        toast.success(`Account ${state === "signup" ? "created" : "logged in"} successfully`)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(`Error during ${state === "signup" ? "sign up" : "login"}`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (token) navigate("/")
  }, [token])

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: 'url("/bg.png")' }}
    >
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-lg shadow-lg overflow-hidden">
        
        {/* Left side image placeholder */}
        <div className="md:w-1/2 h-48 md:h-auto bg-gray-200 relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={state}
              src={`/login_bg.png`}
              alt={state}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        {/* Right side form */}
        <div className="w-full md:w-1/2 p-8 flex items-center justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-6">
              <div className="bg-indigo-100 inline-flex p-3 rounded-full mb-4">
                <FiArrowRight className="text-indigo-600 text-xl" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {state === "signup" ? "Create Account" : "Login"}
              </h2>
              <p className="text-gray-600 mt-2">
                Please {state === "signup" ? "sign up" : "log in"} to book appointment
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {state === "signup" && (
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>
              )}

              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>

              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 bg-indigo-600 text-white rounded-lg ${
                  isLoading ? "opacity-80" : "hover:bg-indigo-700"
                }`}
              >
                {isLoading ? "Processing..." : state === "signup" ? "Create account" : "Login"}
              </button>

              <div className="text-center text-sm text-gray-600 mt-2">
                {state === "signup" ? (
                  <p>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setState("login")}
                      className="text-indigo-600 underline"
                    >
                      Login here
                    </button>
                  </p>
                ) : (
                  <p>
                    Create a new account?{" "}
                    <button
                      type="button"
                      onClick={() => setState("signup")}
                      className="text-indigo-600 underline"
                    >
                      Click here
                    </button>
                  </p>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Login