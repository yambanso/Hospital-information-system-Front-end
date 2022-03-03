
import { DataGrid, GridToolbar } from "@material-ui/data-grid"
import * as React from "react"
import { useEffect } from "react";
import { getPatients } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { useStyles } from "../../data-gridStyle";
import './home.css'

export default function Home (){

    const patientColumns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'name',
          headerName: 'Name',
          width: 150,
          valueGetter: (params)=>  params.row.firstname + " " + params.row.surname,
          
        },
        {
            field: 'blood_group',
            headerName: 'Blood Group',
            width: 150,

        },
          {
          field: 'Dob',
          headerName: 'Date of Birth',
          width: 110,
        },{
            field: 'Medical_scheme',
            headerName: 'Medical Scheme',
            width: 150
        },
        {
          field: 'Phonenumber',
          headerName: 'Contact',
          width: 150,
        },
        {
          field: 'address',
          headerName: 'Address',
          width: 130,
        }
    ];

    const classes = useStyles()
    const [Data, setdata] =  React.useState([]);
    const user = React.useContext(AuthContext);  

    const fetchData = async() => {
        getPatients.get('/').then(res =>{
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
                        <DataGrid
                                                    className={classes.root}
                                                    rows={Data}
                                                    components = {{
                                                      Toolbar : GridToolbar
                                                    }}
                                                    columns={patientColumns}
                                                    pageSize={8}
                                                    rowsPerPageOptions={[8]}
                                                    disableSelectionOnClick
                                                />
                        
                    </div>
                </div>
        </div>
    )
}