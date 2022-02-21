import { PermIdentity,CalendarToday,PhoneAndroid,LocationSearching } from '@material-ui/icons';
import * as React from 'react';
import {useForm} from 'react-hook-form'
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CircularProgress, TextareaAutosize } from '@material-ui/core';
import { Link } from 'react-router-dom';
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
    const [message, setMessage] = React.useState("Visit Description saved...");
    const [type, setType] = React.useState("success")
    const [visit_id, setVisitID] = React.useState()
    const [select, setSelection] = useState([]);

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver : yupResolver(schema),
    });


    const location = useLocation();
    const pID = location.state.item.id;
    const user = useContext(AuthContext);
    const token = user.user.Token;
    const classes = useStyles();
    const [data, setdata] = useState([]);

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
                setWritting(false)
                setOpen(true)
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
        {
          field: 'Price',
          headerName: 'Price (Kwacha)',
          width: 150,
        },
        
    ]
    

    const fetchData = () => {
        getMedicine.get('/').then(res => {
            setdata(res.data)
        })        
    }

    useEffect(() => {
        fetchData()
    }, [])



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

          <div className="Container">
                    <div className="consultPatient">
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
                                        isSending(false);
                                        setOpen(true);
                                    })
                                

                            }} disabled={send || visit_id == null || select.length === 0}>{send ? <CircularProgress color="inherit" size="15px"/> : "Prescribe"}</button>
                        </div>
                        </div>

                            </div>

                    
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

      </div>
  )
}
