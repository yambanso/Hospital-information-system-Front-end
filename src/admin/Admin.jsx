import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Addmeds from '../components/addMedicine/Addmeds'
import EditMeds from '../components/addMedicine/EditMeds'
import AddPatient from '../components/addPatient/AddPatient'
import EdditPatient from '../components/addPatient/EdditPatient'
import Adduser from '../components/addUser/Adduser'
import Edituser from '../components/addUser/Edituser'
import Medicines from '../components/Medicines/Medicines'
import Patienthistory from '../components/patients/Patienthistory'
import Patients from '../components/patients/Patients'
import EditService from '../components/Services/EditService'
import Services from '../components/Services/Services'
import Adminuser from '../components/Users/Adminuser'
import History from '../components/Users/History'
import VisitDay from '../components/VisitDetails/VisitDay'
import './admin.css'
import Home from './home/Home'
import Sidebar from './sidebar/Sidebar'


export default function Admin() {
    return (
        <BrowserRouter> 
            <div className='admin'>
                
                <Sidebar className='sidebar'/>
                <Routes>
                    
                    <Route path="/" element={<Home />}/>

                    <Route path='*' element={<Home />}/>

                    <Route path="/users" element={<Adminuser />}/>

                    <Route path="/new_user" element={<Adduser />}/>

                    <Route path="/Edit_user/:user_ID" element={<Edituser />}/>
                
                    <Route path="/patients" element={<Patients />}/>

                    <Route path="/new_patient" element={<AddPatient />}/>

                    <Route path="/Edit_patient/:patient_ID" element={<EdditPatient />}/>

                    <Route path="/medicines" element={<Medicines />}/>

                    <Route path="/new_medicines" element={<Addmeds />}/>

                    <Route path="/Edit_medicine/:medicine_ID" element={<EditMeds />}/>

                    <Route path="/services" element={<Services/>}/>

                    <Route path="/Edit_service/:service_ID" element={<EditService />}/>

                    <Route path="/Patient_history/:patient_id" element={<Patienthistory />} />

                    <Route path="/Consultation_history/:user_id" element={<History/>}/>

                    <Route path="/Visit_Details/:visit_id" element={<VisitDay/>}/>
                    

                </Routes>            
            </div>
        </BrowserRouter>
    )
}
