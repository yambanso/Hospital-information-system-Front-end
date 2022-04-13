import { Accessible, Home } from '@material-ui/icons';
import '../../admin/sidebar/sidebar.css'
import { Link } from 'react-router-dom';
/**
 * @function SideBar
 * @returns Sider bar for the doctors module
 */
export default function SideBar() {
  return (
      /* @description this div return a sidebar for the admin module */
    <div className='sidebar'>
    <div className="sidebarWrapper">
        <div className="sidebarMenu">
            <h3 className="siderTitle">Quick Menu</h3>
            <ul className="sidebarLst">
                
            <Link to="/" >
                <li className="sidebarListItem">                            
                        <Home className="sideBarIcon"/>
                        Home
                </li>    
            </Link>
                   
          
                <Link to="/prescriptions">
                    <li className="sidebarListItem">
                        <Accessible className="sideBarIcon"/>
                        Create Prescription
                    </li>
                </Link>    
            
            </ul>
        </div>


    </div>
</div>
  )
}
