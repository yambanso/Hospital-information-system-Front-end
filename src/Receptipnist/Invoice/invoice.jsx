
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


  {/** this is array is used as a blue print to display in our datatable*/}
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

    {/** this function fetches data from the Api sets state to different variable for the page */}
    const fetchData = async() => {
        await getVisits.get('/Invoice').then(res =>{
            setdata(res.data)
        })
    }

    {/** this function is called after first page render and is call the fetchdata method to fetch data from the API */}
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
                    {/** the Datagrid is used to display fetched data from the API */}
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