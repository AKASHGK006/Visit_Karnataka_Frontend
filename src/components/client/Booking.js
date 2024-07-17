import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import Swal from 'sweetalert2';
import baseUrl from '../../basrUrl'; // Ensure this import is correct

const Booking = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [participants, setParticipants] = useState(1);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [language, setLanguage] = useState('English'); // Default language or initial state
  const [place, setPlace] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [pricePerAdult, setPricePerAdult] = useState(0); // Initialize price per adult state

  useEffect(() => {
    fetchPlaceDetails(id);
  }, [id]);

  const fetchPlaceDetails = async (placeId) => {
    try {
      const response = await axios.get(`${baseUrl}/places/${placeId}`);
      if (response.status === 200) {
        setPlace(response.data);
        setPricePerAdult(response.data.placeprice);
        setIsLoading(false);
      } else {
        console.error('Failed to fetch place details');
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name,
      mobileNumber,
      participants,
      place: place.placetitle,
      date: selectedDate.toISOString(),
      time: selectedTime,
      language,
      totalPrice: participants * pricePerAdult,
      placeId: id,
    };

    try {
      const response = await axios.post(`${baseUrl}/bookings`, bookingData);
      console.log('Booking successful:', response.data);
      // Optionally reset form fields or show success message
      Swal.fire({
        icon: 'success',
        title: 'Booking Successful!',
        text: 'Your booking has been confirmed.',
      }).then(() => {
        navigate('/'); // Redirect to the home page
      });
      setName('');
      setMobileNumber('');
      setParticipants(1);
      setSelectedDate(new Date());
      setSelectedTime('');
      setLanguage('English');
    } catch (error) {
      if (error.response) {
        console.error('Request failed with status code:', error.response.status);
        console.error('Error details:', error.response.data);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error during request setup:', error.message);
      }
      Swal.fire({
        icon: 'error',
        title: 'Booking Failed',
        text: 'Failed to complete your booking. Please try again later.',
      });
    }
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!place) {
    return <div>Failed to load place details.</div>;
  }

  return (
    <div className="flex justify-center pt-20">
      <div className="w-full md:max-w-4xl mx-4 p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative border-white rounded-2xl border-2">
            <div className="mt-5 mx-4">
              <p className="text-2xl font-bold flex items-center">
                {place.placetitle}  : {place.placelocation}
              </p>
            </div>
            <div className="my-3 mx-4">
              <p className="text-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 mr-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                <span className="text-sm md:text-lg font-semibold">
                  <a href={place.placemeetlocation} target="_blank" rel="noopener noreferrer" className="underline">Meet the guide near {place.placetitle} (Click me)</a>
                </span>
              </p>
              <hr className="my-4 border-gray-300" />
            </div>
            <div className="my-3 mx-4">

              <div className="flex flex-wrap mb-4">
                <div className="w-full md:w-1/2">
                  <p className="text-xl font-semibold mb-2">Name:</p>
                  <div className='px-2'>
                    <input
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded bg-transparent"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required />
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <p className="text-xl font-semibold mb-2">Phone:</p>
                  <div className='px-2'>
                    <input
                      type="tel"
                      className="w-full p-2 border border-gray-300 rounded bg-transparent px-2"
                      required
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      pattern="[0-9]*"
                      maxLength={10}
                    />
                  </div>
                </div>
              </div>
              <p className="text-xl flex items-center font-semibold">
                Select participants and date
              </p>
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="p-3 flex items-center md:w-1/3">
                  <div className="font-bold border border-white rounded-2xl py-2 px-4 w-full text-left flex items-center justify-between">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-7 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                      />
                    </svg>
                    <p className="flex-1 mr-4 text-lg">Participants</p>
                    <button type="button" className="bg-white text-gray-700 rounded-full w-3.5 h-3.5 flex items-center justify-center" onClick={() => setParticipants(Math.max(1, participants - 1))}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="mx-4">{participants}</span>
                    <button type="button" className="bg-white text-gray-700 rounded-full w-3.5 h-3.5 flex items-center justify-center"
                      onClick={() => setParticipants(participants + 1)}>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="p-3 flex items-center md:w-1/3">
                  <div className="font-bold border border-white rounded-2xl py-2 px-4 w-full text-left flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-7 mr-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zzm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zzm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zzm0 2.25h.008v.008H7.5v-.008Zzm6.75-4.5h.008v.008h-.008v-.008Zzm0 2.25h.008v.008h-.008v-.008Zzm0 2.25h.008v.008h-.008v-.008Zzm2.25-4.5h.008v.008H16.5v-.008Zzm0 2.25h.008v.008H16.5V15Z"
                      />
                    </svg>
                    <div>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        minDate={new Date()}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="Select a date"
                        className="font-bold w-full bg-transparent focus:outline-none text-left " // Set background to transparent
                      />
                    </div>
                  </div>
                </div>
                {/* Language Selector Section */}
                <div className="relative md:w-1/3">
                  <div className="p-3 flex items-center md:w-full">
                    <div className="font-bold border border-white rounded-2xl py-2 px-4 w-full text-left flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"
                        />
                      </svg>
                      <div>
                        <select value={language} onChange={handleLanguageChange} class="appearance-none border border-none bg-transparent focus:outline-none text-lg block w-full pl-2">
                          <option value="" disabled selected hidden>Select language</option>
                          <option value="English">English</option>
                          <option value="Hindi">Hindi</option>
                          <option value="Kannada">Kannada</option>
                        </select>

                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xl flex items-center font-semibold">
                Starting time
              </p>
              <div>
                <p className="text-lg flex items-center">
                  {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a date'}
                </p>
                <div className="flex flex-wrap mt-2">
                  <button
                    type="button" // Ensure type="button" to prevent form submission
                    className={`border border-white rounded-lg py-2 px-3 text-base flex items-center appearance-none focus:outline-none focus:border-blue-500 mb-2 mr-2 md:mr-3 font-semibold ${selectedTime === '9:00' ? 'bg-blue-500 text-white' : ''} ${!selectedTime ? 'border-red-500' : ''}`}
                    onClick={() => handleTimeSelection('9:00')}
                  >
                    9:00 AM
                  </button>
                  <button
                    type="button" // Ensure type="button" to prevent form submission
                    className={`border border-white rounded-lg py-2 px-3 text-base flex items-center appearance-none focus:outline-none focus:border-blue-500 mb-2 mr-2 md:mr-3 font-semibold ${selectedTime === '12:00' ? 'bg-blue-500 text-white' : ''} ${!selectedTime ? 'border-red-500' : ''}`}
                    onClick={() => handleTimeSelection('12:00')}
                  >
                    12:00 PM
                  </button>
                  <button
                    type="button" // Ensure type="button" to prevent form submission
                    className={`border border-white rounded-lg py-2 px-3 text-base flex items-center appearance-none focus:outline-none focus:border-blue-500 mb-2 mr-2 md:mr-3 font-semibold ${selectedTime === '3:00' ? 'bg-blue-500 text-white' : ''} ${!selectedTime ? 'border-red-500' : ''}`}
                    onClick={() => handleTimeSelection('3:00')}
                  >
                    3:00 PM
                  </button>
                </div>

                {!selectedTime && (
                  <p className="text-red-500 text-lg mt-1">Please select a time</p>
                )}
              </div>
            </div>


            <div className="mb-3 mx-4"><hr className="my-4 border-gray-300" /></div>
            {/* Price breakdown section */}
            <div className="my-3 mx-4">
              <p className="text-xl flex items-center">
                <span className="mr-2 font-semibold pb-2">Price breakdown:</span>
              </p>
              <div className="flex justify-between">
                <span className="text-lg">Adult {participants} × ₹ {pricePerAdult}</span>
                <span className="text-lg">₹{participants * pricePerAdult}</span> {/* Calculating total price */}
              </div>
            </div>
            <div className='bg-gray-600 flex rounded-bl-2xl rounded-br-2xl pb-4'>
              <div className="mx-4 flex-1">
                <p className='pt-3 font-semibold'>Total price</p>
                <p className='text-3xl font-bold'>₹{participants * pricePerAdult}</p>
              </div>
              <div className="flex items-end pr-4">
                <button type="submit" className="border-2 border-white text-white py-2 px-4 rounded-lg hover:bg-white hover:text-gray-600 hover:border-gray-600 font-semibold">
                  Book now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

  );
};

export default Booking;
