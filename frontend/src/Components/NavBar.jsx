import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, HelpCircle, LogOut, Settings, User as UserIcon } from 'lucide-react';

const NavBar = () => {
  let [profile, setProfile] = useState(null); // Default to null
  let [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setProfile(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    // Add logout logic here
  };

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
            <li className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
              >
                {/* Conditionally render profile image and name */}
                {profile?.avtar ? (
                  <img
                    src={profile.avtar}
                    alt="Profile"
                    className="h-8 w-8 rounded-full mr-2 object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gray-200 mr-2 flex items-center justify-center">
                    <UserIcon className="h-4 w-4 text-gray-500" />
                  </div>
                )}
                <span className="hidden sm:inline">
                  {profile?.FullName || "Guest"}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <UserIcon className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
