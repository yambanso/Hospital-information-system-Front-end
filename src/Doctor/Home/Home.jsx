import React from 'react';
import './home.css'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import { AccessTime } from '@material-ui/icons'
import { DataGrid } from '@material-ui/data-grid';
import { patientsRows } from '../../data/tableData';
import { useStyles } from '../../data-gridStyle';

export default function Home() {

  const classes = useStyles();
    const [Data, setdata] =  useState(patientsRows);

    const handleChange = (name) =>{
        setdata(Data.filter((item) => item.name.toLowerCase().includes(name)));
    }
   

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
            field: 'next_of_kin_contact',
            headerName: 'Next of Kin Contact',
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


                            <button className="ListEdit">Consult
                              </button>
                          

                  </>
                  )
          }
      }
    ];


  return (
      <div className="home">
        <div className="HomeTop">
                <div className="homeInput">
                    
                      <input  type="text" placeholder='enter patient name....' onChange={ event =>handleChange(event.target.value)} />
                </div>
                </div>

        <div className="homeBtm">
            <div className="homeTable">
            <DataGrid
                            className={classes.root}
                            rows={Data}
                            columns={patientColumns}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                        />
            </div>
            </div>        
            


      </div>
  )
}
