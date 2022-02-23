import * as React from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Pdetails from "../../Doctor/Consult/Pdetails";
import './results.css'
import { CircularProgress, TextareaAutosize } from '@material-ui/core';
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { api_URL } from '../../apiCalls';
import axios, { Axios } from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';



const schema = yup.object().shape({
    lab_results : yup.string().required(),
})

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});


export default function Results () {
    const history = useNavigate();
    const location = useLocation();
    const [isWritting , setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Visit Description saved...");
    const [type, setType] = React.useState("success")
    const user = useContext(AuthContext);
    const token = user.user.Token;
    
    
    console.log(location.state.item)
    
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver : yupResolver(schema),
    });

    const handleClose = (event , reason) => {
        if(reason = 'clickaway'){
            setOpen(false)
            return
        }
        setOpen(false)
    }

    const onSubmit = async(data) =>{
        setWritting(true)
        await axios.put(api_URL+"/Visitation/"+location.state.item.id,data,{
            headers : {
                'Authorization' : "Bearer"+" "+token
            }
        }).catch ((error) => {
            setWritting(false)
            setMessage("Failled to add Clients visit")
            setType("error")
            setOpen(true)
        }).then((res) =>{
            setWritting(false)
            setOpen(true)
            history(-1)
        })
    }

    return (
        <div className="result">

            <div className="topHeader">
                <button className="prevPage" onClick={() =>{
                    history(-1)
                }}>Back</button>
                <span className="topTitle">Lab Results</span>
            </div>

            <div className="view">
                <div className="lab_results">
                    <div className="case">
                        <span className="Hed">Test for : </span>
                        <TextareaAutosize className='infarea' name='Description' defaultValue={location.state.item.Test_Order} {...register("Description",{required: "Required"})} minRows={5}/>
                                

                    </div>
                    <div className="case">
                        <span className="Hed">Test Results</span>
                        <form onSubmit={handleSubmit(onSubmit)} className="frm">
                         <div className="txt">   
                        <TextareaAutosize className='area' name='lab_results' placeholder='Please enter test results' {...register("lab_results",{required: "Required"})} minRows={5}/>
                        <span className='errors'>{errors.Description?.message}</span>
                        </div>
                        <button type='submit' className='submit' disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Save"}</button>
                        </form>
                    </div>
                </div>
                
                <div className="patientShow">
                    <div className="item">
                    <span className="heading"> Patient Details </span>

                    <Pdetails patient_id ={location.state.item.patient_id} />
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