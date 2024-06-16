import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../basrUrl';


const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let errors = ''; // Accumulate errors here

    try {
      const response = await axios.get(`${baseUrl}/checkUserExist`, {
        params: { phone }
      });

      if (response.data.exists) {
        errors += 'User already exists.\n';
      }
      
      if (!name) {
        errors += 'Name is required.\n';
      }

      if (!phone) {
        errors += 'Phone number is required.\n';
      } else {
        const validPhone = /^(6|7|8|9)/.test(phone);
        if (!validPhone) {
          errors += 'Invalid phone number format.\n';
        }
      }

      if (!password) {
        errors += 'Password is required.\n';
      }

      if (errors) {
        throw new Error(errors.trim());
      }

      const signupResponse = await axios.post(`${baseUrl}/Signup`, { name, phone, password });

      if (signupResponse.data.status === "OK") {
        Swal.fire({
          icon: 'success',
          title: 'Signed up successfully',
          text: 'Redirecting to login page...',
          timer: 2000,
          showConfirmButton: false
        }).then(() => {
          navigate('/Login');
        });
      } else {
        throw new Error('Sign up failed. Please try again.');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Sign Up Failed',
        text: error.message
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white rounded-lg shadow dark:border dark:border-gray-700 dark:bg-gray-800 p-6 sm:px-8 py-8 sm:py-12 px-4">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-6">
          Sign up for an account
        </h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
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
            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
          <button type="submit" href='/Login' className="w-full text-white bg-primary-600 border border-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign up</button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400 mt-4">
            Already have an account? <Link to="/Login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
