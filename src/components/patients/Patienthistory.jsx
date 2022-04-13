import {Link, useLocation} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import {  PermIdentity, Visibility } from '@material-ui/icons'
import { consultationHistory } from '../../data/tableData'
import { useStyles } from '../../data-gridStyle'
import { getPatientHistory } from '../../apiCalls'
import './patients.css'
import { useState , useEffect} from 'react'
/**
 * 
 * @function Patienthistory 
 * @returns patients visitation history page
 */
export default function Patienthistory(props) {

    const [data , setConsult] = useState(consultationHistory)

    /**
     * @constant location
     *  @description the variable is used to query data that is passed from the view patients windows 
     * 
    */
    const location = useLocation();
    
    /** 
     * @function fetchData
     * @description this function fetches data from the Api sets state to different variable for the page
     **/
    const fetchData = async() => {
        getPatientHistory.get('/'+location.state.item.id).then(res => {
            setConsult(res.data)
                })
    }

    /** 
     * @description this function is called after first page render and is call the fetchdata method to fetch data from the API 
     * 
    */
    useEffect(() => {
        fetchData()
    }, [])
    /**
     * @constant userColumn
     * @description this is array is used as a blue print in our datatable
     **/
    const userColumn = [
            { field: 'id', headerName: 'ID', width: 100 },
            {
              field: 'patient_id',
              headerName: 'Patient ID',
              width: 150,
            },
            {
              field: 'Description',
              headerName: 'Description',
              width: 220,
            },
            {
              field: 'lab_results',
              headerName: 'Lab Results',
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
                renderCell  : (params)=>{
                                       
                    return(
                        <>
                        {/** 
                         * @description this button takes the user to page where he can view the visits details info and passing medicine data as state  
                         **/}                    
                        <Link to={"/Visit_Details/"+params.id} state={{item : params.row}}>                          
                           <button className="displayBtn">
                                <Visibility className='displayIcon'/>
                                    Details
                                </button>
                                </Link>     
                        </>
                        )
                }
            }
     ];


     const classes = useStyles();
         
              
    return (
        /**
         * @description creating the view patient medical history window 
         **/      
        <div className="users">
            <div className="usersTop">                    
                      <span className="historyheading">Consultation History</span>
             </div>
             <div className="midle">
                 <div className="dflex">
                     <PermIdentity className="icons"/>
                     <span className="Name">{location.state.item.firstname}  {location.state.item.surname}</span>
                 </div>
                 <div className="dflex">
                 <span className="Name">Date of Birth : </span>
                     <span className="Name">{location.state.item.Dob}</span>
                 </div>

                 <div className="dflex">
                 <span className="Name"> Medical Scheme : </span>
                     <span className="Name">{location.state.item.Medical_scheme}</span>
                 </div>
             </div>
            <div className="userBottom">
            <div className="userTable">
                {/** 
                 * @description the Datagrid is used to diplay recent patients visit to the hospital 
                 **/}
                        <DataGrid
                            className={classes.root}
                            rows={data}
                            components={{
                                Toolbar : GridToolbar
                            }}
                            columns={userColumn}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                        />
                        </div>
                   
            </div>
            
        </div>
    )
}
