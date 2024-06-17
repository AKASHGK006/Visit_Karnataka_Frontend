import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import baseUrl from '../../basrUrl';

const CreatePlace = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
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

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        try {
          const formData = new FormData();
          formData.append('file', file);
          formData.append('upload_preset', 'your_cloudinary_upload_preset'); // Replace with your upload preset

          const response = await axios.post('https://api.cloudinary.com/v1_1/dfk634he8/image/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          setImagePreview(response.data.secure_url); // Store the secure URL provided by Cloudinary
          setError('');
        } catch (error) {
          setError('Failed to upload image. Please try again.');
          console.error('Error uploading image to Cloudinary:', error);
        }
      } else {
        setError('Only images are allowed.');
      }
    }
  };

  const handleDescriptionChange = (event, editor) => {
    const data = editor.getData();
    setDescription(data);
  };

  const resetForm = () => {
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
    setImagePreview(null);
    setError('');
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
        image: imagePreview // Use the image URL from Cloudinary
      });

      if (createplaceResponse.data.status === "OK") {
        resetForm();
        navigate("/Admin/Places");
      } else {
        setError('Failed. Please try again.');
      }
    } catch (error) {
      setError('An unexpected error occurred. Please try again later.');
      console.error('Error creating place:', error);
    }
  };

  return (
    <div className="flex-1 md:pl-72 md:pr-8">
      <div className="container mx-auto mt-8 md:px-4 px-4">
        <h3 className="text-3xl font-semibold mb-6">Create Place</h3>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4" role="alert">{error}</div>}
        <form encType="multipart/form-data" onSubmit={handleSubmit} >
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
            <label htmlFor="file" className="block mb-2">Upload Image</label>
            <input
              type="file"
              id="file"
              className="form-input w-full px-4 py-2 border rounded-md"
              name="file"
              onChange={handleFileChange}
              accept="image/*" // Only accept image files
              required
            />
          </div>
          {imagePreview && (
            <div className="mb-4">
              <img src={imagePreview} alt="Uploaded" className="w-64 h-auto" />
            </div>
          )}
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 inline-block mb-4">Create</button>
          <Link to={`/Admin/Places`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-block">
            Cancel
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreatePlace;
