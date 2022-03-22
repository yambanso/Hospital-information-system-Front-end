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


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});



const schema = yup.object().shape({
    })


export default function EditService(props) {

    const location = useLocation();
    const [isWritting, setWritting] = useState(false)
    const [isOpen, setOpen] = useState(false)
    const [type, setType] = useState("success")
    const [message, setMessage] = useState('Service details Updated succesifuly')

    const user = useContext(AuthContext);
    const token = user.user.Token;



    const {register, handleSubmit, formState:{errors} }  = useForm({
        resolver : yupResolver(schema),
    });

    const handleClose = (event,reason) => {
        if(reason === 'clickaway'){
            setOpen(false)
        }
        setOpen(false)       
    }   


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
