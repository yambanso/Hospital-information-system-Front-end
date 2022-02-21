import { PermIdentity,CalendarToday,PhoneAndroid,LocationSearching } from '@material-ui/icons';
import * as React from 'react';
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Bloodtype,LibraryBooks} from '@mui/icons-material';
import { CircularProgress, TextareaAutosize } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './consult.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { getMedicine , api_URL } from '../../apiCalls'
import { useContext } from 'react';
import { useStyles } from '../../data-gridStyle'
import { AuthContext } from '../../context/AuthContext';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import Pdetails from './Pdetails';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});


export default function Prescribe() {
    const [isWritting , setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Visit Prescription created...");
    const [type, setType] = React.useState("success")


    const [data, setdata] = useState([]);
    const [select, setSelection] = useState([]);
    

    const location = useLocation();
    const ID = location.state.item.id;
    const user = useContext(AuthContext);
    const token = user.user.Token;
    const classes = useStyles();

    const handleClose = (event , reason) => {
        if(reason = 'clickaway'){
            setOpen(false)
            return
        }
        setOpen(false)
    }
    const fetchData = () => {
        getMedicine.get('/').then(res => {
            setdata(res.data)
        })        
    }

    const handleSubmit = () => {
        
    }
    

    useEffect(() => {
        fetchData()
    }, [])


    const userColumn = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
        },
        {
            field: 'Type',
            headerName: 'Type',
            width: 250,
          },
        {
          field: 'Price',
          headerName: 'Price (Kwacha)',
          width: 150,
        },
        
    ]

    const handleChange = () => {}

  return (
      <div className="consult">
          <div className="consultTitle">
              <Link to='/prescriptions'>
                  <button className="backBtn">
                      Back
                      </button>
              </Link>
              <h2 className='cTitle'>Prescribe</h2>
          </div>

          <div className="Container">
                    <div className="consultPatient">
                        <div className="frmItem">
                            <div className="frm">
                                <label>Patient Complaint</label>
                                <TextareaAutosize className='area' name='Description' value={location.state.item.Description} onChange={handleChange} placeholder='Please enter Patient Description' minRows={5}/>
    
                                
                            </div>
                            {location.state.item.lab_results != null ?
                            <div className="labResults">
                                <span className="head">Lab Results  : </span>
                                <span className="results">I didn't like the idea of creating a custom component, because if you have a different wrapping element you would have to createanother custom component etc. Also, it is just overkill. So I just did it with css and activeClassName:</span>
                              </div>
                            :<></>}

                            <div className="medicine">
                                <div className="top">
                                    <span className="tt">Prescribe Medicine</span>
                                </div>
                                
                                <div className="medicineTable">
                                <div className="table">
                                        <DataGrid
                                            className={classes.root}
                                            rows={data}
                                            components = {{
                                                Toolbar : GridToolbar
                                            }}
                                            columns={userColumn}
                                            pageSize={8}
                                            hideFooterPagination
                                            rowsPerPageOptions={[8]}
                                            checkboxSelection
                                            disableSelectAllCheckBox
                                            onSelectionModelChange={(ids) => {
                                                const selectionId = new Set(ids);
                                                const selectionRows = data.filter((row) => selectionId.has(row.id));
                                                setSelection(selectionRows);
                                            }
                                            }
                                            disableSelectionOnClick
                                        />
                                        </div>
                        <div className="prescribeBtnpad">
                            <button className="prscrbtn" onClick={()=>{
                                setWritting(true)
                                const arr = [];
                                {select.map((item,index) =>(
                                    arr.push({visitation_id : ID + "",
                                    medications_id : item.id+""})
                                ))}
                                    axios.post(api_URL+"/Visitation_prescriptions",{items : arr},{
                                        headers : {
                                            'Authorization' : "Bearer"+" "+token,
                                            'Content-Type' : 'application/json'
                                        }
                                    }).then(()=>{
                                        setWritting(false);
                                        setOpen(true);
                                    }).catch((err)=>{
                                    setWritting(false)
                                    setMessage("Failled to create visit prescription")
                                    setType("error")
                                    setOpen(true)})

                                

                            }} disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Prescribe"}</button>
                        </div>
                        </div>

                            </div>
                        </div>
                    </div>
                    <div className="patientShow">
                        <Pdetails patient_id ={location.state.item.patient_id} />                        
                    </div>
          </div>
          <>
                <Snackbar anchorOrigin={{
                    vertical : 'bottom',
                    horizontal : "left"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity={type} sx={{width:'100%'}}>
                         {message}
                    </Alert>
                </Snackbar>
                </>

      </div>
  )
}
