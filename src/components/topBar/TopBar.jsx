import './topbar.css'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import Tooltip from '@material-ui/core/Tooltip'
import { Logout } from '@mui/icons-material';
import axios from 'axios';
import { api_URL } from '../../apiCalls';


export default function TopBar(props) {
    const user = useContext(AuthContext);
    const token = user.user.Token;

    const signout = () => {
        axios.post(api_URL+"/sign_out","",{
            headers : {
                'Authorization' : "Bearer"+" "+token
            }
        }).catch(()=>{

        }).then(()=>{
            user.user = null;
            props.upRole(null)
        })
        
    }
    return (
        <div className='topBar'>
            <div className="topBarWrapper">
                <div className="topBarStart">
                    <span className="Title">Hospital Management System</span>
                </div>
                <div className="topBarEnd">
                    <div className="name">{user.user.user.name}</div>
                    <Tooltip title="Log Out" arrow >
                    <Logout  className="topBarIcon" onClick={()=>signout()}/></Tooltip>
                </div>
            </div>
        </div>
    )
}
