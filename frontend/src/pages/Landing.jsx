
import React from "react";
import { Link } from "react-router-dom";
import chatImage from "../assets/landing.png"; 

const Landing = () => {
  
  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-6">
      <h1 className="text-5xl font-bold mb-4">Welcome to Chat App</h1>
      <p className="mb-8 text-lg text-center">
        Connect with friends and family in real-time. Join the conversation and never miss a moment.
      </p>
      <img
        src={chatImage}
        alt="Chat Illustration"
        className="w-full max-w-md mb-6"
      />
      <Link to="/login" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-200">
        Get Started
      </Link>
    </div>
  );
};

export default Landing;

   