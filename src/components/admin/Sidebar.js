import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.clear();
    // Redirect to home page
    navigate("/")
  };

  const closeOtherMenus = () => {
    setShowMenu(false);
  };

  return (
    <>
      {isMobile ? (
        <nav className="bg-gray-900 text-white fixed top-0 left-0 w-full z-50 h-20">
          <div className="flex justify-between items-center px-4 mt-4">
            <button className="text-white focus:outline-none" onClick={toggleMenu}>
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                {showMenu ? (
                  <path d="M19 13H5v-2h14v2zm0-5H5V6h14v2zm0 10H5v-2h14v2z" />
                ) : (
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                )}
              </svg>
            </button>
            <h1 className="text-2xl font-bold">Admin Panel</h1>
            <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded" onClick={handleLogout}>
              Logout
            </button>
          </div>
          {showMenu && (
            <div className="bg-gray-900 text-white px-4 py-2">
              <ul>
                <li className="py-2">
                  <Link to="/admin" className="block" onClick={closeOtherMenus}>Dashboard</Link>
                </li>
                <li className="py-2">
                  <Link to="/admin/places" className="block" onClick={closeOtherMenus}>Places</Link>
                </li>
                <li className="py-2">
                  <Link to="/admin/feedback" className="block" onClick={closeOtherMenus}>Feedbacks</Link>
                </li>
                <li className="py-2">
                  <Link to="/admin/bookings" className="block" onClick={closeOtherMenus}>Bookings</Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
      ) : (
        <aside className="bg-gray-900 text-white h-screen w-64 fixed left-0 top-0 overflow-y-auto">
          <div className="flex items-center justify-center h-16 border-b-4 border-gray-800">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <nav className="mt-4">
            <ul>
              <li className="px-4 py-2 hover:bg-gray-800">
                <Link to="/admin" className="block items-center flex justify-between" onClick={closeOtherMenus}>
                  <span className="inline-block">Dashboard</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                  </svg>
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-800">
                <Link to="/admin/places" className="block items-center flex justify-between" onClick={closeOtherMenus}>
                  <span className="inline-block">Places</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                  </svg>
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-800">
                <Link to="/admin/feedback" className="block items-center flex justify-between" onClick={closeOtherMenus}>
                  <span className="inline-block">Feedbacks</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
                  </svg>
                </Link>
              </li>
              <li className="px-4 py-2 hover:bg-gray-800">
                <Link to="/admin/bookings" className="block items-center flex justify-between" onClick={closeOtherMenus}>
                  <span className="inline-block">Bookings</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75V16.5L12 14.25 7.5 16.5V3.75m9 0H18A2.25 2.25 0 0 1 20.25 6v12A2.25 2.25 0 0 1 18 20.25H6A2.25 2.25 0 0 1 3.75 18V6A2.25 2.25 0 0 1 6 3.75h1.5m9 0h-9" />
                  </svg>
                </Link>
              </li>
            </ul>
          </nav>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <button className="w-full bg-gray-800 hover:bg-gray-700 rounded px-4 py-2" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
