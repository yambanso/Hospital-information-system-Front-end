import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { patientsRows } from '../../data/tableData';
import { getPatients } from '../../apiCalls'
import './patients.css'
import PatientHistoryBtn from './PatienHistoryBtn';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Datatable from '../../Receptipnist/Home/Data-table';
/**
 * @function patients
 * @returns view patients page
 */
export default function Patients() {
    const [Data, setdata] =  useState(patientsRows);
    /**
     *@description  calling the AuthContext object and passing it to the user context 
     *
     **/
        const user = useContext(AuthContext);  

    /**
     * @function fetchData
     * @description this function fetches data from the Api sets state to different variable for the page 
     * 
    */
    const fetchData = async () => {      
      getPatients.get('/').then(res =>{
        setdata(res.data)
    })
    }

    /**
     * 
     * @description this function is called after first page render and is call the fetchdata method to fetch data from the API 
     * 
    */
    useEffect(() => {
      fetchData()
    }, [])

   

    /**
     * @constant patientColumns
     * @description this is array is used as a blue print to display in our datatable
     **/
    const patientColumns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          valueGetter: (params)=>  params.row.firstname + " " + params.row.surname,
          
        },
        {
            field: 'blood_group',
            headerName: 'Blood Group',
            width: 150,

        },
          {
          field: 'Dob',
          headerName: 'Date of Birth',
          width: 110,
        },{
            field: 'Medical_scheme',
            headerName: 'Medical Scheme',
            width: 150
        },
        {
          field: 'Phonenumber',
          headerName: 'Contact',
          width: 150,
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 130,
        },{
          field: 'actions',
          headerName: 'Actions',
          width: 300,
          renderCell  : (params)=>{
           return(
                  <>

                  {/** this button takes the user to page where he can view clients medical history and passing clients data as state  */}                    
                  <Link to={"/Patient_history/"+params.id} state={{item:params.row}}>
                    <PatientHistoryBtn role={user.user.user.Role} />{/** here we are impoting a custom button to view medical history and passing in the current user's role*/}
                    </Link>                  

                  {/** this button takes the user to page where he can edit clients info and passing clients data as state  */}                    
                  <Link 
                            to={"/Edit_patient/"+params.row.id} 
                            state={{item : params.row}}
                        >
                            <button className="ListEdit">Edit</button>
                            </Link>

                  </>
                  )
          }
      }
    ];

    
  return (
    <div className='patients'>
        <div className="patientTop">
                <div className="patientInput">
                    
                        <span className="heading">Clients</span>
                                     </div>
                </div>

        <div className="patientBtm">
            <div className="patientTable">
              {/** 
               * @description the Datatable is a custom component that is used to Display data in a table and passing in the data and the columns 
               **/}
              <Datatable Data={Data} columns={patientColumns} />
            </div>
            </div>        
            

</div>
  ) 
}
