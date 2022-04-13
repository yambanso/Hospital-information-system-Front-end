import {
    Accessible, 
    Add, 
    Receipt
} from '@material-ui/icons'
import './sidebar.css'
import {Link, useLocation} from 'react-router-dom'
/**
 * @function SideBar
 * @returns Side bar for the Receptionist module
 */
export default function Sidebar() {
    return (
        /** @description creating a sidebar navigation */
        <div className='sidebar'>
            <div className="sidebarWrapper">
            <div className="sidebarMenu">
            <h3 className="siderTitle">Quick Menu</h3>
                    <ul className="sidebarLst">
                    <Link to="/" >    
                    <li className="sidebarListItem">
                                <Accessible className="sideBarIcon"/>
                                Clients
                            </li>
                            </Link>
                            
                            <Link to="/invoice">
                            <li className="sidebarListItem">
                                <Receipt className="sideBarIcon"/>
                                Invoices
                            </li>
                            </Link>

                            <Link to="/new_Client" >
                            <li className="sidebarListItem">
                                <Add className="sideBarIcon"/>
                                Add clients
                            </li>
                            </Link>        
                    </ul>                    
            </div>
            </div>
</div>
    )
}