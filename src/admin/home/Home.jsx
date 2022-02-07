import { DataGrid } from "@material-ui/data-grid"
import { Accessible, AccountCircle } from "@material-ui/icons"
import { userColumns, userRows, patientsRows, patientsColumns } from "../../data/tableData"
import { useStyles } from "../../data-gridStyle"
import "./home.css"
import { getUserCount,getPatientCount, getPatients, getUsers } from '../../apiCalls'
import { useState, useEffect } from 'react'


export default function Home() {
    const count = 0 ;
    const pcount = 0;
    const [usercount, setCount] = useState(count);
    const [patientcount, setPcount] = useState(pcount)
    const [prows, setProws] = useState(patientsRows)
    const [urows, setUrows] = useState(userRows)

     const fetchData = async () => {

        getUserCount.get('/').then(res => {
            setCount(res.data)
        })
    
        getPatientCount.get('/').then(res => {
            setPcount(res.data)
        })
    
        getPatients.get('/').then(res =>{
            setProws(res.data)
        })
    
        getUsers.get('/').then(res => {
            setUrows(res.data)
        })

    }

    useEffect(() => {
        fetchData()
    }, [])
    
    
    const classes = useStyles();
    return (
        <div className='home'>

            <div className="homeTop">

                <div className="homeLeft">

                    <div className="userHead">
                    <AccountCircle className="userIcon"/>
                     <div className="userInfo">
                            <span className="userTitle">                            
                                Users
                            </span>
                            <span className="userCount">{usercount}</span>
                        </div>    
                    </div>

                </div>

                <div className="homeright">

                <div className="patientHead">
                    <Accessible className="patientIcon"/>
                     <div className="patientInfo">
                            <span className="patientTitle">                            
                                Patients
                            </span>
                            <span className="patientCount">{patientcount}</span>
                        </div>    
                    </div>
                    
                </div>
            </div>
            <div className="homeBottom">
                
                <div className="homeBottomLeft">
                    <span className="infoTitle">
                        Users Overview
                    </span>
                    <div className="userTable">
                    <div className="usersTable">
                        <DataGrid
                            className={classes.root}
                            rows={urows}
                            columns={userColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                        </div>
                    </div>
                    
                </div>
                <div className="homeBottomRight">
                <span className="infoTitle">
                        Patients Overview
                    </span>
                    <div className="patientsTable">
                    <div className="patientsTable">
                        <DataGrid
                            className={classes.root}
                            rows={prows}
                            columns={patientsColumns}
                            pageSize={5}
                            rowsPerPageOptions={[5]}
                            disableSelectionOnClick
                        />
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
}
