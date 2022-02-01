
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import  './addpatient.css';
import { useLocation } from 'react-router-dom';

const schema = yup.object().shape({
  })


export default function EdditPatient(props) {

    const location = useLocation();

  const {register, handleSubmit, formState:{errors} }  = useForm({
    resolver : yupResolver(schema),
});

const onSubmit = (data) => console.log(data);




  return (
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
                <button className="newPatientBtn" type="submit">Update</button>
                <input type="reset" className='newuserBtnReset' value="Reset" />
                </div>
                               
              </form>
            </div>

        </div>
  )
}
