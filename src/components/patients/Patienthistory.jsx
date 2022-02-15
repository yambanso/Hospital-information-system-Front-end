import {Link, useLocation} from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import {  PermIdentity, Visibility } from '@material-ui/icons'
import { consultationHistory } from '../../data/tableData'
import { useStyles } from '../../data-gridStyle'
import { getPatientHistory } from '../../apiCalls'
import './patients.css'
import { useState , useEffect} from 'react'

export default function Patienthistory(props) {

    const [data , setConsult] = useState(consultationHistory)

    const location = useLocation();
    
    const fetchData = async() => {
        getPatientHistory.get('/'+location.state.item.id).then(res => {
            setConsult(res.data)
                })
    }

    useEffect(() => {
        fetchData()
    }, [])
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
                        <DataGrid
                            className={classes.root}
                            rows={data}
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
