import { useState } from 'react'
import {Link} from 'react-router-dom'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline, Visibility } from '@material-ui/icons'
import { userRows } from '../../data/tableData'
import { useStyles } from '../../data-gridStyle'
import Display from "./Display"
import './users.css'

export default function Adminuser() {
    const [data, setdata] = useState(userRows);

    const handleDelete = (id)=>{
        setdata(data.filter((item) => item.id !== id));
    }

    const handleChange = (name) =>{
        setdata(data.filter((item) => item.name.toLowerCase().includes(name)));
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
                        <Link to={"/Admin/Consultation_history/"+params.row.id}>
                            <Display role={role}/>
                            </Link>
                        <Link 
                            to={"/Admin/Edit_user/"+params.row.id} 
                            state={{item : params.row}}
                        >
                            <button className="userListEdit">Edit</button>
                            </Link>

                                
                            <DeleteOutline className='userListDelete' onClick={()=>handleDelete(params.row.id)}/>

                            
                        </>
                        )
                }
            }
     ];


     const classes = useStyles();
         
              
    return (      
        <div className="users">
            <div className="usersTop">
                <div className="searchInput">
                    
                      <input  type="text" placeholder='enter user name....' onChange={ event =>handleChange(event.target.value)} />
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
