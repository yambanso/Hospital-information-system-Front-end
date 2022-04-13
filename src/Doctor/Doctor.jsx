import React from 'react';
import './doctor.css'
import SideBar from './sideBar/SideBar'
import {BrowserRouter, Routes,Route } from 'react-router-dom';
import Home from './Home/Home';
import Patienthistory from '../components/patients/Patienthistory';
import Consult from './Consult/Consult';
import ActiveVisits from './Prescribe/ActiveVisits';
import Prescribe from './Consult/Prescribe';
import VisitDay from '../components/VisitDetails/VisitDay'

export default function Doctor() {
  return (
      <BrowserRouter>
      <div className="doctor">
        {/* @description setting the side bar*/}
          <SideBar/>
          <div className="content">
          <Routes>
          {/* @description creating the routes for the admin window to different pages*/}
           <Route path="/" element={<Home />}/>

          <Route path="/Patient_history/:patient_id" element={<Patienthistory />} />

          <Route path="/Consults/:patient_id" element={<Consult />} />

          <Route path="/prescriptions" element={<ActiveVisits />}/>

          <Route path= "/create_Prescription/:id" element={<Prescribe />} />

          <Route path="/Visit_Details/:visit_id" element={<VisitDay/>}/>

          <Route path='*' element={<Home />}/>

          </Routes>
          </div>
      </div>
      </BrowserRouter>
  )
}
