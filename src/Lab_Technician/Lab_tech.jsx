import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import Home from "./home/Home"
import Results from "./results/Results"

export default function Lab_tech (){
    return (
        <div className="labTech">
            <BrowserRouter>
            <Routes>
                
                <Route path= "/" element={<Home />} />

                <Route path = "/lab_Results/:id" element={<Results />} />

                <Route path = "*" element={<Home />} />

            </Routes>
            </BrowserRouter>
        </div>
    )
}