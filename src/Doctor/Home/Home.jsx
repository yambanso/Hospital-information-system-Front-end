import React, { useEffect } from 'react';
import './home.css'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { AccessTime } from '@material-ui/icons'
import { patientsRows } from '../../data/tableData';
import { getPatients } from '../../apiCalls'
import Datatable from '../../Receptipnist/Home/Data-table';

export default function Home() {

    const [Data, setdata] =  useState(patientsRows);

    {/** this function fetches data from the Api sets state to different variable for the page */}
    const fetchData = () =>{
      getPatients.get('/').then(res =>{
        setdata(res.data)
    })
    }

    {/** this function is called after first page render and is call the fetchdata method to fetch data from the API */}
    useEffect(() =>{
      fetchData();
    },[])
   

    {/** this is array is used as a blue print to display in our datatable*/}
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
                  {/** this button takes the doctor to a page where he can view the patients medical */}
                  <Link to={"/Patient_history/"+params.id} state={{item:params.row}}>
                    <button className="displayBtn">
                    <AccessTime className='displayIcon'/>
                    History
                 </button>
                  </Link>

                        {/** this button takes the Doctor the a page where he can record patients consultation details */}
                        <Link to = {"/Consults/"+params.id} state={{item : params.row}}>
                            <button className="ListEdit">Consult
                              </button>
                              </Link>  

                  </>
                  )
          }
      }
    ];


  return (
      <div className="home">
        <div className="HomeTop">
                <div className="homeInput">
                    
                      <span className="heading">Consultation</span>
                </div>
                </div>

        <div className="homeBtm">
            <div className="homeTable">
              {/** the Datatable is a custom component that is used to Display data in a table */}
            <Datatable Data={Data} columns={patientColumns}/>
            </div>
            </div>        
            


      </div>
  )
}
