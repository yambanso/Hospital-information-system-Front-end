import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Prescription from "./Prescription/Prescription";
/**
 * @function Pharma
 * @returns Pharmacist module routes
 */
export default function Pharma () {
    return(
        <div className="pharma">
            <BrowserRouter>
            <Routes>
                {/**@description declaring the pages the pharmacist can navigate to */}
                <Route path="/" element={<Home />} />

                <Route path="*" element={<Home />} />

                <Route path = "/Prescription/:id" element = {<Prescription />} />

            </Routes>
            </BrowserRouter>
        </div>
    )
}