import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import baseUrl from '../../basrUrl';

const Place = () => {
  const [placesData, setPlacesData] = useState([]);

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/places/${id}`)
      .then(response => {
        // Remove the deleted place from the state
        setPlacesData(placesData.filter(place => place._id !== id));
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error deleting place:', error);
      });
  };

  const confirmDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this place!',
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
          'The place has been deleted.',
          'success'
        );
      }
    });
  };

  useEffect(() => {
    // Fetch places data from backend when component mounts
    axios.get(`${baseUrl}/places`)
      .then(response => {
        setPlacesData(response.data);
      })
      .catch(error => {
        console.error('Error fetching places data:', error);
      });
  }, []); // Empty dependency array ensures the effect runs only once on mount

  return (
    <div className="flex-1 md:pl-72 md:pr-8">
      <div className="container mx-auto mt-8 md:px-4 px-4">
        <h1 className="text-3xl font-bold mb-4">Places</h1>
        <div className="card card-outline card-primary">
          <div className="card-header flex justify-between">
            <h3 className="card-title">List of Places</h3>
            <div className="card-tools">
              <Link to="/Admin/CreatePlace" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block">
                Create Place
              </Link></div>
          </div>
          <div className="card-body overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-white">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2 border border-gray-400">S.no</th>
                  <th className="px-4 py-2 border border-gray-400">Places</th>
                  <th className="px-4 py-2 border border-gray-400">Location</th>
                  <th className="px-4 py-2 border border-gray-400">Guide Name</th>
                  <th className="px-4 py-2 border border-gray-400">Guide Mobile</th>
                  <th className="px-4 py-2 border border-gray-400">Action</th>
                </tr>
              </thead>
              <tbody>
                {placesData.map((place, index) => (
                  <tr key={place._id}>
                    <td className="px-4 py-2 border border-gray-400 text-center">{index + 1}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{place.placetitle}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{place.placelocation}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{place.guidename}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center">{place.guidemobile}</td>
                    <td className="px-4 py-2 border border-gray-400 text-center whitespace-nowrap">
                      <Link to={`/Admin/EditPlace/${place._id}`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block">
                        Edit
                      </Link>
                      <button onClick={() => confirmDelete(place._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {placesData.length === 0 && (
              <p className="text-center mt-4">No Record Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place;
