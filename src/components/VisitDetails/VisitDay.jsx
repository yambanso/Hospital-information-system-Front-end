import React from 'react';
import imge  from '../../data/patient.jpg'
import './visit.css'

export default function VisitDay() {
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
                        <span className="detal"> Description   :</span>
                        <span className="detail"> Headaches <br/> Sore Throat <br/> coughing</span>
                        </div>


                    <div className="details">
                        <span className="detal"> Lab Results   :</span>
                        <span className="detail"> Malaria  Positive</span>
                        </div>

                        <div className="details">
                        <span className="detal"> Prescription   :</span>
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
