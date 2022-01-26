import './medicines.css';
import { useState } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { medicineRows } from '../../data/tableData'
import { useStyles } from '../../data-gridStyle'



export default function Medicines() {

    const [data, setdata] = useState(medicineRows);

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
                        <button className="medListEdit">Edit</button>

                               
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
