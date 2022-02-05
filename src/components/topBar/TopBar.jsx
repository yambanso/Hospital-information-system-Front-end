import './topbar.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import { Settings } from '@material-ui/icons';
import Tooltip from '@material-ui/core/Tooltip'


export default function TopBar(props) {
    const user = useContext(AuthContext);
    console.log(user);

    const signout = () => {
        user.user = null;
        props.upRole(null)
    }
    return (
        <div className='topBar'>
            <div className="topBarWrapper">
                <div className="topBarStart">
                    <span className="title">Hospital Management System</span>
                </div>
                <div className="topBarEnd">
                    <div className="name">{user.user.user.name}</div>
                    <Tooltip title="Log Out" arrow >
                    <Settings  className="topBarIcon" onClick={()=>signout()}/></Tooltip>
                </div>
            </div>
        </div>
    )
}
