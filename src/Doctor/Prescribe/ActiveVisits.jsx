import React from 'react';
import './active.css'
import { 
    LocalPharmacy
} from '@material-ui/icons'
import { useState , useEffect} from 'react'
import { getWithoutPrescriptions } from '../../apiCalls'
import { useStyles } from '../../data-gridStyle'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { Link } from 'react-router-dom';

/**
 * @function ActiveVisits
 * @returns Active visits page
 */

export default function ActiveVisits() {
const [data , setData] =  useState([])

/**
 * @constant userColumn
 * @description this is array is used as a blue print to display in our datatable
 * 
*/
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
                {/** this link takes the Doctor to a page where he can give prescription to this un prescribed visit */}                
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
/**
 * @function fetchData
 * @description this function fetches data from the Api sets state to different variable for the page 
 * 
*/
    const fetchData = () => {
    getWithoutPrescriptions.get('/').then(res => {
        setData(res.data)
            })
}
/**
 * @description this function is called after first page render and is call the fetchdata method to fetch data from the API 
 **/
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
              {/** @description the Datagrid is a custom component that is used to Display data in a table */}                        
            <DataGrid
                            className={classes.root}
                            rows={data}
                            components = {{
                              Toolbar : GridToolbar
                            }}
                            columns={userColumn}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                        />
                        </div>

            </div>
  )
}
