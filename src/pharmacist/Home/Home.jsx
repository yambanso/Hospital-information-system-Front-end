import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from "@material-ui/data-grid"
import {  Medication } from "@mui/icons-material";
import * as React  from "react"
import { useStyles } from '../../data-gridStyle';
import { getVisits } from '../../apiCalls';


export default function Home () {
    const [data , setData] =  React.useState([]);
    const classes = useStyles();

    /** this function fetches data from our API */
    const fetchData = () => {
        getVisits.get('/Prescribed').then(res =>{
            setData(res.data)
        })
    }

    {/** this function is called after first page render and is call the fetchdata method to fetch data from the API */}
    React.useEffect(() => {
        fetchData()
    }, [])


    {/** this is array is used as a blue print to display in our datatable*/}
    const Column = [
        { field: 'id', headerName: 'ID', width: 100 },
        {
          field: 'Description',
          headerName: 'Description',
          width: 220,
        },
        {
            field: 'visit_day',
            headerName: 'Visit Day',
            width: 150,
          },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 300,
            renderCell  : (params)=> {                                   
                return(
                    <>
                    {/** this button takes the user to a page where he can view and give prescription of a particular visit */}
                    <Link to={"/Prescription/"+params.row.id} state={{item : params.row}}>
                       <button className="displayBtn">
                                <Medication className='displayIcon'/>
                                Prescription
                            </button>
                            </Link>
                    </>
                    )
            }
        }
    ];

    return (
        <div className="lab_home">
            <div className="header">
                <span className="textTitle">Home</span>
            </div>

            <div className="table">
                {/** the Datagrid displays the visit pending assignment of prescription */}
                 <DataGrid
                    className={classes.root}
                    rows={data}
                    components = {{
                        Toolbar : GridToolbar
                    }}
                    columns={Column}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                    disableSelectionOnClick
                />
            </div>
        </div>
    )
}