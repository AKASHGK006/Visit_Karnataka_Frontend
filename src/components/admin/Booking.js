import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import baseUrl from '../../basrUrl'; // Ensure correct import path for baseUrl

const Booking = () => {
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    fetchBookingData();
  }, []);

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/bookings`);
      setBookingData(response.data);
    } catch (error) {
      console.error('Error fetching Booking data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/bookings/${id}`);
      setBookingData(bookingData.filter(booking => booking._id !== id));
      console.log('Booking deleted successfully');
      Swal.fire(
        'Deleted!',
        'The Booking has been deleted.',
        'success'
      );
    } catch (error) {
      console.error('Error deleting Booking:', error);
      Swal.fire(
        'Error!',
        'Failed to delete the Booking.',
        'error'
      );
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this Booking entry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  return (
    <div className="flex-1 md:pl-72 md:pr-8">
      <div className="container mx-auto mt-8 md:px-4 px-4">
        <h1 className="text-3xl font-bold mb-4">Bookings</h1>
        <div className="card card-outline card-primary">
          <div className="card-header flex justify-between">
            <h3 className="card-title">List of Bookings</h3>
          </div>
          <div className="card-body overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2 border border-gray-400">S.no</th>
                  <th className="px-4 py-2 border border-gray-400">Name</th>
                  <th className="px-4 py-2 border border-gray-400">Phone Number</th>
                  <th className="px-4 py-2 border border-gray-400">Place</th>
                  <th className="px-4 py-2 border border-gray-400">Participants</th>
                  <th className="px-4 py-2 border border-gray-400">Date</th>
                  <th className="px-4 py-2 border border-gray-400">Language</th>
                  <th className="px-4 py-2 border border-gray-400">Time</th>
                  <th className="px-4 py-2 border border-gray-400">Total Price</th>
                  <th className="px-4 py-2 border border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookingData.map((booking, index) => (
                  <tr key={booking._id} className="bg-gray-850">
                    <td className="px-4 py-2 border border-gray-400 text-center">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{booking.name}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{booking.mobileNumber}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{booking.place}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{booking.participants}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{new Date(booking.date).toLocaleDateString()}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{booking.language}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{booking.time}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{booking.totalPrice}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center whitespace-nowrap">
                      <button onClick={() => confirmDelete(booking._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookingData.length === 0 && (
              <p className="text-center mt-4">No Record Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
