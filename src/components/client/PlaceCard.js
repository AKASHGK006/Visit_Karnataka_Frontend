// PlaceCard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceCard = ({ place, baseUrl }) => {
  const navigate = useNavigate();

  const goToDetailsPage = (placeId) => {
    navigate(`/details/${placeId}`);
  };

  return (
    <div className="max-w-xs overflow-hidden rounded-lg m-4 transform transition duration-300 hover:scale-105" onClick={() => goToDetailsPage(place._id)}>
      <img src={`${baseUrl}/${place.image}`} alt="Card Image" className="w-72 h-72 object-cover rounded-lg" />
      <div className="my-5"></div>
      <figcaption className="font-bold mt-2 text-center font-raleway">{place.placetitle}</figcaption>
      <p className="font-light text-center">{place.placelocation}</p>
    </div>
  );
};

export default PlaceCard;
