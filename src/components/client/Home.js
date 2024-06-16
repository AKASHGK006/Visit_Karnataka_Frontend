import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';
import baseUrl from '../../basrUrl'; // Ensure correct import path
import PlaceCard from './PlaceCard'; // Assuming this is the path to PlaceCard component

const Home = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Clear session storage on component mount (if needed)
    sessionStorage.clear();

    // Fetch places data from API
    axios.get(`${baseUrl}/places`)
      .then(response => { 
        setPlaces(response.data);
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        // Handle error if needed (e.g., set default places state)
        setPlaces([]);
      });
  }, []); // Empty dependency array ensures useEffect runs only once on component mount

  return (
    <div>
      {/* Your existing JSX for main content */}

      <div className="px-4">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center">
            {places.length > 0 ? (
              places.map(place => (
                <PlaceCard key={place._id} place={place} baseUrl={baseUrl} />
              ))
            ) : (
              <p className="text-center text-gray-500">Loading...</p>
            )}
          </div>
        </div>
      </div>

      {/* Your existing JSX for footer */}
      <Footer />
    </div>
  );
}

export default Home;
