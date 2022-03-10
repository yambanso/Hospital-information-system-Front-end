
import { DataGrid, GridToolbar } from "@material-ui/data-grid"
import * as React from "react"
import { useEffect } from "react";
import { getPatients } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useStyles } from "../../data-gridStyle";
import Datatable from "./Data-table";
import './home.css'

export default function Home (){

    
    const classes = useStyles()
    const [Data, setdata] =  React.useState([]);
    const user = React.useContext(AuthContext);  

    const fetchData = async() => {
        await getPatients.get('/').then(res =>{
            setdata(res.data)
        })
    }

    useEffect(()=>{
        fetchData()
    },[])
  
    return(
        <div className="home">
            
        <div className="HomeTop">
                <div className="homeInput">
                    
                      <span className="heading">Consultation</span>
                </div>
                </div>

                <div className="homeBtm">
                    <div className="homeTable">
                          <Datatable Data={Data} />                        
                    </div>
                </div>
        </div>
    )
}