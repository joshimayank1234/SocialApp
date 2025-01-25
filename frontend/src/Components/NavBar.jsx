import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, HelpCircle, User } from 'lucide-react';

const NavBar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <Link to="/" className="flex items-center">
            <h2 className="text-xl font-bold text-blue-600">Social App</h2>
          </Link>

          {/* Navigation Items */}
          <ul className="flex items-center space-x-6">
            <li>
              <Link 
                to="/help" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <HelpCircle className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Help</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/chat" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <MessageCircle className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Chat</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/profile" 
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                <User className="h-5 w-5 mr-1" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;