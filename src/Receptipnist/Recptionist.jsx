import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddPatient from "../components/addPatient/AddPatient"
import Sidebar from "./Sidebar/Sidebar"
import "./receptionist.css"
import Home from "./Home/Home"
import Invoice from "./Invoice/invoice"
import Print from "./Invoice/Print"
export default function Receptionist () {
    return(
        <BrowserRouter>
        <div className="receptionist">
            {/** calling the receptionist sidebar nav */}
            <Sidebar />
            <div className="content">
                
                    <Routes>
                        {/** creating routes that routes our user to different pages */}

                        <Route path="/" element={<Home />}/>

                        <Route path="/new_Client" element={<AddPatient />} />

                        <Route path="/invoice" element={<Invoice />} />

                        <Route path="/print/:id" element={<Print />} />

                        <Route path="*" element={<Home />}/>
                    </Routes>
                </div>    
                           
        </div>
        </BrowserRouter>
    )

}