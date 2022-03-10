import React, { useEffect, useRef, useState } from 'react'
import { LibraryBooks, LocationCity, PermIdentity } from "@material-ui/icons";
import { useLocation, useNavigate } from "react-router-dom"
import {TableContainer,Table, TableBody,TableRow,Paper,TableHead,TableCell} from '@material-ui/core'
import { getPatients, getPivot, getPrescription, getServices } from "../../apiCalls";
import './print.css'
import { Email, LocationOn, PhoneAndroid, Telegram } from '@mui/icons-material';
import ReactToPrint from 'react-to-print';


export default function Print(){
    const location = useLocation();
    const history = useNavigate()
    const [patient ,  setPatient] = useState();
    const [service , setServices] = useState([]);
    const [prescription, setPrescription] = useState([]);
    const [pivot, setPivots] = useState([]);
    let total = 0;

    const componentRef = useRef(); 
    

    const fetchData = async() => {
        await getPivot.get("/"+location.state.item.id).then(res => {
            setPivots(res.data)
          }); 
           
        await getPatients.get('/'+ location.state.item.patient_id).then(res => {
        setPatient(res.data);

            })
        await getServices.get('/').then(res =>{
          let x = res.data; 
          let y =  x.filter(item => item.name !=="Laboratory")
        {location.state.item.lab_results === null ?setServices(y) : setServices(x)}          
        })
    
        await getPrescription.get('/'+location.state.item.id).then(res =>{
        setPrescription(res.data);
        }); 
    
    }

    
    useEffect(()=>{
        fetchData()        
    }, [])

    const compRef = useRef();

    const inv = () => {
        return(
            <div>
            <div className="bar">
                <div className="Ttle">
                    <span className="hdr">Medical Invoice</span>
                    </div>
                    <div style={{marginLeft : "400px", color : "whitesmoke"}}>
                    <div className="vl">
                        <span style={{}}>Invoice ID</span>
                        <span style={{marginLeft : "50px"}}>HMS-{location.state.item.id}</span>                                       
                        </div>
                    

                      <div className="vl">
                        <span style={{}}>Order Date</span>
                        <span style={{marginLeft : "50px"}}>{location.state.item.visit_day}</span>                                       
                        </div> 
                        </div>  

                </div>
            <div className="servs">
                <div className="client">

                    <div style={{backgroundColor : "rgb(88, 160, 179)",
                                 display : "flex",
                                 alignItems : "center", 
                                 justifyContent : "center",
                                 height : "30px",
                                 borderRadius : "10px"}}>
                                     <span style={{fontWeight : "600",fontSize : "16px"}}>Client</span>
                                     </div>


                        <div className="pShowTop"> 
                            <PermIdentity className='pIcon'/>
                            <div className="showPname">{patient != null ? patient.firstname : ""} {patient != null ? patient.surname : ""}</div>
                        </div>

                        <div className="pshowInfo">
                            <LibraryBooks  className = "pIcon"/>
                            <span className="info">{patient != null ? patient.Medical_scheme : ""}</span>
                       </div>

                       <div className="pshowInfo">
                            <PhoneAndroid  className = "pIcon"/>
                            <span className="info">{patient != null ? patient.Phonenumber : ""}</span>
                        </div>

                        <div className="pshowInfo">
                            <LocationCity  className = "pIcon"/>
                            <span className="info">{patient != null ?patient.address : ""}</span>
                        </div>

                    
                    </div>
                <div className="Hdetails">
                <div style={{backgroundColor : "rgb(88, 160, 179)",
                                 display : "flex",
                                 alignItems : "center", 
                                 justifyContent : "center",
                                 height : "30px",
                                 borderRadius : "10px"}}>
                                     <span style={{fontWeight : "600",fontSize : "16px"}}>Hospital Information</span>
                                     </div>
                                     <div className="pShowTop"> 
                                        <Email className='pIcon'/>
                                        <div className="showPname">enquiries@thafale.com</div>
                                    </div>
                                    
                                    <div className="pShowTop"> 
                                        <Telegram className='pIcon'/>
                                        <div className="showPname">+ (265) 999 127 521 </div>
                                    </div>

                                     <div className="pShowTop"> 
                                        <LocationOn className='pIcon'/>
                                        <div className="showPname">Kabula | Blantyre</div>
                                    </div>            

                    </div>
                </div>
                <div className="hder">
                    <span style={{fontWeight : "600",}}>Services</span></div>
                <div className="tble">
                    <TableContainer component= {Paper}>
                        <Table style={{width : "100%"}} size = "medium">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Name</TableCell>
                                        <TableCell align='right'>Quantity</TableCell>
                                        <TableCell align='right'>Dose Price ( Kwacha )</TableCell>
                                        <TableCell align='right'>Cost ( Kwacha )</TableCell>
                                        <TableCell align='right'>Status</TableCell>
                                    </TableRow>                                    
                                  </TableHead>
                                    <TableBody>                                  
                                  {service.map((row) => {
                                      total = total + parseFloat(row.Price)
                                      return(  
                                      <TableRow key={row.name}>
                                            <TableCell component="th" scope='row'>
                                            {row.name}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    1
                                                    </TableCell>
                                                    
                                                <TableCell align='right'>
                                                    {row.Price}
                                                    </TableCell>
                                                
                                                <TableCell align='right'>
                                                    {row.Price}
                                                    </TableCell>
                                                    
                                                <TableCell align='right'>
                                                    Rendered
                                                    </TableCell>
                                            </TableRow>
                                  )})}
                                  {prescription.map((item, index) => {
                                      let cost = parseFloat(item.Price) * parseFloat(pivot[index].Qauntity);
                                      {pivot[index].Status === "1" ? total = total + cost : total = total + parseFloat(0) }
                                      
                                        return(<TableRow key={item.name}>
                                            <TableCell component="th" scope='row'>
                                            {item.name}
                                                </TableCell>
                                                <TableCell align='right'>
                                                    {pivot[index].Qauntity}
                                                    </TableCell>
                                                    
                                                <TableCell align='right'>
                                                    {item.Price}
                                                    </TableCell>
                                                
                                                <TableCell align='right'>
                                                    {pivot[index].Status === "1" ? <>{parseFloat(item.Price) * parseFloat(pivot[index].Qauntity)}</> : "-"}
                                                    </TableCell>
                                                    
                                                <TableCell align='right'>
                                                {pivot[index].Status === "1" ? "Prescribed" : "Please buy from you're nearest Pharmacy"}
                                                    </TableCell>
                                            </TableRow>
                                  )})}
                                  </TableBody>
                                  
                            </Table>
                        </TableContainer>
                        </div>
                     <div style={{display : "flex",alignItems : "center", 
                                 justifyContent : "center",
                                 margin : "20px"
                                                                  }}>
                                  <span className="head"> Total Cost  </span>                        
                                <span className="info" style={{fontWeight : "600",fontSize : "16px", marginRight : "10px"}}>{total}  Kwacha   </span>
                                <span>(The total does not Include items you have been taught to get else where)</span>
                          
                         </div>   

                </div>       
        )
        
    }

    return(
        <div className="print">
             <div className="visitTitle">
            
            <button className="backBtn" onClick={() =>{
              history(-1)
            } }>Back</button>
          
            <span className="ttle"> Print Details </span>

            <ReactToPrint
            trigger={() => <button className = "printBtn">Print</button>}
            content={() => compRef.current}
            onAfterPrint={() => console.log("Invoice : Hms"+location.state.item.id+" Printed succesifully")}
            />
            
        </div>
        <div className="ngini">
            
            <div className="bill" ref={compRef}>
                {inv()}
                </div>
            </div>
            </div>
    )
}