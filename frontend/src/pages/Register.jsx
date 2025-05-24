import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom'

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const navigate= useNavigate()

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {

      const registerResponse = await axios.post('/auth/register', {
        name: formData.name,
        dob: formData.dob,
        email: formData.email,
        password: formData.password,
      });
  
      console.log(registerResponse.data);
      setMessage('Registration successful. Logging you in...');
  

      const loginResponse = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });
  
      localStorage.setItem('token', loginResponse.data.token);
      setMessage('Login successful! Redirecting...');
  
      setTimeout(() => {
        navigate('/dashboard'); 
      }, 1500);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message || 'Registration or login failed.'
      );
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-500 to-teal-800">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 text-white relative">
        {/* Header tab */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-cyan-400 px-6 py-2 rounded-md font-bold text-black">
          SIGN UP
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6 mt-4">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInput}
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            type="submit"
            className="w-full bg-cyan-400 text-black font-semibold py-2 rounded-md hover:bg-cyan-500 transition"
          >
            Register
          </button>

          {message && <p className="text-red-400 text-sm text-center">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
