import './medicines.css';
import { useState, useEffect } from 'react'
import { DeleteOutline } from '@material-ui/icons'
import { medicineRows } from '../../data/tableData'
import { Link } from 'react-router-dom';
import { getMedicine } from '../../apiCalls'
import Datatable from '../../Receptipnist/Home/Data-table';



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


  return(
  <div className='medicine'>
      <div className="medicineTop">
                <div className="searchInput">
                    
                    <span className="heading">Medicine</span>
                </div>
                </div>
            <div className="medicineBottom">
            <div className="medicineTable">
                <Datatable Data={data} columns={userColumn} />
                        </div>
                   
            </div>
  </div>);
}
