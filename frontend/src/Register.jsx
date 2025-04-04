import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import register from '../src/assets/register.jpg';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    navigate('/login');
  };

  return (
    <div className="flex">
      {/* Left Section - Form */}
      <div className="w-full h-[580px] md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form 
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg border shadow-lg">
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-medium font-logo text-center">Serenity Blooms</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6">Enter your username and password to Register</p>
          
          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full p-2 border rounded"
              placeholder="Enter your Name"
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="w-full p-2 border rounded"
              placeholder="Enter your password"
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="w-full bg-fresh-green text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >Sign Up</button>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">Login</Link>
          </p>
        </form>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:block w-1/2 bg-gray-800">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src={register}
            alt="Login to Account"
            className="h-[580px] w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
