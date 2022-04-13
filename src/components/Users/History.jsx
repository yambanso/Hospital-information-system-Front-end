import { useState, useEffect } from 'react'
import {Link, useLocation} from 'react-router-dom'
import { DataGrid, GridToolbar } from '@material-ui/data-grid'
import { PermIdentity, Visibility } from '@material-ui/icons'
import { consultationHistory } from '../../data/tableData'
import { useStyles } from '../../data-gridStyle'
import './users.css'
import { getDoctorHistory } from '../../apiCalls'

export default function History() {

    const [ data , setData] = useState(consultationHistory)

    {/** the variable is used to query data that is passed from the view medicine windows */}
    const location = useLocation(); 
    
    {/** this function fetches data from the Api sets state to different variable for the page */}
   const fetchData = () => {
        getDoctorHistory.get('/'+location.state.item.id).then(res => {
            setData(res.data)
        })
    }

    {/** this function is called after first page render and is call the fetchdata method to fetch data from the API */}
   useEffect(() => {
        fetchData()
        }, []);
    

    
     {/** this is array is used as a blue print to display in our datatable*/}
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
                    const role = params.row.Role;
                    
                    return(
                        <>
                           {/** this button takes the user to page where he can view visit info in detail and passes vist data as state  */}                    
                             <Link to={"/Visit_Details/"+params.id } state={{item : params.row}}>
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
                      <span className="historyHding">Consultation History</span>
             </div>
             <div className="middle">
                 <div className="dflex">
                     <PermIdentity className="icons"/>
                     <span className="Name">{location.state.item.name}</span>
                 </div>
                 <div className="dflex">
                 <span className="Name">Email address : </span>
                     <span className="Name">{location.state.item.email}</span>
                 </div>
             </div>
            <div className="userBottom">
            <div className="userTable">
                {/** the Datagrid is a component that is used to Display data in a table */}
                
                        <DataGrid
                            className={classes.root}
                            rows={data}
                            components = {{
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
