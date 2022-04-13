
import * as React from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Adduser.css'
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { addUser } from '../../apiCalls';
import { CircularProgress } from '@material-ui/core';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { AuthContext } from '../../context/AuthContext';


/**
 * 
 * @description initializing the MuiAlert for our snackbar 
 * 
*/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});


/**
 * @constructor schema 
 * @description this is a data validation blueprint used to validate data from the form
 **/
const schema = yup.object().shape({
    email: yup.string().email(),
    })

export default function Edituser(props) {
    const [isWritting, setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false) 
    

    /**
     * @constant location
     * @description the variable is used to query data that is passed from the view medicine windows
     **/
    const location = useLocation();
    
    /**
     * @constant user
     * @description calling the AuthContext object and passing it to the user context 
     * 
    */
    const user = React.useContext(AuthContext);
    const token = user.user.Token;

    const [type, setType] = React.useState("success")
    const [message, setMessage] = React.useState('Service details Updated succesifuly')
    const nav = useNavigate()



    /**
     * 
     * @description this line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
     * 
    */
    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    /**
     * @event onSubmit
     * @description this function sends Data to our backend after form validation 
     **/
    const onSubmit = async(data) =>{
        setWritting(true)

        let res = await addUser.put("/"+location.state.item.id,data,{
            headers : {
                'Authorization' : "Bearer"+" "+token
            }}).catch(err => {
                setType('error')
                setMessage('Failled to update user record')
                setWritting(false) 
                setOpen(true)       
            }).then(()=>{
            setWritting(false)
            setOpen(true)
            nav(-1)
        })

    }

    /**
     * @event onSubmit 
     * @description function is called whenever the user closes the snack bar 
     **/
    const handleClose = (event,reason) => {
        if(reason === 'clickaway'){
            setOpen(false)
        }
        setOpen(false)       
    }   

    

    return (
        /**
         * @return creating the edit user form 
         **/
        <div className='newUser'>

            <div className="addUserTitle">
                <span className="heading"> Update user </span>
            </div>
            <div className="addUserForm">
                <form onSubmit={handleSubmit(onSubmit)} className="userForm">

                <div className="newUserItem">
                    <label >Name</label>
                    <input type="text" name="name" defaultValue={location.state.item.name} {...register("name")}/>
                </div>


                <div className="newUserItem">
                    <label >Email</label>
                    <input type="email" name="email" defaultValue={location.state.item.email} {...register("email",{
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "invalid email address",},
                })}/>
                </div>
                <span className='errors'>{errors.email?.message}</span>

                <div className="newUserItem">
                    <label >User Role</label>
                    <select className='newUserSelect' name='Role' defaultValue={location.state.item.Role} {...register("Role")}>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Lab_Technician">Lab Technician</option>
                        <option value="Pharmacist">Pharmacists</option>
                        <option value="Receptionist">Receptionist</option>                        
                    </select>
                </div>
                
                <div className="btn">
                <button className="newUserBtn" type="submit" disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Update"}</button>
                <input type="reset" className='newuserBtnReset' value="Reset" />
                </div>
                    
                </form>
            </div>
            <>
            {/**
             * @description this is a snackbar used to give feedback to the user 
             **/}
                            <Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : 'center'
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity={type} sx={{width:'100%'}}>
                    {message}
                    </Alert>
                </Snackbar>
                </>

        </div>
    )
}
