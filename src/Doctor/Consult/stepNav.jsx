import React, { useState} from 'react'
import Step from './Step'

export default function StepNav(props) {
    return (
        <div className='stepWrapper'>
            {props.labelArray.map((item,index)=>{
                return(
                <Step key={index} index ={index} Selected={props.stage === index} label= {item}></Step>
            )})}
            
        </div>
    )
}