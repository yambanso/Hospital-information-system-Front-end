import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddPatient from "../components/addPatient/AddPatient"
import Sidebar from "./Sidebar/Sidebar"
import "./receptionist.css"
import Home from "./Home/Home"
import Invoice from "./Invoice/invoice"
export default function Receptionist () {
    return(
        <BrowserRouter>
        <div className="receptionist">
            
            <Sidebar />
            <div className="content">
                
                    <Routes>

                        <Route path="/" element={<Home />}/>

                        <Route path="/new_Client" element={<AddPatient />} />

                        <Route path="/invoce" element={<Invoice />} />

                        <Route path="*" element={<Home />}/>
                    </Routes>
                </div>    
                           
        </div>
        </BrowserRouter>
    )

}