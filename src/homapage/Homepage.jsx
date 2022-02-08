import React from 'react';
import { useState } from 'react';
import Admin from '../admin/Admin';
import Doctor from '../Doctor/Doctor'
import TopBar from '../components/topBar/TopBar';
import Sign_in from '../Sign_in/Sign_in';

export default function Homepage() {
const [Role, setRole] = useState(null);

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
                            'Doctor': < Doctor />
                          }[Role]}
                      </> : <Sign_in upRole={updateRole}/>}
          
      </div>
  )
}
