// "use client"

// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import { validateForm } from "../utils/validation"
// import FormInput from "../components/FormInput"
// import { Shield, User, GraduationCap, Settings, CheckCircle } from "lucide-react"

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     name: "",
//     role: "student",
//     region: "North",
//   })
//   const [isSignup, setIsSignup] = useState(false)
//   const [loading, setLoading] = useState(false)
//   const [errors, setErrors] = useState({})
//   const [success, setSuccess] = useState("")

//   const { login } = useAuth()
//   const navigate = useNavigate()

//   const roles = [
//     {
//       value: "student",
//       label: "Student",
//       icon: User,
//       description: "Learn disaster preparedness through interactive modules and drills",
//       features: ["Access learning modules", "Participate in drills", "Earn badges and XP", "View leaderboards"],
//     },
//     {
//       value: "teacher",
//       label: "Teacher",
//       icon: GraduationCap,
//       description: "Guide students and monitor their preparedness progress",
//       features: ["Monitor student progress", "Create custom drills", "View class analytics", "Send alerts"],
//     },
//     {
//       value: "admin",
//       label: "Admin",
//       icon: Settings,
//       description: "Manage the platform and access comprehensive analytics",
//       features: ["Platform management", "User administration", "Advanced analytics", "System configuration"],
//     },
//   ]

//   const regions = [
//     { value: "North", label: "North Region", disasters: ["Earthquake", "Flood"] },
//     { value: "South", label: "South Region", disasters: ["Hurricane", "Tsunami"] },
//     { value: "East", label: "East Region", disasters: ["Tornado", "Fire"] },
//     { value: "West", label: "West Region", disasters: ["Wildfire", "Landslide"] },
//     { value: "Central", label: "Central Region", disasters: ["Flood", "Tornado"] },
//   ]

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setErrors({})
//     setSuccess("")

//     // Validate form
//     const validation = validateForm(formData, isSignup)
//     if (!validation.isValid) {
//       setErrors(validation.errors)
//       setLoading(false)
//       return
//     }

//     try {
//       const result = await login(formData)
//       if (result.success) {
//         setSuccess(isSignup ? "Account created successfully! Redirecting..." : "Login successful! Redirecting...")
//         setTimeout(() => {
//           navigate("/dashboard")
//         }, 1500)
//       } else {
//         setErrors({ general: result.error || "Authentication failed" })
//       }
//     } catch (err) {
//       setErrors({ general: "An error occurred. Please try again." })
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }))
//     }
//   }

//   const selectedRole = roles.find((role) => role.value === formData.role)

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl w-full space-y-8">
//         <div className="text-center">
//           <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
//             <Shield className="h-8 w-8 text-white" />
//           </div>
//           <h2 className="mt-6 text-3xl font-bold text-gray-900">{isSignup ? "Join DisasterPrep" : "Welcome Back"}</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             {isSignup
//               ? "Create your account to start your safety journey"
//               : "Sign in to continue your preparedness training"}
//           </p>
//         </div>

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {errors.general && (
//               <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
//                 <span>{errors.general}</span>
//               </div>
//             )}

//             {success && (
//               <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center">
//                 <CheckCircle className="h-5 w-5 mr-2" />
//                 <span>{success}</span>
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               {isSignup && (
//                 <FormInput
//                   label="Full Name"
//                   name="name"
//                   type="text"
//                   required={isSignup}
//                   placeholder="Enter your full name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   error={errors.name}
//                   className="md:col-span-2"
//                 />
//               )}

//               <FormInput
//                 label="Email Address"
//                 name="email"
//                 type="email"
//                 required
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 error={errors.email}
//                 className={isSignup ? "" : "md:col-span-2"}
//               />

//               <FormInput
//                 label="Password"
//                 name="password"
//                 type="password"
//                 required
//                 placeholder="Enter your password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 error={errors.password}
//                 className={isSignup ? "" : "md:col-span-2"}
//               />
//             </div>

//             {isSignup && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-4">
//                     Select Your Role <span className="text-red-500">*</span>
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                     {roles.map((role) => {
//                       const Icon = role.icon
//                       const isSelected = formData.role === role.value
//                       return (
//                         <label
//                           key={role.value}
//                           className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
//                             isSelected
//                               ? "border-primary-500 bg-primary-50 ring-2 ring-primary-200"
//                               : "border-gray-200 hover:bg-gray-50 hover:border-gray-300"
//                           }`}
//                         >
//                           <input
//                             type="radio"
//                             name="role"
//                             value={role.value}
//                             checked={isSelected}
//                             onChange={handleChange}
//                             className="sr-only"
//                           />
//                           <div className="flex items-center mb-2">
//                             <Icon className={`h-6 w-6 mr-2 ${isSelected ? "text-primary-600" : "text-gray-600"}`} />
//                             <span className={`font-semibold ${isSelected ? "text-primary-900" : "text-gray-900"}`}>
//                               {role.label}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-600 mb-3">{role.description}</p>
//                           <ul className="text-xs text-gray-500 space-y-1">
//                             {role.features.map((feature, index) => (
//                               <li key={index} className="flex items-center">
//                                 <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
//                                 {feature}
//                               </li>
//                             ))}
//                           </ul>
//                           {isSelected && (
//                             <div className="absolute top-2 right-2">
//                               <CheckCircle className="h-5 w-5 text-primary-600" />
//                             </div>
//                           )}
//                         </label>
//                       )
//                     })}
//                   </div>
//                   {errors.role && <p className="mt-1 text-sm text-red-600">{errors.role}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">
//                     Region <span className="text-red-500">*</span>
//                   </label>
//                   <select
//                     id="region"
//                     name="region"
//                     className="input-field"
//                     value={formData.region}
//                     onChange={handleChange}
//                   >
//                     {regions.map((region) => (
//                       <option key={region.value} value={region.value}>
//                         {region.label} - Common disasters: {region.disasters.join(", ")}
//                       </option>
//                     ))}
//                   </select>
//                   {errors.region && <p className="mt-1 text-sm text-red-600">{errors.region}</p>}
//                 </div>
//               </>
//             )}

//             <div>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
//               >
//                 {loading ? (
//                   <>
//                     <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
//                     {isSignup ? "Creating Account..." : "Signing In..."}
//                   </>
//                 ) : isSignup ? (
//                   "Create Account"
//                 ) : (
//                   "Sign In"
//                 )}
//               </button>
//             </div>

//             <div className="text-center">
//               <button
//                 type="button"
//                 onClick={() => {
//                   setIsSignup(!isSignup)
//                   setErrors({})
//                   setSuccess("")
//                 }}
//                 className="text-primary-600 hover:text-primary-500 font-medium transition-colors"
//               >
//                 {isSignup ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
//               </button>
//             </div>
//           </form>
//         </div>

//         {isSignup && selectedRole && (
//           <div className="bg-white rounded-lg shadow-md p-6">
//             <h3 className="text-lg font-semibold text-gray-900 mb-3">What you'll get as a {selectedRole.label}:</h3>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//               {selectedRole.features.map((feature, index) => (
//                 <div key={index} className="flex items-center text-sm text-gray-600">
//                   <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
//                   {feature}
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Login

import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
// import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors">
                <MessageSquare className="w-4 h-4 text-primary animate-pulse" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-base-content/40" />
                  ) : (
                    <Eye className="h-5 w-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="text-center">
            <p className="text-base-content/60">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="link link-primary">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      {/* <AuthImagePattern
        title={"Welcome back!"}
        subtitle={
          "Sign in to continue your conversations and catch up with your messages."
        }
      /> */}
    </div>
  );
};
export default LoginPage;
