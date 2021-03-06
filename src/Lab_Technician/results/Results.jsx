import * as React from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Pdetails from "../../Doctor/Consult/Pdetails";
import './results.css'
import { CircularProgress, TextareaAutosize } from '@material-ui/core';
import { Link} from 'react-router-dom';
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { api_URL } from '../../apiCalls';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';



/**
 * @description this is a data validation blueprint used to validate data from the form 
 **/
const schema = yup.object().shape({
    lab_results : yup.string().required(),
})

/**
 * @description  initializing the MuiAlert for our snackbar 
 **/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});

/**
 * @function Results
 * @returns Page where the Lab technician can record Lab results
 */
export default function Results () {
    const history = useNavigate();
    const location = useLocation();
    const [isWritting , setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Visit Description saved...");
    const [type, setType] = React.useState("success")
    
    /**
     * @constant user
     * @description calling the AuthContext object and passing it to the user context 
     **/
    const user = useContext(AuthContext);
    const token = user.user.Token;
    
    
    /**
     * @description this line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
     **/
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver : yupResolver(schema),
    });

    /**
     * @event handleClose
     * @description this function is used to close the snackbar 
     **/
    const handleClose = (event , reason) => {
        if(reason = 'clickaway'){
            setOpen(false)
            return
        }
        setOpen(false)
    }

    /**
     * @event onSubmit
     * @description this function isused to submit the lab results 
    */
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
                        <span className='infarea' style={{paddingTop : "10px"}}>{location.state.item.Test_Order}</span>
                                

                    </div>
                    <div className="case" style={{flexDirection : "column"}}>
                        <span className="Hed" style={{marginLeft : "40%"}}>Test Results</span>
                        <form onSubmit={handleSubmit(onSubmit)} className="frm" style={{flexDirection : "column"}} >
                         <div className="txt">   
                        <TextareaAutosize style={{width : "500px", marginLeft : "25%"}} className='area' name='lab_results' placeholder='Please enter test results' {...register("lab_results",{required: "Required"})} minRows={5}/>
                        <span className='errors'>{errors.Description?.message}</span>
                        </div>
                        <div className="consultBtn" style={{marginLeft : "40%"}}>
                       
            
                        <button type='submit' className='submit'  disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Save"}</button>
                       
                        <Link to='/'>
                                 <button className="backBtn" style={{marginLeft : "50px"}}>
                                     Cancel
                                </button>
                                 </Link>
                                 </div>

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
                {/** @description creating a snackbar used to provide feedback to the user */}<Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : "center"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity={type} sx={{width:'100%'}}>
                         {message}
                    </Alert>
                </Snackbar>
                </>

        </div>
    )
}