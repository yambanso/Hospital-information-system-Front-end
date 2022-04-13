import React from 'react';
import { useState } from 'react';
import Admin from '../admin/Admin';
import Doctor from '../Doctor/Doctor'
import TopBar from '../components/topBar/TopBar';
import Sign_in from '../Sign_in/Sign_in';
import Lab_tech from '../Lab_Technician/Lab_tech';
import Pharma from '../pharmacist/Pharma';
import Receptionist from '../Receptipnist/Recptionist';

export default function Homepage() {
const [Role, setRole] = useState(null);

/** this function set the value for the users role */
const updateRole = (role) => {
        setRole(role)
}

  
  return (
      <div>

        {Role != null ? <>
                        <TopBar upRole={updateRole}/>
                        {
                          {
                            'Admin' : <Admin />,
                            'Doctor': < Doctor />,
                            'Lab_Technician' : <Lab_tech />,
                            'Pharmacist' : <Pharma />,
                            'Receptionist' : <Receptionist />
                          }[Role]}{/** this switch chooses what component to be called into this component based on the value of Role */}
                      </> : <Sign_in upRole={updateRole}/>}{/** if Role is null we render the signin component meaning that the user is not signed in */}
          
      </div>
  )
}
