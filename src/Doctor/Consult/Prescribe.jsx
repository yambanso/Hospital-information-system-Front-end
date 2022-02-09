import { PermIdentity,CalendarToday,PhoneAndroid,LocationSearching } from '@material-ui/icons';
import * as React from 'react';
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './consult.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { api_URL, getPatients } from '../../apiCalls';
import { useContext } from 'react';
import { useStyles } from '../../data-gridStyle'
import { AuthContext } from '../../context/AuthContext';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { getMedicine } from '../../apiCalls'


const schema = yup.object().shape({
    Description : yup.string().required(), 
    patient_id : yup.string().required(),
})

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});


export default function Prescribe() {
    const [isWritting , setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Visit Description saved...");
    const [type, setType] = React.useState("success")
    
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver : yupResolver(schema),
    });

    const [data, setdata] = useState([]);
    const [patient, setPatient] =  useState()

    const location = useLocation();
    const pID = location.state.item.id;
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

        getPatients.get('/'+location.state.item.patient_id).then(res => {
            setPatient(res.data);
            console.log(location.state.item.patient_id)
        })
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
          field: 'Price',
          headerName: 'Price (Kwacha)',
          width: 150,
        },
        
    ]

    const handleChange = () => {}

  return (
      <div className="consult">
          <div className="consultTitle">
              <h2 className='cTitle'>Prescribe</h2>
              <Link to='/prescriptions'>
                  <button className="backBtn">
                      Back
                      </button>
              </Link>
          </div>

          <div className="Container">
                    <div className="consultPatient">
                        <div className="frmItem">
                            <div className="frm">
                                <label>Patient Complaint</label>
                                <input type="textarea" className='area' name='Description' value={location.state.item.Description} onChange={handleChange} placeholder='Please enter Patient Description' />
                                
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
                        <DataGrid
                            className={classes.root}
                            rows={data}
                            columns={userColumn}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            checkboxSelection
                            onSelectionModelChange={itm => console.log(itm)}
                            disableSelectionOnClick
                        />
                        </div>

                            </div>
                        </div>
                    </div>
                    <div className="patientShow">

                        <div className="pShowTop"> 
                            <PermIdentity className='pIcon'/>
                            <div className="showPname">patient.firstname patient.surname</div>
                        </div>
                        

                        <div className="pSHowBtm">
                            <div className="pshowInfo">
                                <CalendarToday  className = "pIcon"/>
                                <span className="info">patient.Dob</span>
                            </div>

                            <div className="pshowInfo">
                                <PhoneAndroid  className = "pIcon"/>
                                <span className="info">patient.Phonenumber</span>
                            </div>

                            <div className="pshowInfo">
                                <LocationSearching  className = "pIcon"/>
                                <span className="info">patient.address</span>
                            </div>

                        </div>
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
