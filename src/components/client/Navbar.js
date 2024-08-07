import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [visitText, setVisitText] = useState("Visit Karnataka");

  useEffect(() => {
    // Check window width on mount and resize
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisitText("V K");
      } else {
        setVisitText("Visit Karnataka");
      }
    };

    // Call on mount
    handleResize();

    // Listen to window resize events
    window.addEventListener("resize", handleResize);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array to run once on mount

  return (
    <>
      <div className="navbar bg-neutral text-neutral-content md:py-2 md:px-20 sm:py-2 sm:px-4 fixed w-full z-50">
        <div className="navbar-start">
          <Link to="/" className="text-2xl font-bold cursor-pointer pl-2">{visitText}</Link>
        </div>
        <div className="navbar-end flex space-x-2">
          <button className="btn btn-ghost btn-circle">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
