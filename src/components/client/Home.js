import React, { useState, useEffect } from 'react';
import bgImage from '../../assets/bg2.png'; // Adjust the relative path as needed
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../basrUrl'; // Corrected the import path assuming 'baseUrl' is correct
import Footer from './Footer';

const Home = () => {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    sessionStorage.clear();
    axios.get(`${baseUrl}/places`)
      .then(response => {
        setPlaces(response.data);
        setLoading(false); // Set loading to false after data fetch
      })
      .catch(error => {
        console.error('Error fetching places:', error);
        setLoading(false); // Set loading to false on error as well
      });
  }, []);

  const goToDetailsPage = (placeId) => {
    navigate(`/details/${placeId}`);
  };

  return (
    <div>
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-10 bg-black opacity-40"></div>
        <div className="absolute inset-0 z-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}></div>
        <div className="relative z-20 text-center mt-32 md:mt-20">
          <h2 className="text-white font-light text-xl mb-4 text-san" style={{ letterSpacing: '2px' }}>BE THE PART OF THIS WONDERFUL JOURNEY</h2>
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8" style={{ letterSpacing: '2px' }}>Visit Karnataka!</h1>
          <Link to="/#section2" className="bg-green-500 hover:bg-transparent text-white font-bold py-2 px-4 rounded-l-full rounded-r-full transition duration-300 border-2 border-white">
            Explore Now
          </Link>
        </div>
      </div>

      <section id="section2">
        <div className="my-20"></div>
        <h1 className="text-center text-3xl font-bold mt-12 mb-4">You'll fall in love with Karnataka!</h1>
        <p className="text-center font-light mb-12">Explore Karnataka from Hubli to Mysore</p>
      </section>

      <div className="flex justify-center">
        <a href="#" className="group transition-all duration-300 ease-in-out relative px-4 py-2 mx-2 focus:text-green-500">
          <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">ALL</span>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out relative px-4 py-2 mx-2 focus:text-green-500">
          <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">NORTH</span>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out relative px-4 py-2 mx-2 focus:text-green-500">
          <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">EAST</span>
        </a>
        <a href="#" className="group transition-all duration-300 ease-in-out relative px-4 py-2 mx-2 focus:text-green-500">
          <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">WEST</span>
        </a>
      </div>

      <div className="my-10"></div>

      <div className="px-4">
        <div className="container mx-auto px-4">
          <div className="my-10"></div>
          {loading ? (
            <div className="flex justify-center">
              <img src="https://clipart-library.com/images/8cEbXkpLi.gif" alt="Loading..." className="w-35 h-50" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
              {places.map(place => (
                <div key={place._id} className="max-w-xs overflow-hidden rounded-lg m-4 transform transition duration-300 hover:scale-105" onClick={() => goToDetailsPage(place._id)}>
                  <img src={place.image} alt="Card Image" className="w-80 h-80 object-cover rounded-lg" /> {/* Render image from place.image */}
                  <div className="my-5"></div>
                  <figcaption className="font-bold mt-2 text-center font-raleway">{place.placetitle}</figcaption>
                  <p className="font-light text-center">{place.placelocation}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="my-5"></div>
      <Footer />
    </div>
  );
}

export default Home;
