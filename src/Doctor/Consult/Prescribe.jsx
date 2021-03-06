import * as React from 'react';
import { useState, useEffect } from 'react'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { CircularProgress } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import './consult.css'
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { getMedicine , api_URL } from '../../apiCalls'
import { useContext } from 'react';
import { useStyles } from '../../data-gridStyle'
import { AuthContext } from '../../context/AuthContext';
import {Snackbar } from "@mui/material"
import MuiAlert from '@mui/material/Alert'
import Pdetails from './Pdetails';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import StepNav from './stepNav';



const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation = {6} ref ={ref} variant="filled" {...props}/>
});
/**
 * @function Prescribe
 * @returns Prescription page
 */

export default function Prescribe() {
    const [isWritting , setWritting] = React.useState(false);
    const [isOpen, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("Visit Prescription created...");
    const [type, setType] = React.useState("success")
    const labelArray =['Description', 'Order Tests', 'Prescribe']
    const history = useNavigate();
    const [done, isDone] = React.useState(false) 



    const [data, setdata] = useState([]);
    const [select, setSelection] = useState([]);
    

    const location = useLocation();
    const ID = location.state.item.id;
    const user = useContext(AuthContext);
    const token = user.user.Token;
    const classes = useStyles();

    /**
     * @event handleClose
     * @param {*} event 
     * @param {*} reason 
     * @returns 
     */
    const handleClose = (event , reason) => {
        if(reason = 'clickaway'){
            setOpen(false)
            return
        }
        setOpen(false)
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
     * @description this function is called after first page render and is call the fetchdata method to fetch data from the API 
     **/
    useEffect(() => {
        fetchData()
    }, [])


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
        },
        {
            field: 'Type',
            headerName: 'Type',
            width: 250,
          },
               
    ]


  return (
      <div className="consult" style={{height : "1050px"}}>
          <div className="consultTitle">
              <Link to='/prescriptions'>
                  <button className="backBtn">
                      Back
                      </button>
              </Link>
              <h2 className='cTitle'>Prescribe</h2>
          </div>

          <div className="progress">
              <StepNav labelArray={labelArray} stage = {2}></StepNav>
          </div>

          <div className="Container">
                    <div className="consultPatient">
                        <div className="frmItem">
                        <div className="labResults">
                                <span className="head">Description</span>
                                <span className="results">{location.state.item.Description}</span>
                              </div>

                            {location.state.item.lab_results != null ?
                            <div className="labResults">
                                <span className="head">Lab Results</span>
                                <span className="results">{location.state.item.lab_results}</span>
                              </div>
                            :<></>}

                            <div className="medicine">
                                <div className="top">
                                    <span className="tt">Prescribe Medicine</span>
                                </div>
                                
                                <div className="medicineTable">
                                <div className="table">
                                    {/** @description this datagrid display the avilable medications for the visit */}
                                        <DataGrid
                                            className={classes.root}
                                            rows={data}
                                            components = {{
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
                                setWritting(true)
                                const arr = [];
                                {select.map((item,index) =>(
                                    arr.push({visitation_id : ID + "",
                                    medications_id : item.id+"",
                                    Qauntity : 1,
                                    Status : 0,})
                                ))}
                                /** @description this function post the given prescription for the visit to the database */
                                    axios.post(api_URL+"/Visitation_prescriptions",{items : arr},{
                                        headers : {
                                            'Authorization' : "Bearer"+" "+token,
                                            'Content-Type' : 'application/json'
                                        }
                                    }).then(()=>{
                                        axios.put(api_URL+"/Visitation/"+ID,{ Status : "Prescribed"},{
                                            headers : {
                                                'Authorization' : "Bearer"+" "+token
                                            }
                                        }).catch((err)=>{
                                            setWritting(false)
                                            setMessage("Failled to create visit prescription")
                                            setType("error")
                                            setOpen(true)})
                                            .then(()=>{
                                                setWritting(false);
                                                setOpen(true);
                                                isDone(true)
                                            })                                     
                                    }).catch((err)=>{
                                    setWritting(false)
                                    setMessage("Failled to create visit prescription")
                                    setType("error")
                                    setOpen(true)})                                

                            }} disabled={isWritting}>{isWritting ? <CircularProgress color="inherit" size="15px"/> : "Prescribe"}</button>
                        </div>
                        </div>

                            </div>
                        </div>
                    </div>
                    <div className="patientShow">
                        <Pdetails patient_id ={location.state.item.patient_id} />                        
                    </div>
          </div>
          <>
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
        <Dialog open={done} onClose={()=>{
            isDone(false)
            history(-1)
        }}>
        
        <DialogTitle> Visit Summary</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {location.state.item.Description}
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
