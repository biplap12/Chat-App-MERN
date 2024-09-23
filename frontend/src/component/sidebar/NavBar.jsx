import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import LogoutButton from "./LogoutButton";

const Navbar = () => {
  const { authUser, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleProfileClick = () => {
    navigate(`/profile/${authUser._id}`);
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <div className="text-lg font-semibold">Chat App</div>
      <div className="flex items-center gap-4">
        {authUser ? (
          <>
            <button onClick={handleProfileClick} className="hover:underline">
              {authUser.username}
            </button>
            <LogoutButton onClick={handleLogout} />
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/about" className="hover:underline">About</Link>
            <Link to="/contact" className="hover:underline">Contact</Link>
            <Link to="/login" className="hover:underline">Login</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
