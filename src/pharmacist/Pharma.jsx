import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Prescription from "./Prescription/Prescription";

export default function Pharma () {
    return(
        <div className="pharma">
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />

                <Route path="*" element={<Home />} />

                <Route path = "/Prescription/:id" element = {<Prescription />} />

            </Routes>
            </BrowserRouter>
        </div>
    )
}