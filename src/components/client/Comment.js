import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import baseUrl from '../../basrUrl';
import Footer from './Footer';


function Comment() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [place, setPlace] = useState('');
  const [feedback, setFeedback] = useState('');
  const [Error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Fetching data from session storage
      const name = sessionStorage.getItem('name');
      const phone = sessionStorage.getItem('phone');
      const place = sessionStorage.getItem('placeName');
      
      // Feedback data to be sent
      const feedbackData = { name, phone, place, feedback };
  
      // Sending feedback data to the server
      const feedbackResponse = await axios.post(`${baseUrl}/Feedback`, feedbackData);
      
      if (feedbackResponse.data.status === "OK") {
        // Clearing session storage
        sessionStorage.clear();
  
        // Clearing form fields
        setName('');
        setPhone('');
        setPlace('');
        setFeedback('');
        // Show SweetAlert feedback submitted alert
        Swal.fire({
          title: 'Feedback Submitted',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        });
      } else {
        setError('Failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    }
  }
  
  

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        setIsLoggedIn(false);
         navigate ("/Login");
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
       navigate("/Login");
    }
  }, []);

  return (
    <div>
    <div className="wrapper mx-auto px-4 sm:px-6 lg:px-20 pt-20">
      {isLoggedIn && (
        <form className="form" onSubmit={handleSubmit}>
          <div className="input-group textarea">
            <label htmlFor="comment" className="block mb-2 font-bold text-lg">Comment</label>
            <textarea id="comment" name="comment" placeholder="Enter your Comment" className="w-full p-2 border border-gray-300 rounded-lg" rows="14" value={feedback} onChange={(e)=>setFeedback(e.target.value)} required ></textarea>
          </div>

          <div className="input-group">
            <button type="submit" className="btn w-full sm:w-auto">Post Comment</button>
          </div>

          <div className="mt-4"></div>

          <div className="input-group">
            <input type="hidden" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="input-group">
            <input type="hidden" name="phonenumber" id="phonenumber" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>

          <div className="input-group">
            <input type="hidden" name="place" id="place" value={place} onChange={(e) => setPlace(e.target.value)} />
          </div>
        </form>
      )}
    </div>
    <Footer/>
    </div>
  );
}

export default Comment;
