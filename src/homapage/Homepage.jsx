import React from 'react';
import { useState } from 'react';
import Admin from '../admin/Admin';
import TopBar from '../components/topBar/TopBar';
import Sign_in from '../Sign_in/Sign_in';

export default function Homepage() {
const [Role, setRole] = useState(null);

const updateRole = (role) => {
        setRole(role)
        console.log(role);
}
  
  return (
      <div>
        {Role != null ? <>
                        <TopBar upRole={updateRole}/>
                        <Admin/>
                      </> : <Sign_in upRole={updateRole}/>}
          
      </div>
  )
}
