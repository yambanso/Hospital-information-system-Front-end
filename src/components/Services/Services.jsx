import { useState , useEffect} from 'react'
import { servicesRows } from '../../data/tableData'
import './services.css'
import { Link } from 'react-router-dom'
import { getServices } from '../../apiCalls'
import Datatable from '../../Receptipnist/Home/Data-table'

/**
 * @function Services
 * @returns List services page
 */

export default function Services() {

    const [data, setdata] = useState(servicesRows);

    /**
     * @function fetchData
     * @description this function fetches data from the Api sets state to different variable for the page 
     * 
    */
        const fetchData = async () => {
        getServices.get('/').then(res => {
            setdata(res.data)
        })
    }

    /**
     * @description this function is called after first page render and is call the fetchdata method to fetch data from the API 
     **/
    useEffect(() => {
            fetchData()
    }, [])

    /**
     * @constant userColumn
     * @description this is array is used as a blue print to display in our datatable
     * 
    */
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
                        {/**
                         * @description this button takes the user to page where he can edit service info and passing medicine data as state  
                         **/}                    
                        <Link to={"/Edit_service/"+params.row.id} state={{item : params.row}}>
                            <button className="medListEdit">Edit</button>
                            </Link>
                        
                    </>
                    )
            }
        }
    ]


  return(
      /**
       * @description creating the view services offered by the hospital page 
       **/
  <div className='medicine'>
      <div className="medicineTop">
                <div className="searchInput">
                    
                      <span className="heading">Services</span>
                </div>
                </div>
            <div className="medicineBottom">
            <div className="medicineTable">
                {/** @description the Datatable is a custom component that is used to Display data in a table and passing in the data and the columns */}
                    <Datatable Data={data} columns={userColumn} />
                        </div>
                   
            </div>
  </div>);
}
