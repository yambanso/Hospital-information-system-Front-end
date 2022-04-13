import './topbar.css'
import { createRef, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'
import Tooltip from '@material-ui/core/Tooltip'
import { Logout } from '@mui/icons-material';
import axios from 'axios';
import { api_URL } from '../../apiCalls';

/**
 * @function TopBar
 * @param {*} props 
 * @returns Top bar
 */
export default function TopBar(props) {
    /**
     * @constant user
     * @description calling the AuthContext object and passing it to the user context 
     **/
    const user = useContext(AuthContext);
    const token = user.user.Token;
    let nRef = createRef();

    /**
     * @event signout
     * @description this function is called whenever the user is signing out 
     * 
    */
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
        <div className='topBar' >
            <div className="topBarWrapper">
                <div className="topBarStart">
                    <span className="Title">Hospital Management System</span>
                </div>
                <div className="topBarEnd">
                    <div className="name">{user.user.user.name}</div>
                    <Tooltip ref={nRef} title="Log Out" arrow >
                    <Logout  className="topBarIcon" onClick={()=>signout()}/></Tooltip>
                </div>
            </div>
        </div>
    )
}
