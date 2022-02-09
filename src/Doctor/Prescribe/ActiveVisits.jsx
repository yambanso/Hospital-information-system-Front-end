import React from 'react';
import './active.css'
import { 
    LocalPharmacy
} from '@material-ui/icons'
import { useState , useEffect} from 'react'
import { getWithoutPrescriptions } from '../../apiCalls'
import { useStyles } from '../../data-gridStyle'
import { DataGrid } from '@material-ui/data-grid'
import { Link } from 'react-router-dom';



export default function ActiveVisits() {
const [data , setData] =  useState([])

const userColumn = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'patient_id',
      headerName: 'Patient ID',
      width: 150,
    },
    {
      field: 'Description',
      headerName: 'Description',
      width: 220,
    },
    {
      field: 'lab_results',
      headerName: 'Lab Results',
      width: 220,
    },
    {
        field: 'visit_day',
        headerName: 'Visit Day',
        width: 150,
      },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 300,
        renderCell  : (params)=>{
                               
            return(
                <>
                
                <Link to = {"/create_Prescription/"+ params.id} state={{item : params.row}}>                  
                   <button className="displayBtn">
                        <LocalPharmacy className='displayIcon'/>
                            Prescribe
                        </button>   
                        </Link>
                </>
                )
        }
    }
];

const fetchData = () => {
    getWithoutPrescriptions.get('/').then(res => {
        setData(res.data)
            })
}
useEffect(()=>{
    fetchData()
},[])

const classes = useStyles();

  return (
    <div className="visits">
        <div className="headin">
                        <span className="Textt">Visits Without Prescriptions</span>                
                </div>
            <div className="DataTable">
            <DataGrid
                            className={classes.root}
                            rows={data}
                            columns={userColumn}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                        />
                        </div>

            </div>
  )
}
