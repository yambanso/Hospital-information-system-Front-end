import React from 'react';
import './doctor.css'
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Home/Home';
import SideBar from './sideBar/SideBar';
import Patienthistory from '../components/patients/Patienthistory';

export default function Doctor() {
  return (
      <BrowserRouter>
      <div className="doctor">
          <SideBar />
          <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/Patient_history/:patient_id" element={<Patienthistory />} />
          </Routes>

      </div>
      </BrowserRouter>
  )
}
