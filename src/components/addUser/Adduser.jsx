import {useState} from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Adduser.css'

const schema = yup.object().shape({
    name : yup.string().required(),
    email: yup.string().required().email(),
    role : yup.string().required(),
    password : yup.string().required().min(6),
    conPassword : yup.string().oneOf([yup.ref('password'),null],"password and confirm password do not match").required("Re enter Password to confirm")
})

export default function Adduser() {

    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);
    

    return (
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
                        <option value="Lab Technician">Lab Technician</option>
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
                <button className="newUserBtn" type="submit">Create</button>
                <input type="reset" className='newuserBtnReset' value="Reset" />
                </div>
                    
                </form>
            </div>
        </div>
    )
}
//name,email,Role,password,confirm password