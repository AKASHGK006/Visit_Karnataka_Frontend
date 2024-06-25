import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import baseUrl from '../../basrUrl';
import Footer from './Footer';


const Details = () => {
  const navigate = useNavigate();
  const [place, setPlace] = useState(null);
  const [weather, setWeather] = useState(null); // State for weather data
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track user login status
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const { id } = useParams(); // Get the ID parameter from the URL

  useEffect(() => {
    fetchPlaceDetails(id); // Fetch place details when component mounts
    checkUserLoggedIn(); // Check user login status
  }, [id]);

  useEffect(() => {
    // Fetch weather data when place details are loaded
    if (place) {
      fetchWeatherData(place.latitude, place.longitude);
    }
  }, [place]);

  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await fetch(`${baseUrl}/places/${placeId}`);
      if (response.ok) {
        const data = await response.json();
        setPlace(data);
        // Store place name in session storage
        sessionStorage.setItem('placeName', data.placetitle);
      } else {
        console.error('Failed to fetch place details');
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWeatherData = async () => {
    const apiKey = 'cb932829eacb6a0e9ee4f38bfbf112ed';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${place.latitude}&lon=${place.longitude}&appid=${apiKey}&units=metric`;

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        setWeather(response.data);
      } else {
        console.error('Failed to fetch weather data');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const checkUserLoggedIn = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!place) {
    return <div>Failed to load place details.</div>;
  }

  return (
    <div>
      <div className="container mx-auto px-4 pt-20">
        <h1 className="mb-3 text-4xl font-bold">{place.placetitle}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 md:col-span-1">
            <img className="w-full rounded" src={place.image} alt="" />
          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold flex items-center">
              <span>Description</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m0 9.25h-1.5" />
              </svg>
            </h3>
            <div className="my-2 text-lg">
              <p dangerouslySetInnerHTML={{ __html: place.description }} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="my-4 text-2xl font-bold flex items-center">
              <span>Location</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </h3>
            <div className="my-4">
              <iframe
                title="Golden Temple Location"
                src={place.maplink}
                style={{ width: '100%', height: '400px', border: 0, borderRadius: "5px" }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>

          </div>

          <div className="col-span-1 md:col-span-1">
            <h3 className="my-5 text-2xl font-bold flex items-center">
              <span>Nearby Facilities</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181" />
              </svg>
            </h3>

            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold flex items-center">
                <span>Residential Place</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
                </svg>
              </h3>
              <p className="mt-2">{place.residentialdetails}</p>
              <div className="mt-5"></div>
            </div>

            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold flex items-center">
                <span>Police Stations</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.75h-.152c-3.196 0-6.1-1.25-8.25-3.286Zm0 13.036h.008v.008H12v-.008Z" />
                </svg>
              </h3>
              <p className="mt-2">{place.policestation}</p>
              <div className="mt-5"></div>
            </div>

            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold flex items-center">
                <span>Fire Stations</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z" />
                </svg>
              </h3>
              <p className="mt-2">{place.firestation}</p>
              <div className="mt-5"></div>
            </div>
            {weather && (
              <div className="col-span-1 md:col-span-1">
                <h3 className="text-xl font-bold flex items-center">
                  <span>Current Weather</span>
                  {weather.weather && weather.weather.length > 0 && (
                    <img
                      className="h-9 w-9"
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt="Weather Icon"
                    />
                  )}
                </h3>
                <p className="mt-1">Temperature: {weather.main.temp}°C</p>
                <p className="mt-1">Description: {weather.weather[0].description}</p>
                <div className="mt-5"></div>
              </div>
            )}

            <div className="col-span-1 md:col-span-1">
              <h3 className="text-xl font-bold flex items-center">
                <span>Guide Details</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4.5h14.25M3 9h9.75M3 13.5h9.75m4.5-4.5v12m0 0-3.75-3.75M17.25 21 21 17.25" />
                </svg>
              </h3>
              <p className="mt-2">Name - {place.guidename} </p>
              <p className="mt-1">Mobile - {place.guidemobile} </p>
              <p className="mt-1">Language - {place.guidelanguage} </p>
            </div>
            <div className="flex">
              <Link to={`/comment`} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-6 inline-block mr-4">
                Comment
              </Link>
            </div>
            <div className="mt-4"></div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Details;
