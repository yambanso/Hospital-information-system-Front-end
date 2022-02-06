import React from 'react';
import './doctor.css'
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Home/Home';
import SideBar from './sideBar/SideBar';

export default function Doctor() {
  return (
      <BrowserRouter>
      <div className="doctor">
          <SideBar />
          <Routes>
          <Route path="/" element={<Home />}/>
          </Routes>

      </div>
      </BrowserRouter>
  )
}
