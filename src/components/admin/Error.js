import React from 'react';
import { Link } from 'react-router-dom';

export const Error = () => {
  return (
    <div className="flex-1 md:pl-72 md:pr-8">
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">404 - Page Not Found</h2>
          <p className="text-gray-600 mb-4">The page you are looking for might have been removed or is temporarily unavailable.</p>
          <Link to={`/`} className="text-blue-500 hover:underline">
            Go Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error;
