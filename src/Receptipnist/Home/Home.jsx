import * as React from "react"
import { useEffect } from "react";
import { getPatients } from "../../apiCalls";
import Datatable from "./Data-table";
import './home.css'
/**
 * @function Home
 * @returns Home page for the receptionist page
 */
export default function Home (){

    
    const [Data, setdata] =  React.useState([]); 
    
    /**
     * @constant patientColumns
     * @description this is array is used as a blue print to display in our datatable
     * 
    */
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
    
    /**
     * @function fetchData
     * @description this function fetches data from our API 
     **/
    const fetchData = async() => {
        await getPatients.get('/').then(res =>{
            setdata(res.data)
        })
    }

    
    /**
     * @description this function is called after first page render and is call the fetchdata method to fetch data from the API 
     **/
    useEffect(()=>{
        fetchData()
    },[])
  
    return(
        <div className="home">
            
        <div className="HomeTop">
                <div className="homeInput">
                    
                      <span className="heading">Clients</span>
                </div>
                </div>

                <div className="homeBtm">
                    <div className="homeTable">

                        {/**@description the Datatable is a custom component that is used to Display data in a table and passing in the data and the columns */}
                        <Datatable Data={Data} columns={patientColumns}/>                        
                    </div>
                </div>
        </div>
    )
}