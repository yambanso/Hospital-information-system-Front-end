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

    const fetchData = () =>{
      getPatients.get('/').then(res =>{
        setdata(res.data)
    })
    }

    useEffect(() =>{
      fetchData();
    },[])
   

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
                  <Link to={"/Patient_history/"+params.id} state={{item:params.row}}>
                    <button className="displayBtn">
                    <AccessTime className='displayIcon'/>
                    History
                 </button>
                  </Link>

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
            <Datatable Data={Data} columns={patientColumns}/>
            </div>
            </div>        
            


      </div>
  )
}
