import '../addMedicine/addmedicine.css';
import {useState, forwardRef, useContext} from 'react'
import {useForm} from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useLocation } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { AuthContext } from '../../context/AuthContext';
import { getServices } from '../../apiCalls';

/** 
 * @description initializing the MuiAlert for our snackbar 
 **/
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});


/**
 * @constructor schema
 *  this is a data validation blueprint used to validate data from the form 
 * 
*/
const schema = yup.object().shape({
    })
/**
 * @function editService
 * @param {*} service object 
 * @returns Edit service page
 */

export default function EditService(props) {

    /**
     * @constant location
     * @description the variable is used to query data that is passed from the view medicine windows 
     **/
    const location = useLocation();
    const [isWritting, setWritting] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [type, setType] = useState("success")
    const [message, setMessage] = useState('Service details Updated succesifuly')

    /**
     * @constant AuthContext
     * @description calling the AuthContext object and passing it to the user context 
     **/
     const user = useContext(AuthContext);
    const token = user.user.Token;



    /**
   * @description this line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
   **/
    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    /**
     * @event handleClose
     * @param {*} event 
     * @param {*} reason 
     * @description event is called whenever the user closses the snackbar
     */
    const handleClose = (event,reason) => {
        if(reason === 'clickaway'){
            setOpen(false)
        }
        setOpen(false)       
    }   

    /**
     * @event onSubmit
     * @param {object} data
     * @description function is called when the user submits the form 
    */
    const onSubmit = async(data) => {
        setWritting(true)

        await getServices.put("/"+location.state.item.id,data,{
            headers : {
                'Authorization' : "Bearer"+" "+token
            }}).catch(err => {
                setType("error")
                setMessage("Failled to Update the Service details")
                setWritting(false) 
                setOpen(true)       
            }).then(()=>{
            setWritting(false)
            setOpen(true)
        })

    }
    


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
                <button className="newMedsBtn" disabled={isWritting} type="submit">{isWritting ? <CircularProgress color="inherit" size="15px"/> : 'Update'}</button>
                <input type="reset" className='newMedsBtnReset' value="Reset" />
                </div>
                
                </form>
                </div>

                <>
                {/**
               * @description this is a snackbar used to give feedback to the user
               **/}
                <Snackbar anchorOrigin={{
                    vertical : 'bottom',
                    horizontal : "left"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity={type} sx={{width:'100%'}}>
                        {message}
                    </Alert>
                </Snackbar>
                </>


 
      </div>
  )
}
