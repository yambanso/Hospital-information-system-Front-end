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
                    
                    <Route path="/Admin" element={<Home />}/>

                    <Route path="/Admin/users" element={<Adminuser />}/>

                    <Route path="/Admin/new_user" element={<Adduser />}/>

                    <Route path="/Admin/Edit_user/:user_ID" element={<Edituser />}/>
                
                    <Route path="/Admin/patients" element={<Patients />}/>

                    <Route path="/Admin/new_patient" element={<AddPatient />}/>

                    <Route path="/Admin/Edit_patient/:patient_ID" element={<EdditPatient />}/>

                    <Route path="/Admin/medicines" element={<Medicines />}/>

                    <Route path="/Admin/new_medicines" element={<Addmeds />}/>

                    <Route path="/Admin/Edit_medicine/:medicine_ID" element={<EditMeds />}/>

                    <Route path="/Admin/services" element={<Services/>}/>

                    <Route path="/Admin/Edit_service/:service_ID" element={<EditService />}/>

                    <Route path="/Admin/Patient_history/:patient_id" element={<Patienthistory />} />

                    <Route path="/Admin/Consultation_history/:user_id" element={<History/>}/>

                    <Route path="/Admin/Visit_Details/:visit_id" element={<VisitDay/>}/>
                    

                </Routes>            
            </div>
        </BrowserRouter>
    )
}
