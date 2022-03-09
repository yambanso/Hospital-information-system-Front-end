import { useState } from 'react';
import './sign_in.css'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useForm} from 'react-hook-form'
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { loginCall } from '../apiCalls';
import { CircularProgress } from '@material-ui/core';



const schema = yup.object().shape({
    email : yup.string().required().email(),
    password: yup.string().required(),
    })


export default function Sign_in(props) {
    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    const {user,isFetching,error, dispatch} = useContext(AuthContext);

    
    const onSubmit = (data) => {
        loginCall({email : data.email, password : data.password}, dispatch);
    }

    
    
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
