import './addmedicine.css';
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';



const schema = yup.object().shape({
    name : yup.string().required(),
    Price: yup.string().required(),
    })


export default function Addmeds() {

    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);
    


  return (
      <div className="addmeds">
                     <div className="addMedsTitle">
                <span className="heading"> New Medicine </span>
            </div>

            <div className="addMedsForm">
                <form onSubmit={handleSubmit(onSubmit)} className="MedsForm">

                <div className="newMedsItem">
                    <label >Medicine name</label>
                    <input type="text" name="name" placeholder='enter medication name'  {...register("name",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.name?.message}</span>

                
                <div className="newMedsItem">
                    <label >Medicine Price</label>
                    <input type="text" name="Price" placeholder='enter medication name'  {...register("Price",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.Price?.message}</span>

                <div className="btn">
                <button className="newMedsBtn" type="submit">Create</button>
                <input type="reset" className='newMedsBtnReset' value="Reset" />
                </div>
                
                </form>
                </div>

 
      </div>
  )
}
