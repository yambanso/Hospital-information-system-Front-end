import { Home , 
    PermIdentity, 
    Accessible, 
    Add, 
    LocalPharmacy,
    LocalHospital,
    Settings
} from '@material-ui/icons'
import './sidebar.css'
import {Link, useLocation} from 'react-router-dom'

const location = useLocation;




export default function Sidebar() {
    return (
        <div className='sidebar'>
            <div className="sidebarWrapper">
                <div className="sidebarMenu">
                    <h3 className="siderTitle">Quick Menu</h3>
                    <ul className="sidebarLst">
                        
                    <Link to="/Admin" className={location === "/Admin" ? "sidebarListItem active" : "sidebarListItem"}   >
                        <li className="sidebarListItem">                            
                                <Home className="sideBarIcon"/>
                                Home
                        </li>    
                    </Link>
                           
                    <Link to="/Admin/users" className={location === "/Admin/users" ? "sidebarListItem active" : "sidebarListItem"}> 
                        <li className="sidebarListItem">
                                                      
                                <PermIdentity className="sideBarIcon"/>
                                Users                            
                        
                            </li>
                        </Link>

                        <Link to="/Admin/patients">
                            <li className="sidebarListItem">
                                <Accessible className="sideBarIcon"/>
                                Patients
                            </li>
                        </Link>
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="siderTitle">Users</h3>
                    <ul className="sidebarLst">

                        <Link to="/Admin/users" className={location === "/Admin/users" ? "sidebarListItem active" : "sidebarListItem"}>
                            <li className="sidebarListItem">
                                <PermIdentity className="sideBarIcon"/>
                                Users
                            </li>
                        </Link >
                        <Link to="/Admin/new_user"  className={location === "/Admin/new_user" ? "sidebarListItem active" : "sidebarListItem"}>    
                            <li className="sidebarListItem">
                                <Add className="sideBarIcon"/>
                                Add users
                            </li>
                        </Link>    
                    
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="siderTitle">Patients</h3>
                    <ul className="sidebarLst">

                    <Link to="/Admin/patients">
                        <li className="sidebarListItem">
                            <Accessible className="sideBarIcon"/>
                            Patients
                        </li>
                    </Link>    
                    
                    <Link to="/Admin/new_patient">
                        <li className="sidebarListItem">
                            <Add className="sideBarIcon"/>
                            Add Patients
                        </li>
                    </Link>    
                    
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="siderTitle">Medication</h3>
                    <ul className="sidebarLst">

                        <Link to="/Admin/medicines">
                            <li className="sidebarListItem">
                                <LocalPharmacy className="sideBarIcon"/>
                                Medicine
                            </li>
                        </Link>
                        <Link to="/Admin/new_medicines">
                        <li className="sidebarListItem">
                            <Add className="sideBarIcon"/>
                            Add New Medicine
                        </li>
                        </Link>
                    
                    </ul>
                </div>

                <div className="sidebarMenu">
                    <h3 className="siderTitle">Extra</h3>
                    <ul className="sidebarLst">

                        <Link to="/Admin/services">
                            <li className="sidebarListItem">
                                <LocalHospital className="sideBarIcon"/>
                                Services
                            </li>
                        </Link>

                        <li className="sidebarListItem" >
                            <Settings className="sideBarIcon"/>
                            Sign out
                        </li>
                    
                    </ul>
                </div>


            </div>
        </div>
    )
}
