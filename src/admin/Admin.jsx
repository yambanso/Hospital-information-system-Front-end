import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Addmeds from '../components/addMedicine/Addmeds'
import AddPatient from '../components/addPatient/AddPatient'
import Adduser from '../components/addUser/Adduser'
import Medicines from '../components/Medicines/Medicines'
import Patients from '../components/patients/Patients'
import Services from '../components/Services/Services'
import Adminuser from '../components/Users/Adminuser'
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
                
                    <Route path="/Admin/patients" element={<Patients />}/>

                    <Route path="/Admin/new_patient" element={<AddPatient />}/>

                    <Route path="/Admin/medicines" element={<Medicines />}/>

                    <Route path="/Admin/new_medicines" element={<Addmeds />}/>

                    <Route path="/Admin/services" element={<Services/>}/>
                </Routes>            
            </div>
        </BrowserRouter>
    )
}
