import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import baseUrl from '../../basrUrl';

const Feedback = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/Feedback`);
        setFeedbackData(response.data);
      } catch (error) {
        console.error('Error fetching feedback data:', error);
      }
    };

    fetchFeedbackData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/Feedback/${id}`);
      setFeedbackData(feedbackData.filter(feedback => feedback._id !== id));
      console.log('Feedback deleted successfully');
    } catch (error) {
      console.error('Error deleting feedback:', error);
    }
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this feedback entry!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
        Swal.fire(
          'Deleted!',
          'The feedback has been deleted.',
          'success'
        );
      }
    });
  };

  return (
    <div className="flex-1 md:pl-72 md:pr-8">
      <div className="container mx-auto mt-8 md:px-4 px-4">
        <h1 className="text-3xl font-bold mb-4">Feedback</h1>
        <div className="card card-outline card-primary">
          <div className="card-header flex justify-between">
            <h3 className="card-title">List of Feedback</h3>
          </div>
          <div className="card-body overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2 border border-gray-400">S.no</th>
                  <th className="px-4 py-2 border border-gray-400">Name</th>
                  <th className="px-4 py-2 border border-gray-400">Phone Number</th>
                  <th className="px-4 py-2 border border-gray-400">Place</th>
                  <th className="px-4 py-2 border border-gray-400">Received Feedbacks</th>
                  <th className="px-4 py-2 border border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {feedbackData.map((feedback, index) => (
                  <tr key={feedback._id} className="bg-gray-850">
                    <td className="px-4 py-2 border border-gray-400 text-center">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{feedback.name}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{feedback.phone}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{feedback.place}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{feedback.feedback}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center whitespace-nowrap">
                      <button onClick={() => confirmDelete(feedback._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {feedbackData.length === 0 && (
              <p className="text-center mt-4">No Record Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
