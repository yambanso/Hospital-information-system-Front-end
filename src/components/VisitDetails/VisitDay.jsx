import React from 'react';
import { useLocation } from 'react-router-dom';
import imge  from '../../data/patient.jpg'
import './visit.css'

export default function VisitDay(props) {

  const location = useLocation();
  console.log(location.state.item);
  return (
      <div className='visit'>

            <div className="visitTitle">
                <span className="heading"> Visit Details </span>
            </div>
        <div className="content">

        <div className="contentLeft">      

        <div className="item">
                    <span className="heading"> Visit Details </span>

                    <div className="details">
                        <span className="detal">Consultation Day :  {location.state.item.visit_day}</span>
                        </div>


                    <div className="details">
                        <span className="detal"> Description   </span>                        
                        </div>

                        
                    <div className="details">
                        <span className="detail">{location.state.item.Description}</span>
                        </div>


                    <div className="details">
                        <span className="detal"> Lab Results   </span>
                                            </div>
                        <div className="details">
                    
                        <span className="detail"> {location.state.item.lab_results}</span>
                        </div>


                        <div className="details">
                        <span className="detal"> Prescription   </span>
                        
                        </div>

                        <div className="details">
                        
                        <span className="detail"> Lofnac <br/> Aspirin <br/> Dacold </span>
                        </div>


        </div>   
        </div>  
          

        

          <div className="contentRight">
              <div className="item">
              <span className="heading"> Patient Details </span>
              
              <img src={imge} alt="" className="patientImg"/>

              <div className="details">
              <span className="detal"> Name   :</span>
              <span className="detail"> Jimmy Maloya  </span>
              </div>

              <div className="details">
              <span className="detal"> Date of Birth   :</span>
              <span className="detail"> 07-04-1998  </span>
              </div>

              <div className="details">
              <span className="detal"> Contact   :</span>
              <span className="detail"> +265 888 62 60 62  </span>
              </div>

              <div className="details">
              <span className="detal"> Medical Scheme   :</span>
              <span className="detail"> Masm  </span>
              </div>

              <div className="details">
              <span className="detal"> Address   :</span>
              <span className="detail"> Kameza | Blantyre  </span>
              </div>

            </div>
          
          </div>

          </div>


    
        </div>
          
      )
}
