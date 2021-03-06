import './addmedicine.css';
import * as React from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { api_URL } from '../../apiCalls';
import { CircularProgress } from '@material-ui/core';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'

/**
 *
 * @description the MuiAlert for our snackbar */
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});
/**
 * @constructor yup object 
 **/
const schema = yup.object().shape({
    })


export default function EditMeds(props) {

    const [isWritting, setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false) 
    
    /**
     * @const react-router-dom useLocatoin 
     **/
    const location = useLocation();

    /**
     *  @const AuthContext object
    */
    const user = useContext(AuthContext);
    const token = user.user.Token;
    const nav = useNavigate()

    /** 
     * @param line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
     **/
    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    /** 
     * @event sends Data to our backend after form validation 
     **/
    const onSubmit = async(data) => {
        setWritting(true)
        let res = await axios.put(api_URL+"/Medication/"+location.state.item.id,data,{
            headers : {
                'Authorization' : "Bearer"+" "+token
            }}).catch(err => {
                setWritting(false)        
            })
            setWritting(false)
            setOpen(true)
            nav('/medicines')

    }

    /** 
     * @event is called whenever the user closes the snack bar
     **/
    const handleClose = (event,reason) => {
        if(reason === 'clickaway'){
            setOpen(false)
        }
        setOpen(false)       
    }   


  return (
      /**
       * @return creating the edit medicine form
       **/
      <div className="addmeds">
                     <div className="addMedsTitle">
                <span className="heading"> Update Medicine </span>
            </div>

            <div className="addMedsForm">
                <form onSubmit={handleSubmit(onSubmit)} className="MedsForm">

                <div className="newMedsItem">
                    <label >Medicine name</label>
                    <input type="text" name="name" defaultValue={location.state.item.name}  {...register("name")}/>
                </div>
                <span className='errors'>{errors.name?.message}</span>

                <div className="newMedsItem">
                <label >Medicine Type</label>
                <select className='newMedSelect' name='Type' placeholder='Select Medicine Type' {...register("Type",{required :"Required"})}>
                <option value="Pain killers">Pain killers</option>
                <option value="Cold Cure">Cold cure</option>
                <option value="Anti Biotics">Anti Biotics</option>
                <option value="Anti Virals">Anti Virals</option>
                <option value="Vitamins">Vitamins</option>
                <option value="Minerals">Minerals</option>
                </select>
                </div>
                <span className='errors'>{errors.Type?.message}</span>
                

                
                <div className="newMedsItem">
                    <label >Medicine Price</label>
                    <input type="text" name="Price" defaultValue={location.state.item.Price}  {...register("Price")}/>
                </div>
                <span className='errors'>{errors.Price?.message}</span>

                <div className="btn">
                <button className="newMedsBtn" disabled={isWritting} type="submit">{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Update"}</button>
                <input type="reset" className='newMedsBtnReset' value="Reset" />
                </div>
                
                </form>
                <>
                {/**
                 * @summary snackbar used to give a successiful feedback to the user
                 **/}
                <Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : "center"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width:'100%'}}>
                        Medicine Updated succesifuly
                    </Alert>
                </Snackbar>
                </>

                </div>

 
      </div>
  )
}
