import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import baseUrl from '../../basrUrl';

const Login = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/Login`, { phone, password });
      if (response.data.Status === "Success") {
        // Save token, role, name, and phone to sessionStorage
        sessionStorage.setItem('token', response.data.token);
        sessionStorage.setItem('role', response.data.role);
        sessionStorage.setItem('name', response.data.name);
        sessionStorage.setItem('phone', response.data.phone);

        setPhone('');
        setPassword('');
        setError('');

        // Redirect based on user role
        if (response.data.role === "Admin") {
          navigate("/Admin/"); // Redirect to admin dashboard
        } else {
          navigate("/Comment"); // Redirect to user dashboard
        }
      } else {
        setError('User does not exist or incorrect credentials.');
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.error || 'An unexpected error occurred.';
        setError(errorMessage);
      } else {
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  }; 

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:border-gray-700 dark:bg-gray-800 p-6 sm:px-8 py-8 sm:py-12 px-4 md:px-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
          Sign in to your account
        </h1>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">{error}</div>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              id="phone" 
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
              placeholder="Your phone number" 
              value={phone} 
              onChange={(e) => {
                const enteredValue = e.target.value;
                // Replace all non-digit characters with empty string
                const numericValue = enteredValue.replace(/\D/g, '');
                // Limit the input to 10 digits
                const limitedValue = numericValue.slice(0, 10);
                // Ensure that the phone number starts with 6, 7, 8, or 9
                const validValue = /^(6|7|8|9)/.test(limitedValue) ? limitedValue : '';
                // Update the state with the modified value
                setPhone(validValue);
              }}
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <div className="flex items-center justify-between">
            {/*<div className="flex items-start">
              <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
            </div>*/}
          </div>
          <button type="submit" className="w-full text-white bg-primary-600 border border-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
         { /*<p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
            Don’t have an account yet? <Link to="/SignUp" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
          </p>*/}
        </form>
      </div>
    </div>
  );
};

export default Login;
