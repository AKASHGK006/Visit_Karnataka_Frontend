import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../basrUrl';

const CreatePlace = () => {
  const [imageURL, setImageURL] = useState(''); // State to hold image URL
  const [imagePreview, setImagePreview] = useState(''); // State to hold image preview
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
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle image URL input change
  const handleImageURLChange = (e) => {
    const url = e.target.value;
    setImageURL(url);
    if (url) {
      setImagePreview(url); // Set preview to entered URL
    } else {
      setImagePreview(''); // Clear preview if URL is empty
    }
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const createplaceResponse = await axios.post(`${baseUrl}/Createplaces`, {
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
        image: imageURL, // Send imageURL to backend
      });
      console.log(createplaceResponse.data);
      if (createplaceResponse.data.status === 'OK') {
        // Reset form fields on successful submission
        setPlacetitle('');
        setPlacelocation('');
        setGuidename('');
        setGuidemobile('');
        setGuidelanguage('');
        setResidentialdetails('');
        setPolicestation('');
        setFirestation('');
        setMaplink('');
        setDescription('');
        setImageURL('');
        setImagePreview('');
        setError('');
        navigate('/Admin/Places');
      } else {
        setError('Failed. Please try again.');
      }
    } catch (signupErr) {
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex-1 md:pl-72 md:pr-8">
      <div className="container mx-auto mt-8 md:px-4 px-4">
        <h3 className="text-3xl font-semibold mb-6">Create Place</h3>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">
            {error}
          </div>
        )}
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          {/* Your other input fields */}
          <div className="mb-4">
            <label htmlFor="imageURL" className="block mb-2">
              Paste Image URL
            </label>
            <input
              type="text"
              id="imageURL"
              className="form-input w-full px-4 py-2 border rounded-md"
              name="imageURL"
              value={imageURL}
              onChange={handleImageURLChange}
              placeholder="Paste image URL here"
              required
            />
          </div>
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Preview" className="max-w-full h-auto" />
            </div>
          )}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block mb-4"
          >
            Create
          </button>
          <Link
            to={`/Admin/Places`}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreatePlace;
