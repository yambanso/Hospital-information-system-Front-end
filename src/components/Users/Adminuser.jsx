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

   const fetchData = async() =>{
    getUsers.get('/').then(res => {
        setdata(res.data)
    })
   }
   const user = useContext(AuthContext)
   const uID = user.user.user.id
   
   useEffect(() =>{
        fetchData()
   },[])

    const handleDelete = (id)=>{
        setdata(data.filter((item) => item.id !== id));
    }

    
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
                        <Link to={"/Consultation_history/"+params.row.id}
                        state ={{item : params.row}}>
                            <Display role={role}/>
                            </Link>
                        <Link 
                            to={"/Edit_user/"+params.row.id} 
                            state={{item : params.row}}
                        >
                            <button className="userListEdit">Edit</button>
                            </Link>

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
                        <Datatable Data={data} columns={userColumn} />                      
                        
                        </div>
                   
            </div>
            
        </div>
    )
}
