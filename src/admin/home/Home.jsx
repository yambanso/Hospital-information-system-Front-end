import { DataGrid } from "@material-ui/data-grid"
import { Accessible, AccountCircle } from "@material-ui/icons"
import { userColumns, userRows, patientsRows, patientsColumns } from "../../data/tableData"
import { useStyles } from "../../data-gridStyle"
import "./home.css"


export default function Home() {

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
                            <span className="userCount">35</span>
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
                            <span className="patientCount">400</span>
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
                            rows={userRows}
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
                            rows={patientsRows}
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
