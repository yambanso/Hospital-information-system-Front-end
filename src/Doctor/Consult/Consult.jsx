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
import { ValidationError } from 'yup';



const schema = yup.object().shape({
    Description : yup.string().required(), 
    patient_id : yup.string().required(),
})

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});


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

    const handleClose = (event , reason) => {
        if(reason = 'clickaway'){
            setOpen(false)
            return
        }
        setOpen(false)
    }
    const onSubmit = async(data) =>{
        setWritting(true)
        
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
    
    const stepOne = () =>{
        return (
            <div className="frmItem">
                            <form onSubmit={handleSubmit(onSubmit)} className="frm">
                                <input type="text" name='patient_id'value={pID} style={{display : "none"}} {...register("patient_id",{required: "Required"})} />
                                <label>Patient Complaint</label>
                                <div className="txt">
                                <TextareaAutosize className='area' name='Description' placeholder='Please enter Patient Description' {...register("Description",{required: "Required"})} minRows={5}/>
                                <span className='errors'>{errors.Description?.message}</span>
                                </div>
                                <button type='submit' className='submit' disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Save"}</button>
                            </form>
 
                        </div>            
        )
    }

    const stepTwo = () => {
        return(
        <div className="medicine">
        <div className="top">
            <span className="tt">Prescribe Medicine</span>
        </div>
        
        <div className="medicineTable">
        <div className="table">
                <DataGrid
                    className={classes.root}
                    rows={data}
                    components={{
                        Toolbar : GridToolbar
                    }}
                    columns={userColumn}
                    pageSize={8}
                    hideFooterPagination
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
            medications_id : item.id+""})
        ))}
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
                    setOpen(true)}).then(()=>{                            
                isSending(false);
                setOpen(true);
                    })
            })
        

    }} disabled={send || visit_id == null || select.length === 0}>{send ? <CircularProgress color="inherit" size="15px"/> : "Prescribe"}</button>
</div>
</div>

    </div>
        )
    }

    const handlePopupClose = () => {
        setStage(stage+1);
        setPopOpen(false);
      };

    const proceed = () => {
        setStage(stage+1);
        setPopOpen(false)
    }  


    const fetchData = () => {
        getMedicine.get('/').then(res => {
            setdata(res.data)
        })        
    }

    useEffect(() => {
        fetchData()
    }, [])

    const validationError = () => {
        setMessage("Please make sure that you have enter your lab test order")
                setType("error")
                setOpen(true)
    }

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
                <Snackbar anchorOrigin={{
                    vertical : 'bottom',
                    horizontal : "left"
                }} open={isOpen} autoHideDuration={6000} onClose = {handleClose}>
                    <Alert onClose={handleClose} severity={type} sx={{width:'100%'}}>
                         {message}
                    </Alert>
                </Snackbar>
                </>
                <>
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
          <Button onClick={proceed}>Cancel</Button>
          <Button disabled={ordering} onClick={() => {
              let val = valueRef.current.value
              {val === null ? validationError(): sendOrder(val)}
              
          }}>{ordering ? <CircularProgress color="inherit" size="15px"/> :"Order Test"}</Button>
        </DialogActions>
      </Dialog>
      </>    

      </div>
  )
}
