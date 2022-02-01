import {useState} from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import './Adduser.css'
import { useLocation } from 'react-router-dom';

const schema = yup.object().shape({
    email: yup.string().email(),
    })

export default function Edituser(props) {

    const location = useLocation();

    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);
    

    return (
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
                    <select className='newUserSelect' name='role' defaultValue={location.state.item.Role} {...register("role")}>
                        <option value="Admin">Admin</option>
                        <option value="Doctor">Doctor</option>
                        <option value="Lab Technician">Lab Technician</option>
                        <option value="Pharmacist">Pharmacists</option>
                        <option value="Receptionist">Receptionist</option>                        
                    </select>
                </div>
                
                <div className="btn">
                <button className="newUserBtn" type="submit">Update</button>
                <input type="reset" className='newuserBtnReset' value="Reset" />
                </div>
                    
                </form>
            </div>
        </div>
    )
}
//name,email,Role,password,confirm password