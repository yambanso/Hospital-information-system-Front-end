import * as React from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import  './addpatient.css';
import axios from 'axios';
import { api_URL } from '../../apiCalls';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'


const schema = yup.object().shape({
  firstname : yup.string().required(),
  surname: yup.string().required(),
  Gender: yup.string.required(),
  Phonenumber : yup.string().required("Patients Contact is required").min(10),
  next_of_kin_contact : yup.string().required("Patients Next of Kin's contact is required").min(10),
  blood_group : yup.string().required(),
  Medical_scheme : yup.string().required(),
  address : yup.string().required(),
})

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});


export default function AddPatient() {
    const [isWritting, setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false) 
    const [doOpen ,setOpenn] = React.useState(false)

    const user = useContext(AuthContext);
    const token = user.user.Token;
  const {register, handleSubmit, formState:{errors} }  = useForm({
    resolver : yupResolver(schema),
});

const onSubmit = async(data) => {
    setWritting(true)
    let res = await axios.post(api_URL+"/patients",data,{
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

}

const handleClose = (event,reason) => {
    if(reason === 'clickaway'){
        return;
    }
    setOpen(false)
    
    
}
const doClose = (event,reason) => {
    if(reason ==='clickaway'){
        return;
    }
    setOpenn(false)
}


  return (
        <div className='addPatient'>
                        <div className="addUserTitle">
                <span className="heading"> New Patient Record </span>
            </div>
            <div className="addPatientform">
              <form onSubmit={handleSubmit(onSubmit)} className="patientForm">
              <div className="newPatientItem">
                    <label >FirstName</label>
                    <input type="text" name="firstname" placeholder='enter patients first name'  {...register("firstname",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.firstname?.message}</span>

                <div className="newPatientItem">
                    <label >SurName</label>
                    <input type="text" name="surname" placeholder='enter patients surname'  {...register("surname",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.surname?.message}</span>

                
                <div className="newPatientItem">
                    <label >Patient Gender </label>
                    <select className='newPatientSelect' name='Gender' placeholder='Select patients Gender' {...register("Gender",{required :"Required"})}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        </select>
                </div>
                <span className='errors'>{errors.Gender?.message}</span>

                <div className="newPatientItem">
                    <label >Contact</label>
                    <input type="text" name="Phonenumber" placeholder='enter patients contact'  {...register("Phonenumber",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.Phonenumber?.message}</span>

                <div className="newPatientItem">
                    <label >Next of Kin contact</label>
                    <input type="text" name="next_of_kin_contact" placeholder='enter Relatives contact'  {...register("next_of_kin_contact",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.next_of_kin_contact?.message}</span>

                <div className="newPatientItem">
                    <label >Patients Date of Birth</label>
                    <input type="Date" name="Dob" placeholder='enter Date of birth'  {...register("Dob",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.Dob?.message}</span>

                <div className="newPatientItem">
                    <label >Patient Blood group</label>
                    <select className='newPatientSelect' name='blood_group' placeholder='Select patients blood group' {...register("blood_group",{required :"Required"})}>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>                        
                    </select>
                </div>
                <span className='errors'>{errors.blood_group?.message}</span>

                <div className="newPatientItem">
                    <label >Medical Scheme</label>
                    <select className='newPatientSelect' name='Medical_scheme' placeholder='Select patients Medical Scheme' {...register("Medical_scheme",{required :"Required"})}>
                        <option value="Unimed">Unimed</option>
                        <option value="Masm">Masm</option>
                        <option value="Blue Star">Blue Star</option>                        
                    </select>
                </div>
                <span className='errors'>{errors.Medical_scheme?.message}</span>
                
                <div className="newPatientItem">
                    <label >Address</label>
                    <input type="text" name="address" placeholder='enter address'  {...register("address",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.address?.message}</span>

                <div className="btn">
                <button className="newPatientBtn" type="submit" disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Create"}</button>
                <input type="reset" className='newuserBtnReset' value="Reset" />
                </div>
                               
              </form>
            </div>

            <>
                <Snackbar anchorOrigin={{
                    vertical : 'bottom',
                    horizontal : "left"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width:'100%'}}>
                        Patient added succesifuly
                    </Alert>
                </Snackbar>
                </>

                <>
                <Snackbar anchorOrigin={{
                    vertical : 'bottom',
                    horizontal : "left"
                }} open={doOpen} autoHideDuration={6000} onClose = {doClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width:'100%'}}>
                        failed to add Patient
                    </Alert>
                </Snackbar>
                </>

        </div>
  )
}
