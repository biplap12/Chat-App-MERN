import React, { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from "react-hot-toast";

const Profile = () => {
  const { authUser } = useAuthContext();
  const { id } = useParams(); // Get the user ID from the URL params
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    cPassword: "",
    profilePic: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (authUser) {
      setUserData({
        username: authUser.username,
        email: authUser.email,
        profilePic: authUser.profilePic || "",
        password: "",
        cPassword: "",
      });
    }
  }, [authUser]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (userData.password && userData.password !== userData.cPassword) {
        toast.error("Passwords do not match");
        return;
      }

      const response = await fetch(`/api/users/update/${authUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json(); // Parse JSON response

      if (!response.ok) {
        toast.error(data?.error || "Failed to update profile");
        throw new Error(data?.error || "Failed to update profile");
      }

      toast.success("Profile updated successfully");
      setIsEditing(false); 
    } catch (error) {
      console.error("Error updating profile:", error.message);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-center">Profile</h1>
      <div className="flex flex-col items-center mb-4">
        {userData.profilePic && (
          <img
            src={userData.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full mb-4 border-2 border-blue-500"
          />
        )}
        {!isEditing ? (
          <>
            <p className="text-lg">
              <strong>Username:</strong> {userData.username}
            </p>
            <p className="text-lg">
              <strong>Email:</strong> {userData.email}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded transition duration-200 hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-3">
              <label className="block text-gray-700 mb-1">Username:</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                onChange={handleInputChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1">Email:</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1">Password (leave blank to keep current):</label>
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-3">
              <label className="block text-gray-700 mb-1">Confirm Password:</label>
              <input
                type="password"
                name="cPassword"
                value={userData.cPassword}
                onChange={handleInputChange}
                className="border rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-white text-green-600 border border-green-600 px-4 py-2 rounded transition duration-200 hover:bg-green-600 hover:text-white"
              >
                <FaCheck style={{ fontSize: '24px' }} />
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-white text-red-600 border border-red-600 px-4 py-2 rounded transition duration-200 hover:bg-red-600 hover:text-white"
              >
                <FaTimes style={{ fontSize: '24px' }} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
