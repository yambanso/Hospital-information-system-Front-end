import React, { useState } from 'react'
import { PermIdentity,CalendarToday,PhoneAndroid,LocationSearching } from '@material-ui/icons';
import { getPatients } from '../../apiCalls';
import {Bloodtype,LibraryBooks} from '@mui/icons-material';
import { useEffect } from 'react';
/**
 * @function Pdetails
 * @param {patient_id} props 
 * @returns patient details component
 */
export default function Pdetails(props) {
    const [patient ,  setPatient] = useState();
    
    /**
     * @funtion fetchData
     * @description this function fetches data from the Api sets state to different variable for the page 
     **/
    const fecthdata =() => {
        getPatients.get('/'+ props.patient_id).then(res => {
            setPatient(res.data);
        })
    }

    /** @description this function is called after first page render and is call the fetchdata method to fetch data from the API */
    useEffect(() => {
        fecthdata()
    },[])
 return (
     <>
    <div className="pShowTop"> 
    <PermIdentity className='pIcon'/>
    <div className="showPname">{patient != null ? patient.firstname : ""} {patient != null ? patient.surname : ""}</div>
</div>


<div className="pSHowBtm">
    <div className="pshowInfo">
        <CalendarToday  className = "pIcon"/>
        <span className="info">{patient != null ?patient.Dob : ""}</span>
    </div>

     
    <div className="pshowInfo">
        <Bloodtype  className = "pIcon"/>
        <span className="info">{patient != null ? patient.blood_group : ""}</span>
    </div>

    
    <div className="pshowInfo">
        <LibraryBooks  className = "pIcon"/>
        <span className="info">{patient != null ? patient.Medical_scheme : ""}</span>
    </div>

    <div className="pshowInfo">
        <PhoneAndroid  className = "pIcon"/>
        <span className="info">{patient != null ? patient.Phonenumber : ""}</span>
    </div>

    <div className="pshowInfo">
        <LocationSearching  className = "pIcon"/>
        <span className="info">{patient != null ?patient.address : ""}</span>
    </div>
</div>
</>
    
  )
}
