import { useState , useEffect, useContext } from 'react'
import {Link} from 'react-router-dom'
import { DeleteOutline } from '@material-ui/icons'
import { userRows } from '../../data/tableData'
import Display from "./Display"
import './users.css'
import { getUsers } from '../../apiCalls'
import Datatable from '../../Receptipnist/Home/Data-table'
import { AuthContext } from '../../context/AuthContext'

export default function Adminuser() {
    const [data, setdata] = useState(userRows);

   {/** this function fetches data from the Api sets state to different variable for the page */}
   const fetchData = async() =>{
    getUsers.get('/').then(res => {
        setdata(res.data)
    })
   }
   
   {/** calling the AuthContext object and passing it to the user context */}
    const user = useContext(AuthContext)
   const uID = user.user.user.id
   
   {/** this function is called after first page render and is call the fetchdata method to fetch data from the API */}
    useEffect(() =>{
        fetchData()
   },[])

    {/** this function is called whenever the user delete an object from the table */}
    const handleDelete = (id)=>{
        setdata(data.filter((item) => item.id !== id));
    }

    
    {/** this is array is used as a blue print to display in our datatable*/}
         const userColumn = [
            { field: 'id', headerName: 'ID', width: 90 },
            {
              field: 'name',
              headerName: 'Name',
              width: 150,
            },
            {
              field: 'email',
              headerName: 'Email',
              width: 150,
            },
            {
              field: 'Role',
              headerName: 'Role',
              width: 110,
            },
            {
                field: 'actions',
                headerName: 'Actions',
                width: 300,
                renderCell  : (params)=>{
                    
                    const role = params.row.Role;
                    
                    return(
                        <>
                        {/** this button navigates to a page displaying the doctors consultation history */}
                        <Link to={"/Consultation_history/"+params.row.id}
                        state ={{item : params.row}}>
                            <Display role={role}/>
                            </Link>
                        {/** this button takes the user to page where he can edit user info and passing user data as state  */}                    
                        <Link 
                            to={"/Edit_user/"+params.row.id} 
                            state={{item : params.row}}
                        >
                            <button className="userListEdit">Edit</button>
                            </Link>

                          {/** this buttons deletes a particular users record when called */}          
                        {uID === params.row.id ? <></> :                    
                            <DeleteOutline className='userListDelete' onClick={()=>handleDelete(params.row.id)}/>
                        }    
                            
                        </>
                        )
                }
            }
     ];

         
              
    return (      
        <div className="users">
            <div className="usersTop">
                <div className="searchInput">
                    
                     <span className="heading">System Users</span>
                </div>
                </div>
            <div className="userBottom">
            <div className="userTable">
                {/** the Datatable is a custom component that is used to Display data in a table and passing in the data and the columns */}
                        <Datatable Data={data} columns={userColumn} />                      
                        
                        </div>
                   
            </div>
            
        </div>
    )
}
