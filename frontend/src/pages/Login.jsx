import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import login from '../assets/login.jpg';
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({email, password}));
  };

  return (
    <div className="flex">
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg border shadow-sm"
        >
          <div className="flex justify-center mb-6">
            <h2 className="text-2xl font-medium font-logo text-center">Fashion Fits</h2>
          </div>
          <h2 className="text-2xl font-bold text-center mb-6">Hey there! 👋</h2>
          <p className="text-center mb-6">
            Enter your username and password to Login
          </p>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 font-logo">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="w-full p-2 border rounded"
              placeholder="Enter your email address"
            />
          </div>
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
          <button
            type="submit"
            className="w-full bg-fresh-green text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign In</button>
          <p className="mt-6 text-center text-sm">
            Don't have an account? {" "}
            <Link to="/register" className="text-blue-500">
              Register
            </Link>
          </p>
        </form>
      </div>
      <div className="hidden md:block w-1/2 bg-gray-800 ">
        <div className="h-full flex flex-col justify-center items-center">
          <img src={login} alt="Login to Account" className="h-[580px] w-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Login;