"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companySize: "",
    industry: "",
    agreeToTerms: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [isModalOpen, setModalOpen] = useState(false)
  const navigate = useNavigate()

  const validateStep1 = () => {
    const newErrors = {}
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    const newErrors = {}
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required"
    if (!formData.companySize) newErrors.companySize = "Company size is required"
    if (!formData.industry) newErrors.industry = "Industry is required"
    if (!formData.agreeToTerms) newErrors.agreeToTerms = "You must agree to the terms and conditions"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return
    setIsLoading(true)
    setErrors({})
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
    setModalOpen(true)
  }

  const companySizes = [
    "1-10 employees",
    "11-50 employees",
    "51-200 employees",
    "201-500 employees",
    "501-1000 employees",
    "1000+ employees",
  ]

  const industries = [
    "Technology", "Healthcare", "Finance", "Education", "Manufacturing",
    "Retail", "Real Estate", "Consulting", "Marketing", "Other",
  ]

  return (
    <div
      className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat bg-gray-100 px-4 py-8"
      style={{ backgroundImage: `url('./images/register-img.png')` }}
    >
      <div className="bg-white bg-opacity-90 shadow-lg rounded-lg flex flex-col md:flex-row w-full max-w-[1000px] overflow-hidden">
        
        {/* Left Logo Section (hidden on mobile) */}
        <div className="hidden md:flex w-full md:w-1/3 bg-gray-200 p-8 flex-col">
          <img src="./images/logo-crm.png" alt="logo" className="w-100" />
          <p className="mt-4 text-gray-600 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi velit omnis ut ratione...
          </p>
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-2/3 p-8">
          {/* Mobile logo */}
          <div className="md:hidden flex flex-col items-center mb-4">
            <img src="./images/logo-crm.png" alt="logo" className="w-50 mb-2" />
            <h2 className="text-xl font-bold text-gray-800">Create Account</h2>
          </div>

          {/* Desktop heading */}
          <h2 className="hidden md:block text-2xl font-bold text-gray-800 mb-2">
            {step === 1 ? "Create Account" : "Company Information"}
          </h2>
          <p className="text-gray-600 mb-6">
            {step === 1 ? "Sign up for your CRM account" : "Tell us about your company"}
          </p>

          {/* Steps indicator */}
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2">
              <div className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-pink-500" : "bg-gray-300"}`} />
              <div className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-pink-500" : "bg-gray-300"}`} />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); handleNext() } : handleSubmit}>
            {step === 1 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* First Name */}
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className={`w-full shadow-md p-2 outline-none ${errors.firstName ? "border border-red-500" : ""}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>
                {/* Last Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className={`w-full shadow-md p-2 outline-none ${errors.lastName ? "border border-red-500" : ""}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                </div>
                {/* Email */}
                <div className="sm:col-span-2">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className={`w-full shadow-md p-2 outline-none ${errors.email ? "border border-red-500" : ""}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                {/* Phone */}
                <div className="sm:col-span-2">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className={`w-full shadow-md p-2 outline-none ${errors.phone ? "border border-red-500" : ""}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                {/* Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      className={`w-full shadow-md p-2 outline-none pr-10 ${errors.password ? "border border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                {/* Confirm Password */}
                <div>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                      className={`w-full shadow-md p-2 outline-none pr-10 ${errors.confirmPassword ? "border border-red-500" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange("companyName", e.target.value)}
                  className={`w-full shadow-md p-2 outline-none ${errors.companyName ? "border border-red-500" : ""}`}
                />
                <select
                  value={formData.companySize}
                  onChange={(e) => handleInputChange("companySize", e.target.value)}
                  className={`w-full shadow-md p-2 outline-none ${errors.companySize ? "border border-red-500" : ""}`}
                >
                  <option value="">Select company size</option>
                  {companySizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
                <select
                  value={formData.industry}
                  onChange={(e) => handleInputChange("industry", e.target.value)}
                  className={`w-full shadow-md p-2 outline-none ${errors.industry ? "border border-red-500" : ""}`}
                >
                  <option value="">Select industry</option>
                  {industries.map((ind) => (
                    <option key={ind} value={ind}>{ind}</option>
                  ))}
                </select>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange("agreeToTerms", e.target.checked)}
                  />
                  I agree to the terms and conditions
                </label>
                {errors.agreeToTerms && <p className="text-red-500 text-xs mt-1">{errors.agreeToTerms}</p>}
              </div>
            )}

            {/* Buttons */}
            <div className="mt-6">
              {step === 1 ? (
                <button
                  type="submit"
                  className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 px-4 rounded-md"
                >
                  Next Step
                </button>
              ) : (
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 py-2 px-4 border rounded-md bg-white text-gray-700"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex-1 py-2 px-4 rounded-md text-white bg-pink-500 hover:bg-pink-600 ${
                      isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              )}
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button onClick={() => navigate('/login')} className="text-pink-500 hover:underline font-medium">
              Sign in here
            </button>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full text-center">
            <div className='relative'>
              <img src="./images/Ellipse.png" alt="success circle" className='relative top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
              <img src="./images/Vector.png" alt="tick" className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'/>
            </div>
            <h2 className='text-center font-bold text-xl mt-4'>Success</h2>
            <p className="mt-2 text-gray-600">Your account has been created successfully!</p>
            <div className='flex justify-center mt-6'>
              <button
                onClick={() => {
                  setModalOpen(false)
                  navigate('/login')
                }}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
