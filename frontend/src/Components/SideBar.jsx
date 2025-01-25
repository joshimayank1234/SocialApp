import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, User, Settings, Users, Bell, Bookmark } from 'lucide-react';

const SideBar = () => {
  const location = useLocation();
  
  const isActiveLink = (path) => {
    return location.pathname === path ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50';
  };

  return (
    <div className="h-screen bg-white border-r border-gray-200 w-64 fixed left-0 p-4">
      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActiveLink('/')}`}
              >
                <Home className="h-5 w-5 mr-3" />
                <span className="font-medium">Feed</span>
              </Link>
            </li>
            
            <li>
              <Link
                to="/account"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActiveLink('/account')}`}
              >
                <User className="h-5 w-5 mr-3" />
                <span className="font-medium">Account</span>
              </Link>
            </li>

            <li>
              <Link
                to="/friends"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActiveLink('/friends')}`}
              >
                <Users className="h-5 w-5 mr-3" />
                <span className="font-medium">Friends</span>
              </Link>
            </li>

            <li>
              <Link
                to="/notifications"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActiveLink('/notifications')}`}
              >
                <Bell className="h-5 w-5 mr-3" />
                <span className="font-medium">Notifications</span>
              </Link>
            </li>

            <li>
              <Link
                to="/saved"
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActiveLink('/saved')}`}
              >
                <Bookmark className="h-5 w-5 mr-3" />
                <span className="font-medium">Saved Posts</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Settings Link at Bottom */}
        <div className="pt-4 border-t border-gray-200">
          <Link
            to="/settings"
            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActiveLink('/settings')}`}
          >
            <Settings className="h-5 w-5 mr-3" />
            <span className="font-medium">Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SideBar;