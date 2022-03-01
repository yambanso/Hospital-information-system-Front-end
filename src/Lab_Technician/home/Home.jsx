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

    const fetchData = () => {
        getLab.get('/').then(res =>{
            setData(res.data)
        })
    }

    React.useEffect(() => {
        fetchData()
    }, [])


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