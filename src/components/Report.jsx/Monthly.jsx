import React, { useEffect , useState} from 'react'
import { getReport, getMonthlyPrescribed, getMonthlyUnprescribed, getServices } from '../../apiCalls'
import {TableContainer,Table, TableBody,TableRow,Paper,TableHead,TableCell} from '@material-ui/core'
import './report.css'


export default function Monthly() {
    const [visits, setVisits] = useState([])
    const [test, setTest] = useState(0)
    const [prescribed, setPrescr] = useState([])
    const [unPresc, setUnPrescr] = useState([])
    let prescTotal = 0;
    let lost = 0 ;
    let pTotal = 0;
    let uTotal = 0
    const [total, setTotal] = useState(0) 

    {/** this function fetches data from the Api sets state to different variable for the page */}
    const fetchData = async() => {
        let T = 0
        await getReport.get("/thisMonth").then(res => {
            let vis = res.data;
            setVisits(res.data)
            vis.map((item) => {                
                if(item.lab_results != null)T = T + 1                           
            })
            setTest(T)
             
        })

        await getMonthlyPrescribed.get("/thisMonth").then(res =>{
            setPrescr(res.data)
        })

        await getMonthlyUnprescribed.get("/thisMonth").then(res => {
            setUnPrescr(res.data)
        })

        await getServices.get("/").then(res =>{
            let s = res.data;
                let totalCons = visits.length * parseFloat(s[0].Price);
                let labTotal = test * parseFloat(s[1].Price)
                let tot = totalCons + labTotal;
               setTotal(tot)
        })
        
    }

    {/** this function is called after first page render and is call the fetchdata method to fetch data from the API */}
    useEffect(()=>{
        fetchData()        
    },[])
    
  return (
    
        <div >
        <div className="bar">
            <div className="Ttle">
                <span className="hdr">Monthly Financial Report</span>
                </div>
                
            </div>
            <div className="overView">
                <span className="Ttext">Overview</span>
                <div className="mTotal">
                    <span className="head">Monthly visits  </span>
                    <span className="info">{visits === null ? "0" : visits.length}  </span>
                </div>
                <div className="mdetails">
                    <div className="mTotal">
                        <span className="head">The lab tests conducted this month are  </span>
                        <span className="info">{test}  </span>
                    </div>
                     </div>
                  </div>

            <div className="TaBle">
                <div className="TableTitle">
                    <span className="TableTitleText">Most Prescribed Drugs</span>
                </div>
                <div className="tble">
                    {/** creating a table to display our array of disease objects */}
                                       <TableContainer component = {Paper}>
                        <Table style={{width : "100%"}} size = "medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align='right'>Prescribed Quantity</TableCell>
                                    <TableCell align='right'>UnPrescribed Quantinty</TableCell>
                                    <TableCell align='right'>Unit Price (Kwacha)</TableCell>
                                    <TableCell align='right'>Total Amount (Generated)</TableCell>
                                    <TableCell align='right'>Total amount Lost(Due to unprescribed drugs)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prescribed.map((row) => {
                                        prescTotal = prescTotal + parseFloat(row.Revenue)
                                        pTotal = pTotal + parseInt(row.Total)
                                       let unpre = unPresc.filter((prescri) =>{
                                           return prescri.name === row.name})
                                     
                                       {unpre[0] != null ? uTotal = uTotal + parseInt(unpre[0].Total) : <></> }
                                        let rev = 0
                                        {unpre[0] != null ? rev = parseFloat(unpre[0].Revenue_lost) : rev = 0}
                                        lost = lost + rev
    
                                        return(
                                            <TableRow key={row.name}>
                                                <TableCell component='th' scope='row'>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {row.Total}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {unpre[0] != null ? unpre[0].Total : "-"}
                                                </TableCell>                                               
                                                <TableCell align ='right'>
                                                    {row.Price}
                                                </TableCell>                                                
                                                <TableCell align ='right'>
                                                    {row.Revenue}
                                                </TableCell>                                                
                                                <TableCell align ='right'>
                                                    {unpre[0] === null ? "-" : rev }
                                                </TableCell>
                                            </TableRow>
                                        )
                                })
                                }
                                <TableRow >
                                                <TableCell component='th' scope='row'>
                                                    Total
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {pTotal}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {uTotal}
                                                </TableCell>                                               
                                                <TableCell align ='right'>
                                                    -
                                                </TableCell>                                                
                                                <TableCell align ='right'>
                                                    {prescTotal}
                                                </TableCell>                                                
                                                <TableCell align ='right'>
                                                    - {lost}
                                                </TableCell>
                                            </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                                    


            </div>


                

        
            </div> 
        </div>          
    
  )
}
