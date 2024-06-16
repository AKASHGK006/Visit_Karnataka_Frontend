import React from 'react';
import { useNavigate } from 'react-router-dom';

const PlaceCard = ({ place, baseUrl }) => {
  const navigate = useNavigate();

  const goToDetailsPage = (placeId) => {
    navigate(`/details/${placeId}`);
  };

  const handleImageError = (e) => {
    console.error(`Failed to load image for place ${place._id}:`, e.target.src);
    // Optionally, you can set a fallback image or handle the error in UI
    e.target.src = '/path/to/fallback-image.jpg'; // Example of setting a fallback image
  };

  return (
    <div className="max-w-xs overflow-hidden rounded-lg m-4 transform transition duration-300 hover:scale-105" onClick={() => goToDetailsPage(place._id)}>
      <img
        src={`${baseUrl}/${place.image}`}
        alt="Card Image"
        className="w-72 h-72 object-cover rounded-lg"
        onError={handleImageError} // Handle image loading errors
      />
      <div className="my-5"></div>
      <figcaption className="font-bold mt-2 text-center font-raleway">{place.placetitle}</figcaption>
      <p className="font-light text-center">{place.placelocation}</p>
    </div>
  );
};

export default PlaceCard;
