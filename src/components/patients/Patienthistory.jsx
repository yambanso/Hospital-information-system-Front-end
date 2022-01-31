import {Link} from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import {  PermIdentity, Visibility } from '@material-ui/icons'
import { consultationHistory } from '../../data/tableData'
import { useStyles } from '../../data-gridStyle'
import './patients.css'

export default function Patienthistory() {
    

    
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
                          <Link to={"/Admin/Visit_Details/"+params.id}>                          
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
                      <span className="historyHeading">Consultation History</span>
             </div>
             <div className="middle">
                 <div className="Dflex">
                     <PermIdentity className="icon"/>
                     <span className="name">Jimmy Maloya</span>
                 </div>
                 <div className="Dflex">
                 <span className="name">Date of Birth : </span>
                     <span className="name">07-04-1998</span>
                 </div>
             </div>
            <div className="userBottom">
            <div className="userTable">
                        <DataGrid
                            className={classes.root}
                            rows={consultationHistory}
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
