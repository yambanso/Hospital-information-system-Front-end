
import { DataGrid, GridToolbar } from "@material-ui/data-grid"
import { LocalPrintshop } from "@material-ui/icons";
import * as React from "react"
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { getVisits } from "../../apiCalls";
import { useStyles } from "../../data-gridStyle";
import Datatable from "../Home/Data-table";
import '../Home/home.css'

export default function Invoice (){


  const Column = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'patient_id',
      headerName: 'Patient ID',
      width: 220,
    },
    {
        field: 'visit_day',
        headerName: 'Visit Day',
        width: 150,
      },
    {
        field: 'actions',
        headerName: 'Actions',
        width: 300,
        renderCell  : (params)=> {                                   
            return(
                <>
                <Link to={
                    "/print/"+params.row.id
                } state={{item : params.row}}>
                   <button className="displayBtn">
                            <LocalPrintshop className='displayIcon'/>
                            Print
                        </button>
                </Link>        
                        
                </>
                )
        }
    }
];

    const classes = useStyles()
    const [Data, setdata] =  React.useState([]); 

    const fetchData = async() => {
        await getVisits.get('/Invoice').then(res =>{
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
                    
                      <span className="heading">Invoice</span>
                </div>
                </div>

                <div className="homeBtm">
                    <div className="homeTable">
                    
                        <DataGrid
                                                    className={classes.root}
                                                    rows={Data}
                                                    components = {{
                                                      Toolbar : GridToolbar
                                                    }}
                                                    columns={Column}
                                                    pageSize={8}
                                                    rowsPerPageOptions={[8]}
                                                    disableSelectionOnClick
                                                />
                        
                    </div>
                </div>
        </div>
    )
}