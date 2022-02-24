import './prescription.css'
import React , { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { api_URL, getPrescription } from '../../apiCalls';
import Pdetails from '../../Doctor/Consult/Pdetails';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

export default function Prescription () {
    const history = useNavigate();
    const location = useLocation();
    let Results = location.state.item.lab_results;
    const [Prescr, setPrescription] = useState([]);
    const user = useContext(AuthContext);
    const token = user.user.Token;
    

    const fetchData = () => {
        getPrescription.get('/'+location.state.item.id).then(res =>{
          setPrescription(res.data)  
          
        })
      }

      const upDateStatus = () => {
          axios.put(api_URL+"/Visitation/"+location.state.item.id,{ Status : "Invoice"},{
            headers : {
                'Authorization' : "Bearer"+" "+token
            }
        }).catch(()=>{
            console.log("error")
        }).then(()=>{
            history(-1)
        })
      }
    
      useEffect(() => {
        fetchData()
      },[])
    
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
                        <span className="head"> Description   :</span>                        
                        <span className="info">{location.state.item.Description}</span>
                        </div>
                  {Results != null ?
                    <div className="vDetails">
                        <span className="head"> Lab Results   </span>                    
                        <span className="info"> {location.state.item.lab_results}</span>
                        </div> : <></>}

                    <div className="pdetails">
                        <div className="det">
                        <span className="heder"> Prescription   </span>                        
                        </div>
                        {Prescr.map((item) => {
                          return(
                          <div className="pDeets">
                          <span className="head"> {item.name}   </span>                        
                          </div>

                        )})}
                        
                        <div className="vDetails">
                            <button className="doneBtn" onClick={()=>{
                                    upDateStatus()
                            }}>Done</button>
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
        </div>
    )
}