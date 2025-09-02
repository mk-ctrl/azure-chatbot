import React, { useState } from 'react';
import { axiosInstance } from '../axios/axios';

// SVG Icons as React Components for better reusability and styling
const UserIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
    />
  </svg>
);

const LockIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
    />
  </svg>
);


export default function LoginPage() {
  const [formData, setFormData] = useState({
    email:'',
    password:''
  })
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in both fields.');
      return;
    }
    
    const result = await axiosInstance.post('/api/signin',formData);
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <div className="w-full max-w-md p-8 space-y-8 bg-slate-800/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-slate-700 m-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Sign In</h1>
          <p className="text-slate-400">Access your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <UserIcon className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              name="email"
              onChange={(e) => setFormData(prev=>(
                {...prev,[e.target.name]:e.target.value}
              ))}
              className="w-full py-3 pl-10 pr-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute top-1/2 left-3 -translate-y-1/2">
                <LockIcon className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={(e) => setFormData(prev => (
                {...prev,[e.target.name]:e.target.value}
              ))}
              className="w-full py-3 pl-10 pr-4 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
              required
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-indigo-500 transition duration-300 shadow-lg shadow-indigo-600/30"
          >
            Sign In
          </button>
        </form>
        
        <div className="text-center text-slate-400 text-sm">
          <p>
            Don't have an account?{' '}
            <a href="#" className="font-medium text-indigo-400 hover:text-indigo-300 transition duration-300">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
