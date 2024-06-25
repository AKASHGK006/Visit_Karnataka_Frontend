import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../basrUrl'; // Corrected import path assuming baseUrl is defined

const UpdatePlace = () => {
  const { placeId } = useParams();
  const [imageLink, setImageLink] = useState('');
  const [placetitle, setPlacetitle] = useState('');
  const [placelocation, setPlacelocation] = useState('');
  const [guidename, setGuidename] = useState('');
  const [guidemobile, setGuidemobile] = useState('');
  const [guidelanguage, setGuidelanguage] = useState('');
  const [residentialdetails, setResidentialdetails] = useState('');
  const [policestation, setPolicestation] = useState('');
  const [firestation, setFirestation] = useState('');
  const [maplink, setMaplink] = useState('');
  const [description, setDescription] = useState('');
  const [placeLatitude, setPlaceLatitude] = useState(''); // State for latitude
  const [placeLongitude, setPlaceLongitude] = useState(''); // State for longitude
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlaceDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/places/${placeId}`);
        const { data } = response;
        setPlacetitle(data.placetitle);
        setPlacelocation(data.placelocation);
        setGuidename(data.guidename);
        setGuidemobile(data.guidemobile);
        setGuidelanguage(data.guidelanguage);
        setResidentialdetails(data.residentialdetails);
        setPolicestation(data.policestation);
        setFirestation(data.firestation);
        setMaplink(data.maplink);
        setDescription(data.description);
        setImageLink(data.image);
        setPlaceLatitude(data.latitude || ''); // Set latitude state from fetched data
        setPlaceLongitude(data.longitude || ''); // Set longitude state from fetched data
      } catch (error) {
        setError('Failed to fetch place details. Please try again.');
      }
    };

    fetchPlaceDetails();
  }, [placeId]);

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updateData = {
        placetitle,
        placelocation,
        guidename,
        guidemobile,
        guidelanguage,
        residentialdetails,
        policestation,
        firestation,
        maplink,
        description,
        image: imageLink,
        latitude: placeLatitude, // Include latitude in the updateData object
        longitude: placeLongitude, // Include longitude in the updateData object
      };
      const updatePlaceResponse = await axios.put(
        `${baseUrl}/places/${placeId}`,
        updateData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(updatePlaceResponse.data);
      if (updatePlaceResponse.data.status === 'OK') {
        setError('');
        navigate('/Admin/Places');
      } else {
        setError('Failed to update place. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  return (
    <div className="flex-1 md:pl-72 md:pr-8">
      <div className="container mx-auto mt-8 md:px-4 px-4">
        <h3 className="text-3xl font-semibold mb-6">Update Place</h3>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} >
          <input type="hidden" name="s.no" />
          <div className="mb-4">
            <label htmlFor="place" className="block mb-2">Places Title</label>
            <input type="text" id="place" className="form-input w-full px-4 py-2 border rounded-md" name="place" value={placetitle} onChange={(e) => setPlacetitle(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block mb-2">Places Location</label>
            <input type="text" id="location" className="form-input w-full px-4 py-2 border rounded-md" name="location" value={placelocation} onChange={(e) => setPlacelocation(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="guidename" className="block mb-2">Guide Name</label>
            <input
              id="guidename"
              className="form-input w-full px-4 py-2 border rounded-md"
              type="text"
              name="guidename"
              value={guidename}
              onChange={(e) => setGuidename(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="guidemobile" className="block mb-2">Guide Mobile</label>
            <input
              id="guidemobile"
              className="form-input w-full px-4 py-2 border rounded-md"
              type="text"
              name="guidemobile"
              value={guidemobile}
              onChange={(e) => setGuidemobile(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="guidelanguage" className="block mb-2">Guide Language</label>
            <input
              id="guidelanguage"
              className="form-input w-full px-4 py-2 border rounded-md"
              type="text"
              name="guidelanguage"
              value={guidelanguage}
              onChange={(e) => setGuidelanguage(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="residential" className="block mb-2">Residential Details</label>
            <input type="text" id="residential" className="form-input w-full px-4 py-2 border rounded-md" name="residential" value={residentialdetails} onChange={(e) => setResidentialdetails(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="police" className="block mb-2">Police Station Details</label>
            <input type="text" id="police" className="form-input w-full px-4 py-2 border rounded-md" name="police" value={policestation} onChange={(e) => setPolicestation(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="fire" className="block mb-2">Fire Station Details</label>
            <input type="text" id="fire" className="form-input w-full px-4 py-2 border rounded-md" name="fire" value={firestation} onChange={(e) => setFirestation(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="map" className="block mb-2">Map Link</label>
            <input type="text" id="map" className="form-input w-full px-4 py-2 border rounded-md" name="map" value={maplink} onChange={(e) => setMaplink(e.target.value)} required />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">Description</label>
            <div className="bg-black rounded-md p-2">
              <CKEditor
                editor={ClassicEditor}
                data={description}
                onChange={handleDescriptionChange}
                className="text-white"
                value={description}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="latitude" className="block mb-2">Latitude</label>
            <input
              type="text"
              id="latitude"
              className="form-input w-full px-4 py-2 border rounded-md"
              name="latitude"
              value={placeLatitude}
              onChange={(e) => setPlaceLatitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="longitude" className="block mb-2">Longitude</label>
            <input
              type="text"
              id="longitude"
              className="form-input w-full px-4 py-2 border rounded-md"
              name="longitude"
              value={placeLongitude}
              onChange={(e) => setPlaceLongitude(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="imageLink" className="block mb-2">Image Link</label>
            <input
              type="text"
              id="imageLink"
              className="form-input w-full px-4 py-2 border rounded-md"
              name="imageLink"
              value={imageLink}
              onChange={handleImageLinkChange}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block mb-4">Update</button>
          <Link to="/Admin/Places" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">Cancel</Link>
        </form>
      </div>
    </div>
  );
};

export default UpdatePlace;
