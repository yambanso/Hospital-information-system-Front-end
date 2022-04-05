import React,{useState,useEffect} from 'react'
import './report.css'
import { getDiagnosis } from '../../apiCalls'
import {TableContainer,Table, TableBody,TableRow,Paper,TableHead,TableCell} from '@material-ui/core'



export default function LstMonthlyDisease() {
  const [diag, setDiag] = useState([]) 
  const [Lab, setLab] = useState([])
  const [mild, setMild] = useState([])
  const [malaria, setMal] = useState([])
  const [hyper, setHyper] = useState([])
  const [infection , setInfection] = useState([])

  const fetchData = async() => {
    await getDiagnosis.get("/lastMonth").then(res =>{
          let v = res.data

          let l = v.filter((prescri) =>{
            return prescri.lab_results != null})
          let m = v.filter((ild) =>{
              return ild.lab_results === null})
                  
          setDiag(v)          
          setLab(l)                  
          setMild(m)
          })
  }

  useEffect(()=>{
    fetchData()
      },[])
  
      useEffect(()=>{
        setMal(Lab.filter((mal)=>{
          return mal.lab_results.toLocaleLowerCase().includes("malaria".toLocaleLowerCase())
        }))
        
        setHyper(Lab.filter((mal)=>{
          return mal.lab_results.toLocaleLowerCase().includes("pressure".toLocaleLowerCase())
        }))
        setInfection(Lab.filter((mal)=>{
          return mal.lab_results.toLocaleLowerCase().includes("blood cell".toLocaleLowerCase())
        }))

        console.log(infection)
      
      },[Lab])

  return (
    <div>
      <div className="bar">
    <div className="Ttle">
        <span className="hdr">Last Month's Diagnosis Report</span>
        </div>        
    </div>

    <div className="overView">
                <span className="Ttext">Overview</span>
                <div className="mTotal">
                    <span className="head">Last Month's visits  </span>
                    <span className="info">{diag === null ? "0" : diag.length}  </span>
                </div>
                <div className="mdetails">
                    <div className="mTotal">
                        <span className="head">Mild disease recorded  </span>
                        <span className="info">{diag.filter((ild) =>{
                                                  return ild.lab_results === null}).length}  </span>
                    </div>
                     </div>

                  
                <div className="mdetails">
                    <div className="mTotal">
                        <span className="head">Serious disease recorded  </span>
                        <span className="info">{diag.filter((ild) =>{
                                                  return ild.lab_results != null}).length}  </span>
                    </div>
                     </div>   
                  </div>

                <div className="TaBle">
                <div className="TableTitle">
                    <span className="TableTitleText">Monthly Cases</span>
                </div>
                <div className="tble">
                    <TableContainer component = {Paper}>
                        <Table style={{width : "100%"}} size = "medium">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Diagnosis</TableCell>
                                    <TableCell align='right'>Males</TableCell>
                                    <TableCell align='right'>Females</TableCell>
                                    <TableCell align='right'>Negative cases</TableCell>
                                    <TableCell align="right">Positive cases</TableCell>
                                    <TableCell align='right'>Total Cases</TableCell>
                                    </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                
                                <TableCell component='th' scope='row'>
                                                    Malaria
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {malaria.length > 0 ? malaria.filter((mal) =>{
                                                        return mal.Gender === "Male"}).length : "0"}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    
                                                {malaria.length > 0 ? malaria.filter((pres) =>{
                                                        return pres.Gender === "Female"}).length : "0"}
                                                </TableCell>
                                                <TableCell align="right">
                                                  {malaria.filter((mal)=>{
                                                        return mal.lab_results.toLocaleLowerCase().includes("negative".toLocaleLowerCase())
                                                      }).length}
                                                </TableCell>
                                                <TableCell align="right">{(malaria.filter((mal)=>{
                                                        return mal.lab_results.toLocaleLowerCase().includes("positive".toLocaleLowerCase())
                                                      }).length)}</TableCell>                                               
                                                <TableCell align ='right'>
                                                    
                                                {malaria.length > 0 ? malaria.length : "0"}
                                                </TableCell>                                                
                                               
                                </TableRow>
                                <TableRow>
                                <TableCell component='th' scope='row'>
                                                    Hypertension (BP)
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {hyper.length > 0 ? hyper.filter((mal) =>{
                                                        return mal.Gender === "Male"}).length : "0"}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    
                                                {hyper.length > 0 ? hyper.filter((pres) =>{
                                                        return pres.Gender === "Female"}).length : "0"}
                                                </TableCell>
                                                <TableCell align="right">
                                                  {hyper.filter((mal)=>{
                                                        return mal.lab_results.toLocaleLowerCase().includes("normal".toLocaleLowerCase())
                                                      }).length}
                                                </TableCell>
                                                <TableCell align="right">{parseInt(hyper.length) - parseInt(malaria.filter((mal)=>{
                                                        return mal.lab_results.toLocaleLowerCase().includes("normal".toLocaleLowerCase())
                                                      }).length)}</TableCell>                                               
                                                <TableCell align ='right'>
                                                    
                                                {hyper.length > 0 ? hyper.length : "0"}
                                                </TableCell>                                                
                                               
                                </TableRow>
                                <TableRow>
                                <TableCell component='th' scope='row'>
                                                    Infections
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {infection.length > 0 ? infection.filter((mal) =>{
                                                        return mal.Gender === "Male"}).length : "0"}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    
                                                {infection.length > 0 ? infection.filter((pres) =>{
                                                        return pres.Gender === "Female"}).length : "0"}
                                                </TableCell>
                                                <TableCell align="right">
                                                  {infection.filter((mal)=>{
                                                        return mal.lab_results.toLocaleLowerCase().includes("normal".toLocaleLowerCase())
                                                      }).length}
                                                </TableCell>
                                                <TableCell align="right">{parseInt(infection.length) - parseInt(infection.filter((mal)=>{
                                                        return mal.lab_results.toLocaleLowerCase().includes("normal".toLocaleLowerCase())
                                                      }).length)}</TableCell>                                               
                                                <TableCell align ='right'>
                                                    
                                                {infection.length > 0 ? infection.length : "0"}
                                                </TableCell>                                                
                                               
                                </TableRow>
                                <TableRow >
                                                <TableCell component='th' scope='row'>
                                                    Other (mild cases)
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {mild.length > 0 ?mild.filter((prescri) =>{
                                                        return prescri.Gender === "Male"}).length : "0"}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                {mild.length > 0 ?mild.filter((prescri) =>{
                                                        return prescri.Gender === "Female"}).length : "0"}
                                                </TableCell>
                                                
                                                <TableCell align='right'>
                                                      -
                                                  </TableCell>
                                                <TableCell align='right'>
                                                      -
                                                  </TableCell>                                               
                                                <TableCell align ='right'>
                                                    
                                                {mild.length > 0 ? mild.length : "0"}
                                                </TableCell>                                                
                                                
                                </TableRow>                                
                                <TableRow >
                                                <TableCell component='th' scope='row'>
                                                    Total Cases
                                                </TableCell>
                                                <TableCell align ='right'>
                                                    {diag.length > 0 ?diag.filter((prescri) =>{
                                                        return prescri.Gender === "Male"}).length : "0"}
                                                </TableCell>
                                                <TableCell align ='right'>
                                                {diag.length > 0 ?diag.filter((prescri) =>{
                                                        return prescri.Gender === "Female"}).length : "0"}
                                                </TableCell>
                                                
                                                <TableCell align='right'>
                                                      -
                                                  </TableCell>
                                                <TableCell align='right'>
                                                      -
                                                  </TableCell>                                               
                                                <TableCell align ='right'>
                                                    
                                                {diag.length > 0 ? diag.length : "0"}
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
