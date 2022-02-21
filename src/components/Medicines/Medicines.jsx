import './medicines.css';
import { useState, useEffect } from 'react'
import { DataGrid, GridFilterForm, GridToolbar, GridToolbarFilterButton } from '@material-ui/data-grid'
import { DeleteOutline } from '@material-ui/icons'
import { medicineRows } from '../../data/tableData'
import { useStyles } from '../../data-gridStyle'
import { Link } from 'react-router-dom';
import { getMedicine } from '../../apiCalls'



export default function Medicines() {

    const [data, setdata] = useState(medicineRows);

    const fetchData = () => {
        getMedicine.get('/').then(res => {
            setdata(res.data)
        })
    }

    useEffect(() => {
        fetchData()
    }, [])

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
            field: 'Type',
            headerName: 'Type',
            width: 250,
          },
        {
          field: 'Price',
          headerName: 'Price (Kwacha)',
          width: 250,
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell  : (params)=>{
                
                return(
                    <>
                        <Link to={"/Edit_medicine/"+params.row.id} state={{item : params.row}}
                        >
                        <button className="medListEdit">Edit</button></Link>

                               
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
                    
                    <span className="heading">Medicine</span>
                </div>
                </div>
            <div className="medicineBottom">
            <div className="medicineTable">
                        <DataGrid
                            className={classes.root}
                            rows={data}
                            components ={{
                                Toolbar : GridToolbar
                            }}
                            columns={userColumn}
                            pageSize={8}
                            rowsPerPageOptions={[8]}
                            disableSelectionOnClick
                        />
                        </div>
                   
            </div>
  </div>);
}
