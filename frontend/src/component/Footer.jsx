import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h5 className="font-bold">Quick Links</h5>
            <ul className="mt-2">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-4 md:mb-0">
            <h5 className="font-bold">Company Info</h5>
            <p className="mt-2">Chat App Inc.</p>
            <p>123 Chat St., Communication City</p>
            <p>Email: support@chatapp.com</p>
          </div>

          <div className="text-center">
            <p className="text-sm">&copy; {new Date().getFullYear()} Chat App. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
