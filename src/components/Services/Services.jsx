import { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { servicesRows } from '../../data/tableData'
import { useStyles } from '../../data-gridStyle'
import './services.css'
import { Link } from 'react-router-dom'



export default function Services() {

    const [data, setdata] = useState(servicesRows);

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
          field: 'Price',
          headerName: 'Price',
          width: 150,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell  : (params)=>{
                
                return(
                    <>
                        <Link to={"/Admin/Edit_service/"+params.row.id} state={{item : params.row}}>
                            <button className="medListEdit">Edit</button>
                            </Link>
                            

                               
                        <DeleteOutline className='medListDelete' onClick={()=>handleDelete(params.row.id)}/>

                        
                    </>
                    )
            }
        }
    ]

    const classes = useStyles();

  return(
  <div className='medicine'>
      <div className="medicineTop">
                <div className="searchInput">
                    
                      <input  type="text" placeholder='enter user name....' onChange={ event =>handleChange(event.target.value)} />
                </div>
                </div>
            <div className="medicineBottom">
            <div className="medicineTable">
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
  </div>);
}
