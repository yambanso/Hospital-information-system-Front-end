import { Accessible, Home } from '@material-ui/icons';
import '../../admin/sidebar/sidebar.css'
import { Link } from 'react-router-dom';

export default function SideBar() {
  return (
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
                   
          
            
                    <li className="sidebarListItem">
                        <Accessible className="sideBarIcon"/>
                        Patients
                    </li>
            
            </ul>
        </div>


    </div>
</div>
  )
}
