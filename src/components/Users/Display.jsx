import React from 'react'
import { AccessTime} from '@material-ui/icons'

export default class Display extends React.Component{
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