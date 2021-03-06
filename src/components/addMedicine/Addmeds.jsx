import './addmedicine.css';
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import * as React from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { api_URL } from '../../apiCalls';
import { CircularProgress } from '@material-ui/core';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom';



/**
 * @description this is a data validation blueprint used to validate data from the form 
 **/
const schema = yup.object().shape({
    name : yup.string().required(),
    Type : yup.string().required(),
    Price: yup.string().required(),
    })
/** 
 * @description initializing the MuiAlert for our snackbar 
 **/
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
    });
    

 /**
  * @return add medicine window
  * @author Yambanso Kausiwa
  */
export default function Addmeds() {
    const [isWritting, setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false) 
    const [doOpen ,setOpenn] = React.useState(false)
    const nav = useNavigate()

    /**
     * 
     * @event function is called whenever the user closes the snack bar
     * */
    const handleClose = (event,reason) => {
        if(reason === 'clickaway'){
            setOpen(false)
        }
        setOpen(false)       
    }
    /**
     * @event function is called whenever the user closes the snack bar 
     **/
    const doClose = (event,reason) => {
        if(reason ==='clickaway'){
            return;
        }
        setOpenn(false)
    }

    /**
     * @constant AuthContext object
     **/
    const user = useContext(AuthContext);
    const token = user.user.Token;

    /**
     * @param line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
     **/
    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    /**
     * @event function sends Data to our backend after form validation 
     **/
    const onSubmit = async(data) => {
        setWritting(true)
        let res = await axios.post(api_URL+"/Medication",data,{
            headers : {
                'Authorization' : "Bearer"+" "+token
            }}).catch(err => {
                setWritting(false)
                setOpenn(true)        
            })
            setWritting(false)
            setOpen(true)
            nav('/')

    }
    


  return (
      /**
       * @return add medicine form
       **/
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
                    <input type="text" name="Price" placeholder='enter medication name'  {...register("Price",{required: "Required"})}/>
                </div>
                <span className='errors'>{errors.Price?.message}</span>

                <div className="btn">
                <button className="newMedsBtn" type="submit" disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Create"}</button>
                <input type="reset" className='newMedsBtnReset' value="Reset" />
                </div>
                
                </form>
                <>
                {/**
                 * @summary this is a snackbar used to give a successiful feedback to the user
                 **/}
                <Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : "center"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{width:'100%'}}>
                        Medicine added succesifuly
                    </Alert>
                </Snackbar>
                </>

                <>
                {/**
                 * @summary this is a snackbar used to give a error feedback to the user  
                 **/}
                <Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : "center"
                }} open={doOpen} autoHideDuration={6000} onClose = {doClose}>
                    <Alert onClose={handleClose} severity="error" sx={{width:'100%'}}>
                        failed to add Medicine
                    </Alert>
                </Snackbar>
                </>
                </div>

 
      </div>
  )
}
