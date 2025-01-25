import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Account() {
  const [LogedIn, setLogedIn] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [LoggedInUser, setLogedInUser] = useState({});

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLogedIn(true);
      setLogedInUser(user);
    }
  }, []);

  async function SignUpHandle(e) {
    e.preventDefault();
    let signUpData = {
      username: e.target[0].value,
      FullName: e.target[1].value,
      password: e.target[2].value,
      avtar: e.target[3].value
    };
    let res = await axios.post('http://localhost:5500/api/user',signUpData);
    setLogedIn(true);
    let user = res.data;
    localStorage.setItem("user", JSON.stringify(user));
    setLogedInUser(user);
  }

  async function signInHanle(e) {
    e.preventDefault();
    let signInData = {
      username: e.target[0].value,
      password: e.target[1].value
    };
    let signRes = await axios.post('http://localhost:5500/api/user/login',signInData);
    let user = signRes.data.user;
    setLogedInUser(user);
    setLogedIn(true);
    localStorage.setItem("user", JSON.stringify(user));
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center px-4 ">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        {!LogedIn ? (
          <>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Welcome Back
              </h2>
              
              <div className="flex bg-gray-100 rounded-lg p-1 mb-8">
                <button
                  onClick={() => setIsSignIn(true)}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    isSignIn
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setIsSignIn(false)}
                  className={`flex-1 py-2 px-4 rounded-md transition-colors ${
                    !isSignIn
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {isSignIn ? (
              <form className="space-y-6" onSubmit={signInHanle}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    autoComplete="none"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="none"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign In
                </button>
              </form>
            ) : (
              <form className="space-y-6" onSubmit={SignUpHandle}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder="Username"
                    autoComplete="username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    autoComplete="name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="new-password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="url"
                    placeholder="Profile Picture URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </button>
              </form>
            )}
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <img
                src={LoggedInUser.avtar}
                alt={LoggedInUser.FullName}
                className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
              />
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {LoggedInUser.FullName}
                </h2>
                <p className="text-gray-600">@{LoggedInUser.username}</p>
              </div>
            </div>
            <button
              onClick={() => {
                localStorage.removeItem("user");
                setLogedIn(false);
                setLogedInUser({});
              }}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}