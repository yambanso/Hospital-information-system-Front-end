import { PermIdentity,CalendarToday,PhoneAndroid,LocationSearching } from '@material-ui/icons';
import * as React from 'react';
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress, TextareaAutosize } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import './consult.css'
import axios from 'axios';
import {Bloodtype,LibraryBooks} from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { api_URL } from '../../apiCalls';
import { useContext } from 'react';
import { useStyles } from '../../data-gridStyle'
import { AuthContext } from '../../context/AuthContext';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import { getMedicine } from '../../apiCalls'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import StepNav from './stepNav';


/**
 * @description this is a data validation blueprint used to validate data from the form 
 **/
const schema = yup.object().shape({
    Description : yup.string().required(), 
    patient_id : yup.string().required(),
})

/**
 * @description initializing the MuiAlert for our snackbar 
*/
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});
/**
 * @function Consult
 * @returns Consult page
 */

export default function Consult() {
    const [isWritting , setWritting] = React.useState(false);
    const [send, isSending] = React.useState(false)
    const [isOpen, setOpen] = React.useState(false);
    const [open, setPopOpen] = React.useState(false)
    const [message, setMessage] = React.useState("Visit Description saved...");
    const [type, setType] = React.useState("success")
    const [visit_id, setVisitID] = React.useState()
    const [ordering, setOrder] = React.useState(false)
    const [select, setSelection] = React.useState([]);
    const [stage, setStage] = React.useState(0)
    const labelArray =['Description', 'Order Tests', 'Prescribe']
    const valueRef = React.useRef('')
    const [desc , setDescription] = React.useState()
    const [done, isDone] = React.useState(false) 

    /**
     * 
     * @description this line declares what happens when the user clicks submit button it include form validation handleSubmit function and setForm state
     **/
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver : yupResolver(schema),
    });


    const location = useLocation();
    const pID = location.state.item.id;
    const user = useContext(AuthContext);
    const token = user.user.Token;
    const classes = useStyles();
    const [data, setdata] = useState([]);
    const history  = useNavigate()

    /**
     * @event handleClose
     * @description this function is called whenever the user wants to close the snackbar 
     **/
    const handleClose = (event , reason) => {
        if(reason = 'clickaway'){
            setOpen(false)
            return
        }
        setOpen(false)
    }
    /**
     * @event onSubmit
     * @description this function writes visit description to the backend 
     * 
    */
    const onSubmit = async(data) =>{
        setWritting(true)
        setDescription(data.Description)
        
            await axios.post(api_URL+"/Visitation",data,{
                headers : {
                    'Authorization' : "Bearer"+" "+token
                }
            }).catch ((error) => {
                setWritting(false)
                setMessage("Failled to add Clients visit")
                setType("error")
                setOpen(true)
            }).then((res) =>{
                setVisitID(res.data.id)
                setStage(stage+1)
                setWritting(false)
                setOpen(true)
                setPopOpen(true)
            })                

        
    } 

    /**
     * @constant userColumn
     * @description this is array is used as a blue print to display in our datatable
     **/
    const userColumn = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
        },{
            field: 'Type',
            headerName: 'Type',
            width: 250,
          },
        
    ]
    
    
    /**
     * @function stepOne
     * @description this function is called when the user is on step 1 of the wizard intuitive progress tracker 
     * @returns form that records client visit description
    */
    const stepOne = () =>{
        return (
            <div className="frmItem">
                            <form onSubmit={handleSubmit(onSubmit)} className="form">
                                <input type="text" name='patient_id'value={pID} style={{display : "none"}} {...register("patient_id",{required: "Required"})} />
                                <label style={{marginLeft : "40%", padding : "20px"}}>Patient Complaint</label>
                                <div className="txt">
                                <TextareaAutosize style={{width : "500px",marginLeft : "10%"}} className='area' name='Description' placeholder='Please enter Patient Description' {...register("Description",{required: "Required"})} minRows={5}/>
                                <span className='errors'>{errors.Description?.message}</span>
                                </div>
                                <div className="consultBtn">
                                <button type='submit' className='submit' style={{marginRight : "50px",marginLeft : "35%"}} disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Save"}</button>
                                
                                <Link to='/'>
                                 <button className="backBtn">
                                     Back
                                </button>
                                 </Link>

                                </div>
                            </form>
 
                        </div>            
        )
    }

    /**
     * @function stepTwo
     * @description this function is called when the user is on step 2 of the wizard intuitive progress tracker 
     * @returns Prescriptions window
    */
    const stepTwo = () => {
        return(
        <div className="medicine">
        <div className="top">
            <span className="tt">Prescribe Medicine</span>
        </div>
        
        <div className="medicineTable">
        <div className="table">
            {/**@description this Datagrid component displays the availble medicine we have in our system */}
                <DataGrid
                    className={classes.root}
                    rows={data}
                    components={{
                        Toolbar : GridToolbar
                    }}
                    columns={userColumn}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    checkboxSelection
                    disableSelectAllCheckBox
                    onSelectionModelChange={(ids) => {
                        const selectionId = new Set(ids);
                        const selectionRows = data.filter((row) => selectionId.has(row.id));
                        setSelection(selectionRows);
                    }
                    }
                    disableSelectionOnClick
                />
                </div>
<div className="prescribeBtnpad">
    <button className="prscrbtn" onClick={()=>{
        isSending(true)
        const arr = [];
        {select.map((item,index) =>(
            arr.push({visitation_id : visit_id + "",
            medications_id : item.id+"",
            Qauntity : 1,
            Status : 0,})
        ))}
        /** @description here we post the prescripition to our database for the visit */
            axios.post(api_URL+"/Visitation_prescriptions",{items : arr},{
                headers : {
                    'Authorization' : "Bearer"+" "+token,
                    'Content-Type' : 'application/json'
                }
            }).catch((err)=>{
                isSending(false)
                setMessage("Failled to create visit prescription")
                setType("error")
                setOpen(true)})
            .then(()=>{
                axios.put(api_URL+"/Visitation/"+visit_id,{ Status : "Prescribed"},{
                    headers : {
                        'Authorization' : "Bearer"+" "+token
                    }
                }).catch((err)=>{
                    setWritting(false)
                    setMessage("Failled to create visit prescription")
                    setType("error")
                    setOpen(true)})
                    .then(()=>{                            
                isSending(false);
                setOpen(true);
                isDone(true)
                    })
            })
        

    }} disabled={send || visit_id == null || select.length === 0}>{send ? <CircularProgress color="inherit" size="15px"/> : "Prescribe"}</button>
</div>
</div>

    </div>
        )
    }

    
    /**@description this function is called whenever the user wants to close the popup window */
    const handlePopupClose = () => {
        setStage(stage+1);
        setPopOpen(false);
      };

    const proceed = () => {
        setStage(stage+1);
        setPopOpen(false)
    }  


    /**
     * @function fetchData
     * @description this function fetches data from the Api sets state to different variable for the page
     **/
    const fetchData = () => {
        getMedicine.get('/').then(res => {
            setdata(res.data)
        })        
    }

    /**
     * @description this function fetches data from the Api sets state to different variable for the page 
    */
    useEffect(() => {
        fetchData()
    }, [])

    /**
     * @description this function is called to validate input on the popup window 
     * 
    */
    const validationError = () => {
        setMessage("Please make sure that you have enter your lab test order")
                setType("error")
                setOpen(true)
    }

    /**
     * @event sendOrder
     * @description this function sends test order for this visit to the lab technician 
     * 
    */
    const sendOrder = async(order) =>{
        setOrder(true)
        await axios.put(api_URL+"/Visitation/"+visit_id,{Test_Order : order},{
            headers : {
                'Authorization' : "Bearer"+" "+token
            }
        }).catch ((error) => {
            setWritting(false)
            setMessage("Failled to send Lab test Order")
            setType("error")
            setOpen(true)
        }).then((res) =>{
            setStage(stage+1)
            setWritting(false)
            setOpen(true)
            setPopOpen(false);
            history(-1)
        })
    }


  return (
      <div className="consult">
          <div className="consultTitle">
              
              <Link to='/'>
                  <button className="backBtn">
                      Back
                      </button>
              </Link>
              <h2 className='cTitle'>Counsult Patient</h2>
          </div>

          <div className="progress">
                 
                 <StepNav labelArray = {labelArray} stage = {stage}></StepNav>
              </div>

          <div className="Container">

                    <div className="consultPatient">
                     {/** @description checking what stage the process is on an chosing what function to call */}                          
                    {stage === 0 ? stepOne() : stepTwo()}

                    </div>
                    <div className="patientShow">

                        <div className="pShowTop"> 
                            <PermIdentity className='pIcon'/>
                            <div className="showPname">{location.state.item.firstname} {location.state.item.surname}</div>
                        </div>

                        <div className="pSHowBtm">
                            <div className="pshowInfo">
                                <CalendarToday  className = "pIcon"/>
                                <span className="info">{location.state.item.Dob}</span>
                            </div>

                            <div className="pshowInfo">
                                <Bloodtype  className = "pIcon"/>
                                <span className="info">{location.state.item.blood_group}</span>
                            </div>

                            
                            <div className="pshowInfo">
                                <LibraryBooks  className = "pIcon"/>
                                <span className="info">{location.state.item.Medical_scheme}</span>
                            </div>


                            <div className="pshowInfo">
                                <PhoneAndroid  className = "pIcon"/>
                                <span className="info">{location.state.item.Phonenumber}</span>
                            </div>

                            <div className="pshowInfo">
                                <LocationSearching  className = "pIcon"/>
                                <span className="info">{location.state.item.address}</span>
                            </div>

                        </div>
                    </div>

            </div>
          <>
          {/** @description creating the snackbar to provide feedback to the doctor */}
                <Snackbar anchorOrigin={{
                    vertical : 'top',
                    horizontal : "center"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity={type} sx={{width:'100%'}}>
                         {message}
                    </Alert>
                </Snackbar>
                </>
                <>
                {/** @description creating a dialog pane used to order lab test */}                
        <Dialog open={open} onClose={handlePopupClose}>
        
        <DialogTitle>Order Test</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To Proceed to the next stage where you will create the prescription please click cancel.
            To order Lab Test please order with the form then submit
          </DialogContentText>
          
          <TextField
            autoFocus
            margin="dense"
            className='area length' 
            name='Order' 
            placeholder='Please enter the lab tests you want to order'
            id="order"
            label="Test for"
            type="text"
            fullWidth
            minRows={5}
            variant="standard"
            inputRef ={valueRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={proceed} color='error'>Next</Button>
          <Button disabled={ordering} onClick={() => {
              let val = valueRef.current.value
              {val === null ? validationError(): sendOrder(val)}
              
          }}>{ordering ? <CircularProgress color="inherit" size="15px"/> :"Order Test"}</Button>
        </DialogActions>
      </Dialog>
      </>

             <>
             {/** @description creating a dialog pane used to show visit sumary upon giving a prescription */}                
        <Dialog open={done} onClose={()=>{
            isDone(false)
            history(-1)
        }}>
        
        <DialogTitle> Visit Summary</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {desc}
          </DialogContentText>
            Prescribed : {select.length} drugs
          <DialogContentText>
            
          </DialogContentText>         
          
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
              history(-1)
          }}>Done</Button>
          </DialogActions>
      </Dialog>
      </>    

      </div>
  )
}
