import * as React from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import  './addpatient.css';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { api_URL } from '../../apiCalls';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'


/**
 * @constructor schema
 *  @description this is a data validation blueprint used to validate data from the form 
 * 
*/
const schema = yup.object().shape({
  })

/** 
 * @description initializing the MuiAlert for our snackbar 
 **/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});

/**
 * @function EdditPatient
 * @param {*} props 
 * @returns eddit patient records page
 */

export default function EdditPatient(props) {
    const [isWritting, setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false) 
    const [doOpen ,setOpenn] = React.useState(false)
    const nav = useNavigate()

    /**
     * @constant AuthContext
     * @description calling the AuthContext object and passing it to the user context 
     **/
    const user = useContext(AuthContext);
    const token = user.user.Token;

    /**
     * @constant location
     * @description the variable is used to query data that is passed from the view medicine windows 
     **/
    const location = useLocation();

  /**
   * @description this line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
   **/
  const {register, handleSubmit, formState:{errors} }  = useForm({
    resolver : yupResolver(schema),
    });

        /**
         * @event onSubmit 
         * @description this function sends Data to our backend after form validation 
         **/
        const onSubmit = async(data) =>{
    setWritting(true)
    let res = await axios.put(api_URL+"/patients/"+location.state.item.id,data,{
        headers : {
            'Authorization' : "Bearer"+" "+token
        }
    }).catch(err => {
        setWritting(false)
        setOpenn(true)
        return;
    })
    setWritting(false)
    setOpen(true)
    nav('/')

}


/** 
 * @event handleClose
 * @description function is called whenever the user closes the snack bar 
 **/
const handleClose = (event,reason) => {
    if(reason === 'clickaway'){
        return;
    }
    setOpen(false)
    
    
}
/**
 * @event doClose
 *  @description function is called whenever the user closes the snack bar 
 **/
const doClose = (event,reason) => {
    if(reason ==='clickaway'){
        return;
    }
    setOpenn(false)
}


  return (
      /**
       * @return creating the edit patient form 
       **/
        <div className='addPatient'>
                        <div className="addUserTitle">
                <span className="heading"> Update Patient Record </span>
            </div>
            <div className="addPatientform">
              <form onSubmit={handleSubmit(onSubmit)} className="patientForm">
              <div className="newPatientItem">
                    <label >FirstName</label>
                    <input type="text" name="firstname" defaultValue={location.state.item.firstname}  {...register("firstname")}/>
                </div>
                <span className='errors'>{errors.firstname?.message}</span>

                <div className="newPatientItem">
                    <label >SurName</label>
                    <input type="text" name="surname" defaultValue={location.state.item.surname}  {...register("surname")}/>
                </div>
                <span className='errors'>{errors.surname?.message}</span>

                <div className="newPatientItem">
                    <label >Patient Gender </label>
                    <select className='newPatientSelect' name='Gender' placeholder='Select patients Gender' {...register("Gender")}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </select>
                </div>

                <div className="newPatientItem">
                    <label >Contact</label>
                    <input type="text" name="Phonenumber" defaultValue={location.state.item.Phonenumber}  {...register("Phonenumber")}/>
                </div>
                <span className='errors'>{errors.Phonenumber?.message}</span>

                <div className="newPatientItem">
                    <label >Next of Kin contact</label>
                    <input type="text" name="next_of_kin_contact" defaultValue={location.state.item.next_of_kin_contact}  {...register("next_of_kin_contact")}/>
                </div>
                <span className='errors'>{errors.next_of_kin_contact?.message}</span>

                <div className="newPatientItem">
                    <label >Patients Date of Birth</label>
                    <input type="Date" name="Dob" defaultValue={location.state.item.Dob}  {...register("Dob")}/>
                </div>
                <span className='errors'>{errors.Dob?.message}</span>

                <div className="newPatientItem">
                    <label >Patient Blood group</label>
                    <select className='newPatientSelect' name='blood_group' defaultValue={location.state.item.blood_group} {...register("blood_group")}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>                        
                    </select>
                </div>
                <span className='errors'>{errors.blood_group?.message}</span>

                <div className="newPatientItem">
                    <label >Medical Scheme</label>
                    <select className='newPatientSelect' name='Medical_scheme' defaultValue={location.state.item.Medical_scheme} {...register("Medical_scheme")}>
                        <option value="Unimed">Unimed</option>
                        <option value="Masm">Masm</option>
                        <option value="Blue Star">Blue Star</option>                        
                    </select>
                </div>
                <span className='errors'>{errors.Medical_scheme?.message}</span>
                
                <div className="newPatientItem">
                    <label >Address</label>
                    <input type="text" name="address" defaultValue={location.state.item.address}  {...register("address")}/>
                </div>
                <span className='errors'>{errors.address?.message}</span>

                <div className="btn">
                <button className="newPatientBtn" type="submit" disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Update"}</button>
                <input type="reset" className='newuserBtnReset' value="Reset" />
                </div>
                               
              </form>

              <>
              {/**
               * @description this is a snackbar used to give a successiful feedback to the user
               **/}
                <Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : "center"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width:'100%'}}>
                        Patient record updated succesifuly
                    </Alert>
                </Snackbar>
                </>

                <>
                {/** 
                 * @description this is a snackbar used to give a error feedback to the user  
                 **/}
                <Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : "center"
                }} open={doOpen} autoHideDuration={6000} onClose = {doClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width:'100%'}}>
                        failed to update Patient Record
                    </Alert>
                </Snackbar>
                </>

            </div>

        </div>
  )
}
