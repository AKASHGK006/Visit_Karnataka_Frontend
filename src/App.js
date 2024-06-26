import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, BrowserRouter} from 'react-router-dom';
import Navbar from './components/client/Navbar';
import Sidebar from './components/admin/Sidebar';
import Home from './components/client/Home';
import Details from './components/client/Details';
import Error from './components/client/Error';
import Comment from './components/client/Comment';
import Login from './components/client/Login';
import SignUp from './components/client/Signup';
import Dashboard from './components/admin/Dashboard';
import Places from './components/admin/Places';
import Feedback from './components/admin/Feedback';
import CreatePlace from './components/admin/CreatePlace';
import EditPlace from './components/admin/EditPlace';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<ClientRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

function ClientRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/comment" element={<Comment />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

function AdminRoutes() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const role = sessionStorage.getItem('role');
    if (role === "Admin") {
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else {
      setIsLoggedIn(false);
      setIsAdmin(false);
      navigate("/Login");
    }
  }, [navigate]);
  return (
    <>
    {isLoggedIn && isAdmin && <Sidebar />}
    <Routes>
      {isLoggedIn && isAdmin && (
       <>
        <Route path="/" element={<Dashboard />} />
        <Route path="/places" element={<Places />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/createplace" element={<CreatePlace />} />
        <Route path="/editplace/:placeId" element={<EditPlace />} />
        <Route path="*" element={<Error />} />
    </>
    )}
    <Route component={Error} />
    </Routes>
    </>
  );
}

export default App;
