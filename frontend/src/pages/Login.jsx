import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [formdata,setFormdata] =useState({
        email:'',
        password:''
    })
    const navigate =useNavigate();
    const[message,setMessage]=useState('')
    const handleinput=(e)=>{
        const {name, value} = e.target;

        setFormdata((prevdata)=>({
            ...prevdata,
            [name] : value
        }));

    }
    const handlesubmit= async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post('/auth/login', {
              email: formdata.email,
              password: formdata.password,
            });
      
            const { token } = response.data;
      
           
            localStorage.setItem('token', token);
            setMessage('Login successful! Redirecting...');
      
            
            setTimeout(() => {
              navigate('/dashboard'); 
            }, 1000);
          } catch (error) {
            console.error('Login failed:', error);
            setMessage(error.response?.data?.message || 'Login failed. Please try again.');
          }
        
    };
    
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-cyan-500 to-teal-800">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-96 text-white relative">

        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-cyan-400 px-6 py-2 rounded-md font-bold text-black">
          SIGN IN
        </div>

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

        <form className="space-y-4" onSubmit={handlesubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleinput}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleinput}
            required
            className="w-full px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-cyan-500" />
              <span className="text-gray-300">Remember me</span>
            </label>
            <a href="#" className="text-cyan-400 hover:underline">
              Forgot password?
            </a>
          </div>

         
          <button
            type="submit"
            className="w-full bg-cyan-400 text-black font-semibold py-2 rounded-md hover:bg-cyan-500 transition"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
