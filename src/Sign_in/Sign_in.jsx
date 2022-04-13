import { useState } from 'react';
import './sign_in.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginCall } from '../apiCalls';
import { CircularProgress } from '@material-ui/core';



/**
 * @constant schema
 * @description this is a data validation blueprint used to validate data from the form 
 * 
*/
const schema = yup.object().shape({
    email : yup.string().required().email(),
    password: yup.string().required(),
    })

/**
 * @function Sign_in
 * @param {*} props 
 * @returns sign in page 
 */
export default function Sign_in(props) {
    /** 
     * @description this line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
     * 
    */
        const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    /**@description  calling our authcontext object */
    const {user,isFetching,error, dispatch} = useContext(AuthContext);

    /**
     * @event onSubmit
     * @description this function is used to authenticate the user 
     **/
    const onSubmit = (data) => {
        loginCall({email : data.email, password : data.password}, dispatch);
    }

    
    /** @description updating the state of The Role variable in the parent object */
     {user != null ? <>{props.upRole(user.user.Role)}</> : props.upRole(null)}
    
  return(
    <div className='signin'>
        <span></span>
        <div className="signinform">
            
            <div className="Heading">
                <span>Sign In</span>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
            <div className="formitem">
                    <label >Email <address></address></label>
                    <input type="text" name="email" placeholder='enter youre email address'  {...register("email",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.email?.message}</span>
                <div className="formitem">
                    <label >Password</label>
                    <input type="password" name="password" placeholder='enter password'  {...register("password",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.password?.message}</span>
                <span className='errors'>{error ? "Password or user name invalid" : ""}</span>

                <div className="Sbtn" >
                <button className="signBtn" type="submit" disabled={isFetching}>{isFetching? <CircularProgress color="inherit" size="15px" /> : "Sign in"}</button>
                <input type="reset" className='newMedsBtnReset' value="Reset" />
                </div>    
            </form>
            <span></span>
        </div>

    </div>
  ) 
}
