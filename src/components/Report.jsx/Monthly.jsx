import React, { useEffect , useState} from 'react'
import { getMonthly, getMonthlyPrescribed, getMonthlyUnprescribed, getServices } from '../../apiCalls'
import {TableContainer,Table, TableBody,TableRow,Paper,TableHead,TableCell} from '@material-ui/core'
import './report.css'


export default function Monthly() {
    const [visits, setVisits] = useState([])
    const [test, setTest] = useState(0)
    const [prescribed, setPrescr] = useState([])
    const [unPresc, setUnPrescr] = useState([])
    let prescTotal = 0;
    let lost = 0 ;
    const [total, setTotal] = useState(0) 

    const fetchData = async() => {
        let T = 0
        await getMonthly.get("/").then(res => {
            let vis = res.data;
            setVisits(res.data)
            vis.map((item) => {                
                {item.lab_results != null ? <>{T = T + 1}
                {console.log(T)}</> :
                    T = 0}            
            })
            setTest(T)            
        })

        await getMonthlyPrescribed.get("/").then(res =>{
            setPrescr(res.data)
        })

        await getMonthlyUnprescribed.get("/").then(res => {
            setUnPrescr(res.data)
        })

        await getServices.get("/").then(res =>{
            let s = res.data;
                let totalCons = visits.length * parseFloat(s[0].Price);
                let labTotal = test * parseFloat(s[1].Price)
                let tot = totalCons + labTotal;
                console.log(labTotal)
                setTotal(tot)
        })
        
    }

    useEffect(()=>{
        fetchData()
        
    },[])
    
  return (
    
        <div >
        <div className="bar">
            <div className="Ttle">
                <span className="hdr">Monthly Report</span>
                </div>
                
            </div>
            <div className="overView">
                <span className="Ttext">Overview</span>
                <div className="mTotal">
                    <span className="head">Last Month's visits  </span>
                    <span className="info">{visits === null ? "0" : visits.length}  </span>
                </div>
                <div className="mdetails">
                    <div className="mTotal">
                        <span className="head">The lab tests conducted last month are  </span>
                        <span className="head">{test}  </span>
                    </div>


                </div>

            </div>

            <div className="TaBle">
                <div className="TableTitle">
                    <span className="TableTitleText">Most Prescribed Drugs</span>
                </div>
                <div className="tble">
                    <TableContainer component = {Paper}>
                        <Table style={{width : "100%"}} size = "medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Quantity</TableCell>
                                    <TableCell align='right'>Unit Price (Kwacha)</TableCell>
                                    <TableCell align='right'>Total Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prescribed.map((row) => {
                                        prescTotal = prescTotal + parseFloat(row.Revenue)
                                        return(
                                            <TableRow key={row.name}>
                                                <TableCell component='th' scope='row'>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {row.Total}
                                                </TableCell>                                               
                                                <TableCell align ='right'>
                                                    {row.Price}
                                                </TableCell>                                                
                                                <TableCell align ='right'>
                                                    {row.Revenue}
                                                </TableCell>
                                            </TableRow>
                                        )
                                })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{display : "flex",alignItems : "center", 
                                 justifyContent : "center",
                                 margin : "20px"
                                                                  }}>
                                  <span className="head"> Revenue Generated  </span>                        
                                <span className="info" style={{fontWeight : "600",fontSize : "16px", marginRight : "10px"}}>{prescTotal}  Kwacha   </span>
                                                          
                         </div>   



            </div>

            <div className="TaBle">
                <div className="TableTitle">
                    <span className="TableTitleText"> Drugs Not Prescribed</span>
                </div>
                <div className="tble">
                    <TableContainer component = {Paper}>
                        <Table style={{width : "100%"}} size = "medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Quantity</TableCell>
                                    <TableCell align='right'>Unit Price (Kwacha)</TableCell>
                                    <TableCell align='right'>Total Amount</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {unPresc.map((item) => {
                                        lost = lost + parseFloat(item.Revenue)
                                        return(
                                            <TableRow key={item.name}>
                                                <TableCell component='th' scope='row'>
                                                    {item.name}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {item.Total}
                                                </TableCell>                                               
                                                <TableCell align ='right'>
                                                    {item.Price}
                                                </TableCell>                                                
                                                <TableCell align ='right'>
                                                    {item.Revenue}
                                                </TableCell>
                                            </TableRow>
                                        )
                                })
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <div style={{display : "flex",alignItems : "center", 
                                 justifyContent : "center",
                                 margin : "20px"
                                                                  }}>
                                  <span className="head"> Revenue lost due to un prescribed drugs is  </span>                        
                                <span className="info" style={{fontWeight : "600",fontSize : "16px", marginRight : "10px"}}>{lost}  Kwacha   </span>
                                                          
                         </div>   



            </div>
                
            <div style={{display : "flex",alignItems : "center", 
                                 justifyContent : "center",
                                 margin : "20px"
                                             }}>
                                  <span className="head">Total Revenue Generated this Month </span>                        
                                <span className="info" style={{fontWeight : "600",fontSize : "16px", marginRight : "10px"}}>{total + prescTotal}  Kwacha   </span>
                                                          
                         </div>   


        
            </div>       
    
  )
}
