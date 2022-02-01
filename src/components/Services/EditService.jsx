import '../addMedicine/addmedicine.css';
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';



const schema = yup.object().shape({
    })


export default function EditService(props) {

    const location = useLocation();


    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    const onSubmit = (data) => console.log(data);
    


  return (
      <div className="addmeds">
                     <div className="addMedsTitle">
                <span className="heading"> Edit Service </span>
            </div>

            <div className="addMedsForm">
                <form onSubmit={handleSubmit(onSubmit)} className="MedsForm">

                <div className="newMedsItem">
                    <label >Service name</label>
                    <input type="text" name="name" defaultValue={location.state.item.name}  {...register("name")}/>
                </div>
                <span className='errors'>{errors.name?.message}</span>

                
                <div className="newMedsItem">
                    <label >Service Price</label>
                    <input type="text" name="Price" defaultValue={location.state.item.Price}  {...register("Price")}/>
                </div>
                <span className='errors'>{errors.Price?.message}</span>

                <div className="btn">
                <button className="newMedsBtn" type="submit">Update</button>
                <input type="reset" className='newMedsBtnReset' value="Reset" />
                </div>
                
                </form>
                </div>

 
      </div>
  )
}
