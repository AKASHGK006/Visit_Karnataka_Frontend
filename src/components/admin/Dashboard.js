import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseUrl from '../../basrUrl';

const Dashboard = () => {
  const [places, setPlaces] = useState(0);
  const [feedback, setFeedback] = useState(0);
  const [bookings, setBookings] = useState(0);

  useEffect(() => {
    // Fetch places count
    axios.get(`${baseUrl}/places`)
      .then(response => {
        setPlaces(response.data.length); // Assuming places data is an array and length represents the count
      })
      .catch(error => {
        console.error('Error fetching places:', error);
      });

    // Fetch feedback count
    axios.get(`${baseUrl}/Feedback`)
      .then(response => {
        setFeedback(response.data.length); // Assuming feedback data is an array and length represents the count
      })
      .catch(error => {
        console.error('Error fetching feedback:', error);
      });

    // Fetch bookings count
    axios.get(`${baseUrl}/bookings`)
      .then(response => {
        setBookings(response.data.length); // Assuming bookings data is an array and length represents the count
      })
      .catch(error => {
        console.error('Error fetching bookings:', error);
      });
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="flex-1 md:pl-72 md:pr-8">
      <div className="container mx-auto mt-8 md:mt-3 mb-4 px-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Visitors Card */}
          <div className="bg-green-200 shadow-md rounded-md p-6 text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Visitors</h2>
            <p className="text-4xl font-bold">100</p>
          </div>
          {/* Places Card */}
          <div className="bg-blue-200 shadow-md rounded-md p-6 text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Places</h2>
            <p className="text-4xl font-bold">{places}</p>
          </div>
          {/* Feedback Card */}
          <div className="bg-red-200 shadow-md rounded-md p-6 text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Feedback</h2>
            <p className="text-4xl font-bold">{feedback}</p>
          </div>
          {/* Booking Card */}
          <div className="bg-yellow-200 shadow-md rounded-md p-6 text-gray-800">
            <h2 className="text-xl font-semibold mb-4">Bookings</h2>
            <p className="text-4xl font-bold">{bookings}</p>
          </div>
        </div>

        {/* Google Maps iframe */}
        <div className="mt-8 relative rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3943909.3189738807!2d75.88654839045141!3d15.148120650129583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba35a4c37bf488f%3A0x41f1d28cd1757cd5!2sKarnataka!5e0!3m2!1sen!2sin!4v1714885269095!5m2!1sen!2sin"
            className="absolute inset-0 w-full h-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
