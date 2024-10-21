import React, { useState } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure fields are not empty
    if (!formData.email || !formData.password) {
      toast.error('Please fill in both fields.');
      return;
    }

    try {
      const res = await axios.post('/auth/login', formData);  // Ensure the correct endpoint '/login'
      localStorage.setItem('token', res.data.token);     // Store token in localStorage
      toast.success('Logged in successfully');
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        console.error("Error response:", err.response.data); // Log the error response
        console.error("Error status:", err.response.status);
      }
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-400 to-blue-600 p-4">
      <ToastContainer />
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2 bg-blue-900 flex flex-col items-center justify-center p-6 md:p-8">
          <div className="text-center text-white mb-6">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back!</h2>
            <p className="text-sm md:text-base">Sign in to access your account</p>
          </div>

          <div className="bg-blue-800 p-3 md:p-4 rounded-full">
            <img
              src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
              alt="User Icon"
              className="w-16 h-16 md:w-24 md:h-24"
            />
          </div>
        </div>
        <div className="md:w-1/2 bg-white flex flex-col justify-center p-6 md:p-8">
          <div className="mb-6 text-center">
            <h2 className="text-cyan-500 text-xl md:text-2xl font-bold">SIGN IN</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4 relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="username"
                autoComplete="username"
                className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-800 border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                <i className="fas fa-user"></i>
              </div>
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="password"
                className="w-full pl-12 pr-12 py-3 bg-gray-100 text-gray-800 border rounded-full focus:outline-none focus:ring-2 focus:ring-cyan-500"
                autoComplete='current-password'
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600">
                <i className="fas fa-lock"></i>
              </div>
              <div 
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)} 
              >
                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
              </div>
            </div>
            <div className="flex justify-between items-center text-xs md:text-sm text-gray-600 mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-cyan-600" />
                <span className="ml-2">Remember me</span>
              </label>
              <a href="#" className="hover:text-cyan-500">Forgot your password?</a>
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-full font-semibold transition duration-300"
            >
              LOGIN
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account? 
              <Link to="/register" className="text-cyan-500 hover:underline ml-1">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
