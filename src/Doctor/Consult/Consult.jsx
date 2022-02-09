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
import { api_URL } from '../../apiCalls';
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


export default function Consult() {
    const [isWritting , setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Visit Description saved...");
    const [type, setType] = React.useState("success")

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver : yupResolver(schema),
    });


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
    const onSubmit = async(data) =>{
        setWritting(true)
        try {
            let res = await axios.post(api_URL+"/Visitation",data,{
                headers : {
                    'Authorization' : "Bearer"+" "+token
                }
            }).then(() =>{
                setWritting(false)
                setOpen(true)
            })                
        } catch (error) {
            setWritting(false)
            setMessage("Operation Failled")
            setType("error")
        }
        
    } 

    


  return (
      <div className="consult">
          <div className="consultTitle">
              <h2 className='cTitle'>Counsult Patient</h2>
              <Link to='/'>
                  <button className="backBtn">
                      Back
                      </button>
              </Link>
          </div>

          <div className="Container">
                    <div className="consultPatient">
                        <div className="frmItem">
                            <form onSubmit={handleSubmit(onSubmit)} className="frm">
                                <input type="text" name='patient_id'value={pID} style={{display : "none"}} {...register("patient_id",{required: "Required"})} />
                                <label>Patient Complaint</label>
                                <div className="txt">
                                <input type="textarea" className='area' name='Description' placeholder='Please enter Patient Description' {...register("Description",{required: "Required"})}/>
                                <span className='errors'>{errors.Description?.message}</span>
                                </div>
                                <button type='submit' className='submit' disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Save"}</button>
                            </form>
 
                        </div>
                    </div>
                    <div className="patientShow">

                        <div className="pShowTop"> 
                            <PermIdentity className='pIcon'/>
                            <div className="showPname">{location.state.item.firstname} {location.state.item.surname}</div>
                        </div>

                        <div className="pSHowBtm">
                            <div className="pshowInfo">
                                <CalendarToday  className = "pIcon"/>
                                <span className="info">{location.state.item.Dob}</span>
                            </div>

                            <div className="pshowInfo">
                                <PhoneAndroid  className = "pIcon"/>
                                <span className="info">{location.state.item.Phonenumber}</span>
                            </div>

                            <div className="pshowInfo">
                                <LocationSearching  className = "pIcon"/>
                                <span className="info">{location.state.item.address}</span>
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
