import './prescription.css'
import React , { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { api_URL, getPivot, getPrescription } from '../../apiCalls';
import Pdetails from '../../Doctor/Consult/Pdetails';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Checkbox, InputLabel, Select} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { CircularProgress } from '@material-ui/core';


/**
 * @description initializing the MuiAlert for our snackbar
 **/
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});

/**
 * @function Prescription
 * @returns Prescribing window
 */
export default function Prescription () {
    const history = useNavigate();
    const location = useLocation();
    let Results = location.state.item.lab_results;
    const [pivots, setPivots] = useState([]);
    const [Prescr, setPrescription] = useState([]);
    
    /**
     * @constant user
     * @description calling the AuthContext object and passing it to the user context 
     **/
    const user = useContext(AuthContext);
    const token = user.user.Token;

    const [isOpen, setOpen] = useState(false);
    const [message, setMessage] = useState("Visit Prescription prescribed...");
    const [type, setType] = useState("success")
    const [isWritting , setWritting] = useState(false);
    
    
    
    /** 
     * @function fetchData
     * @descriptionthis function fetches data from our API 
     **/
    const fetchData = () => {        
         getPrescription.get('/'+location.state.item.id).then(res =>{
          setPrescription(res.data);
        });  
      }
      /**
       * @function fetchInfo
       * @description this function fetches data from our API 
       **/
      const fetchInfo = async() => {
        await getPivot.get("/"+location.state.item.id).then(res => {
          setPivots(res.data)
        });
      }

      /**
       * @function upDateStatus
       *  @description this function is called inorder to update the status of the given prescription and the quantity given 
       **/
      const upDateStatus = () => {
        setWritting(true)
        axios.put(api_URL+"/Visitation_prescriptions",{items : pivots},{
          headers : {
              'Authorization' : "Bearer"+ " " +token,
              'Content-Type' : 'application/json'
          }
      }).catch(() => {
        setWritting(false)
        setMessage("Failled to visit update prescription")
        setType("error")
         setOpen(true)
      }).then(
          axios.put(api_URL+"/Visitation/"+location.state.item.id,{ Status : "Invoice"},{
            headers : {
                'Authorization' : "Bearer"+ " " +token
            }
        }).catch(()=>{
          setWritting(false)            
        setMessage("Failled to visit update prescription")
        setType("error")
         setOpen(true)
        }).then(()=>{
          setWritting(false)
            setOpen(true)
            history(-1)            
        }))
      }
      
    
      /**
       * @description this function is called after first page render and is call the fetchdata method to fetch data from the API 
       * 
      */
       useEffect(() => {
        fetchInfo()
        fetchData()        
        
      },[])

      /**
       * @event handleClose
       * @description this function is called whenever the user closes the snackbar
       **/
      const handleClose = (event , reason) => {
        if(reason = 'clickaway'){
            setOpen(false)
            return
        }
        setOpen(false)
            }

    
    return (
        <div className="visit">
                     <div className="visitTitle">
            
            <button className="backBtn" onClick={() =>{
              history(-1)
            } }>Back</button>
          
            <span className="ttle"> Visit Details </span>
        </div>
      <div className="hgt">  
    <div className="Container">

    <div className="visitDetails">

    <div className="deets">

    <div className="vDetails">
                        <span className="head"> Description   </span>                        
                        <span className="info">{location.state.item.Description}</span>
                        </div>
                  {Results != null ?
                    <div className="vDetails">
                        <span className="head"> Lab Results   </span>                    
                        <span className="info" style={{ marginTop : "10px"}}> {location.state.item.lab_results}</span>
                        </div> : <></>}

                    <div className="pdetails">
                        <div className="det">
                        <span className="heder"> Prescription   </span>                        
                        </div>
                        
                        {Prescr.map((item, index) => {
                          
                          return(
                          <div className="pDeets" key={item.name}>
                          <span className="head" style={{marginTop : "10px"}}> {item.name}   </span>
                          <div className="controls" style={{marginLeft : "20px",display : "flex"}}>
                          <FormControl  variant="standard" sx={{ m: 1, minWidth: 120 }}>
                          <InputLabel
                          id="qty-select-label"
                          >Quantity</InputLabel>
                          <Select
                          labelId="qty-select-label"
                          id="select-standard"
                          defaultValue={pivots[index].Qauntity}
                          label='Quantity'
                          onChange={(e)=>{
                            pivots[index].Qauntity = e.target.value;
                          
                          }}>                              
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                          </Select>
                          </FormControl>
                          
                          <div className="checkBox" style={{marginLeft : "20px",marginRight : "5px",padding : "10px",display : "flex"}}>
                              <Checkbox
                              color='success'
                              onChange={()=>{
                                {pivots[index].Status === 1? 
                                  <>{pivots[index].Status = 0}</>
                                 :
                                 <>{pivots[index].Status = 1}</>
                              }
                              console.log(pivots[index].Status)
                            }}/>

                             <label style={{marginTop : "10px"}}>Prescribed</label>     
                          </div>
                          </div>                  
                          </div>

                        )
                      })
                        }
                        
                        <div className="vDetails">
                            <button className="doneBtn" disabled={isWritting} onClick={()=>{
                                    upDateStatus()
                            }}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Done"}</button>
                        </div>
    
                        </div>    

    </div>

    </div>

    <div className="patientShow">
              <div className="item">
              <span className="heading"> Patient Details </span>

             <Pdetails patient_id ={location.state.item.patient_id} />
            </div>
          
          </div>
            </div>
        </div>
        <>
        {/**@description this snack bar is used to provide feedback to pharmacist */}
    <Snackbar anchorOrigin={{
        vertical : 'top',
        horizontal : "center"
    }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{width:'100%'}}>
             {message}
        </Alert>
    </Snackbar>
    </>
        </div>
    )

}