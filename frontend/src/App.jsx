import React, { useState,useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Components
import NavBar from './Components/NavBar';
import SideBar from './Components/SideBar';

// Pages
import Account from './pages/Account';
import Feed from './pages/Feed';
import SavedPost from './pages/SavedPost';

export default function App() {
    const[LogedIn,setLogedIn]=useState(false)
    let[addedPost,setAddedPost]=useState()

    useEffect(()=>{
        let user=JSON.parse(localStorage.getItem("user"))
        if(user){
          setLogedIn(true)
        }
    },[])
  return (
    <div className="min-h-screen bg-gray-50">
      <BrowserRouter>
        <div className="flex">
          {/* Sidebar - hidden on mobile, visible on desktop */}
          <div className="hidden md:flex w-64 flex-shrink-0">
            <SideBar />
          </div>
          
          {/* Main content area */}
          <div className="flex-1">
            {/* Fixed navbar at top */}
            <NavBar />
            
            {/* Main content with padding */}
            <main className="p-4 md:p-8">
              <Routes>
                {
                  LogedIn?
                  <Route path='/' element={<Feed setAddedPost={setAddedPost}/>}/>:
                  <Route path='/' element={<Account/>}/>
                }
                
                <Route path="/Account" element={<Account/>} />
                <Route path="/Saved" element={<SavedPost addedPost={addedPost}/>} />

                {/* Add more routes as needed */}
                <Route path="*" element={<div>404 - Page Not Found</div>} />
              </Routes>
            </main>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}