import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import { AccessTime } from '@material-ui/icons'
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import { patientsRows } from '../../data/tableData';
import { getPatients } from '../../apiCalls'
import './patients.css'
import { useStyles } from '../../data-gridStyle';
import PatientHistoryBtn from './PatienHistoryBtn';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function Patients() {
    const classes = useStyles();
    const [Data, setdata] =  useState(patientsRows);
    const user = useContext(AuthContext);  

    const fetchData = async () => {      
      getPatients.get('/').then(res =>{
        setdata(res.data)
    })
    }

    useEffect(() => {
      fetchData()
    }, [])

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
                    <PatientHistoryBtn role={user.user.user.Role} />
                    </Link>                  

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
            <DataGrid
                            className={classes.root}
                            rows={Data}
                            components = {{
                              Toolbar : GridToolbar
                            }}
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
