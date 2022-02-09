import React from 'react';
import './doctor.css'
import SideBar from './sideBar/SideBar'
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Home/Home';
import Patienthistory from '../components/patients/Patienthistory';
import Consult from './Consult/Consult';
import ActiveVisits from './Prescribe/ActiveVisits';
import Prescribe from './Consult/Prescribe';

export default function Doctor() {
  return (
      <BrowserRouter>
      <div className="doctor">
          <SideBar/>
          <div className="content">
          <Routes>

          <Route path="/" element={<Home />}/>

          <Route path="/Patient_history/:patient_id" element={<Patienthistory />} />

          <Route path="/Consults/:patient_id" element={<Consult />} />

          <Route path="/prescriptions" element={<ActiveVisits />}/>

          <Route path= "/create_Prescription/:id" element={<Prescribe />} />

          </Routes>
          </div>
      </div>
      </BrowserRouter>
  )
}
