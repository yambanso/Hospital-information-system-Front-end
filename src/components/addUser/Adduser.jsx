import {useState} from 'react'
import {useHistory, useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as React from 'react'
import './Adduser.css'
import axios from 'axios';
import { addUser, api_URL } from '../../apiCalls';
import { CircularProgress } from '@material-ui/core';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'

/**
 * @constructor Schema
 * @description this is a data validation blueprint used to validate data from the form 
 **/
const schema = yup.object().shape({
    name : yup.string().required(),
    email: yup.string().required().email(),
    role : yup.string().required(),
    password : yup.string().required().min(6),
    conPassword : yup.string().oneOf([yup.ref('password'),null],"password and confirm password do not match").required("Re enter Password to confirm")
})

/**
 * @description initializing the MuiAlert for our snackbar 
 **/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});

export default function Adduser() {
    const [isWritting, setWritting] = useState(false);
    const [isOpen, setOpen] = useState(false) 
    const [doOpen ,setOpenn] = useState(false)


    /**
     * @description this line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
     **/
    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    const history = useNavigate();

    /**
     * @event onSubmit
     * @description this function sends Data to our backend after form validation 
     * */
    const onSubmit = async (data) => {
        setWritting(true)
        let res = await addUser .post('/', {name : data.name,
            email : data.email,
            Role : data.role,
            password : data.password,
            password_confirmation: data.conPassword}).catch(err =>{
                setWritting(false)
                setOpenn(true)
                return; 
                } )
            setOpen(true)
            setWritting(false)
            history(-1)

    };

    /**
     *@event handleClose
     *  @description function is called whenever the user closes the snack bar 
     **/
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
        /** 
         * @return creating the add user form
         **/
        <div className='newUser'>

            <div className="addUserTitle">
                <span className="heading"> New user </span>
            </div>
            <div className="addUserForm">
                <form onSubmit={handleSubmit(onSubmit)} className="userForm">

                <div className="newUserItem">
                    <label >Name</label>
                    <input type="text" name="name" placeholder='enter users name'  {...register("name",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.name?.message}</span>

                <div className="newUserItem">
                    <label >Email</label>
                    <input type="email" name="email" placeholder='enter users email' {...register("email",{required:"Required",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address",},
                })}/>
                </div>
                <span className='errors'>{errors.email?.message}</span>

                <div className="newUserItem">
                    <label >User Role</label>
                    <select className='newUserSelect' name='role' placeholder='Select user role' {...register("role",{required :"Required"})}>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Lab_Technician">Lab Technician</option>
                        <option value="Pharmacist">Pharmacists</option>
                        <option value="Receptionist">Receptionist</option>                        
                    </select>
                </div>
                <span className='errors'>{errors.role?.message}</span>

                
                <div className="newUserItem">
                    <label >Password</label>
                    <input type="password" name="password"  placeholder='enter user Password' {...register("password",{required :"Required"})}/>
                </div>
                <span className='errors'>{errors.password?.message}</span>
                
                <div className="newUserItem">
                    <label >Confirm Password</label>
                    <input type="password" name="conPassword"  placeholder='Re enter user Password' {...register("conPassword",{required :"Required"})}/>
                </div>
                <span className='errors'>{errors.conPassword?.message}</span>

                <div className="btn">
                <button className="newUserBtn" type="submit" disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Create"}</button>
                <input type="reset" className='newuserBtnReset' value="Reset" />
                </div>
                    
                </form>
                <>
                {/** 
                 * @description this is a snackbar used to give a sucessiful feedback to the user  
                 **/}
                <Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : "center"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width:'100%'}}>
                        User added succesifuly
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
                        failled to add user
                    </Alert>
                </Snackbar>
                </>
            </div>
        </div>
    )
}
