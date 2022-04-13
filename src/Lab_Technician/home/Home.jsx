import { Link } from 'react-router-dom'
import { DataGrid, GridToolbar } from "@material-ui/data-grid"
import { Biotech } from "@mui/icons-material";
import * as React  from "react"
import { getLab } from "../../apiCalls";
import './home.css'
import { useStyles } from '../../data-gridStyle';


export default function Home () {
    const [data , setData] =  React.useState([]);
    const classes = useStyles();

    {/** this function is called after first page render and is call the fetchdata method to fetch data from the API */}
    const fetchData = () => {
        getLab.get('/').then(res =>{
            setData(res.data)
        })
    }

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
            field: 'Test_Order',
            headerName: 'Test for',
            width: 150,
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
                    {/** this link takes the lab technician to a page where he can enter lab results and passing in the visit details as state */}
                    <Link to={"/lab_Results/"+params.row.id} state={{item : params.row}}>
                       <button className="displayBtn">
                                <Biotech className='displayIcon'/>
                                Lab Tests
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
                {/** the datagrid is used to display the visits have lab test orders */}
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