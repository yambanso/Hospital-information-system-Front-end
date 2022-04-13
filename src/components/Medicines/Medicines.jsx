import './medicines.css';
import { useState, useEffect } from 'react'
import { DeleteOutline } from '@material-ui/icons'
import { medicineRows } from '../../data/tableData'
import { Link } from 'react-router-dom';
import { getMedicine } from '../../apiCalls'
import Datatable from '../../Receptipnist/Home/Data-table';



export default function Medicines() {

    const [data, setdata] = useState(medicineRows);
    /**
     *  
     * @description this function fetches data from the Api sets state to different variable for the page 
     **/
    const fetchData = () => {
        getMedicine.get('/').then(res => {
            setdata(res.data)
        })
    }
    /** 
     * @description this function is called after first page render and is call the fetchdata method to fetch data from the API
     *  */
    useEffect(() => {
        fetchData()
    }, [])

    /**
     * @event handleDelete 
     * this function is called whenever the user delete an object from the table 
     **/
    const handleDelete = (id)=>{
        setdata(data.filter((item) => item.id !== id));
    }

    /** 
     * @constant userColumn
     * @description this is array is used as a blue print to display in our datatable
     **/
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
                        {/** 
                         * @description this button takes the user to page where he can edit medicine info and passing medicine data as state  
                         **/}                    
                        <Link to={"/Edit_medicine/"+params.row.id} state={{item : params.row}}
                        >
                        <button className="medListEdit">Edit</button></Link>

                        {/**
                         * @description button is used to delete medicine data 
                         **/}
                        <DeleteOutline className='medListDelete' onClick={()=>handleDelete(params.row.id)}/>

                        
                    </>
                    )
            }
        }
    ]


  return(
      /** 
       * @return creating the view medicine page 
       **/
  <div className='medicine'>
      <div className="medicineTop">
                <div className="searchInput">
                    
                    <span className="heading">Medicine</span>
                </div>
                </div>
            <div className="medicineBottom">
            <div className="medicineTable">
                {/** 
                 * @description the Datatable is a custom component that is used to Display data in a table and passing in the data and the columns 
                 **/}
                <Datatable Data={data} columns={userColumn} />
                        </div>
                   
            </div>
  </div>);
}
