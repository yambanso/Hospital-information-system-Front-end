import { useState , useEffect} from 'react'
import { servicesRows } from '../../data/tableData'
import './services.css'
import { Link } from 'react-router-dom'
import { getServices } from '../../apiCalls'
import Datatable from '../../Receptipnist/Home/Data-table'



export default function Services() {

    const [data, setdata] = useState(servicesRows);

    const fetchData = async () => {
        getServices.get('/').then(res => {
            setdata(res.data)
        })
    }

    useEffect(() => {
            fetchData()
    }, [])

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
                        <Link to={"/Edit_service/"+params.row.id} state={{item : params.row}}>
                            <button className="medListEdit">Edit</button>
                            </Link>
                        
                    </>
                    )
            }
        }
    ]


  return(
  <div className='medicine'>
      <div className="medicineTop">
                <div className="searchInput">
                    
                      <span className="heading">Services</span>
                </div>
                </div>
            <div className="medicineBottom">
            <div className="medicineTable">
                        <Datatable Data={data} columns={userColumn} />
                        </div>
                   
            </div>
  </div>);
}
