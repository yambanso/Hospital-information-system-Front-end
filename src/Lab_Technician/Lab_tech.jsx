import { BrowserRouter, Route, Routes } from "react-router-dom"
import React from "react"
import Home from "./home/Home"
import Results from "./results/Results"
/**
 * @function Lab_tech
 * @returns Lab technicians module Routers
 */
export default function Lab_tech (){
    return (
        <div className="labTech">
            <BrowserRouter>
            <Routes>
                {/** @description defining the routes the lab technician can use to navigate to different pages */}
                <Route path= "/" element={<Home />} />

                <Route path = "/lab_Results/:id" element={<Results />} />

                <Route path = "*" element={<Home />} />

            </Routes>
            </BrowserRouter>
        </div>
    )
}