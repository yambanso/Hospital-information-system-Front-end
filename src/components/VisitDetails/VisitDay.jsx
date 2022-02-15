import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import imge  from '../../data/patient.jpg'
import './visit.css'
import Pdetails from '../../Doctor/Consult/Pdetails';
import { getPrescription } from '../../apiCalls';

export default function VisitDay(props) {

  const history = useNavigate();
  const location = useLocation();
  let total = 0;
  const [Prescr, setPrescription] = useState([]);

  const fetchData = () => {
    getPrescription.get('/'+location.state.item.id).then(res =>{
      setPrescription(res.data)  
      
    })
  }

  useEffect(() => {
    fetchData()
    console.log(Prescr)
  },[])

  return (
      <div className='visit'>

            <div className="visitTitle">
            
                <button className="backBtn" onClick={() =>{
                  history(-1)
                } }>Back</button>
              
                <span className="title"> Visit Details </span>
            </div>
        <div className="Container">

        <div className="visitDetails">      

        <div className="deets">

                    <div className="vDetails">
                        <span className="head">Consultation Day  : </span>
                        <span className="info">{location.state.item.visit_day}</span>
                        </div>


                    <div className="vDetails">
                        <span className="head"> Description   :</span>                        
                        <span className="info">{location.state.item.Description}</span>
                        </div>

                  {location.state.item.lab_results != null ?
                    <div className="vDetails">
                        <span className="head"> Lab Results   </span>                    
                        <span className="info"> {location.state.item.lab_results}</span>
                        </div> : <></>}

                      <div className="pdetails">
                        <div className="det">
                        <span className="heder"> Prescription   </span>                        
                        </div>
                        {Prescr.map((item) => {
                          total = total + parseFloat(item.Price);
                          return(
                          <div className="pDeets">
                          <span className="head"> {item.name}   :</span>                        
                          <span className="info">{item.Price}</span>
                          </div>

                        )})}
                        <div className="vDetails">
                        <span className="head"> Total   :</span>                        
                        <span className="info">{total}</span>
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
          
      )
}
