import React from 'react'
import {Link} from 'react-router-dom'
import { AccessTime} from '@material-ui/icons'

export default class PatientHistoryBtn extends React.Component{
    render (){
        const doctor = "Doctor";

        if(this.props.role === doctor){
            return (
                
                    <button className="displayBtn">
                    <AccessTime className='displayIcon'/>
                    History
                 </button>
            );
        }else{
            return ""
        }
    }
}