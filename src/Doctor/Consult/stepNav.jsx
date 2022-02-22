import React, { useState} from 'react'
import Step from './Step'

export default function StepNav(props) {
    return (
        <div>
            {props.labelArray.map((item,index)=>{
                return(
                <Step key={index} index ={index} label= {item}></Step>
            )})}
            
        </div>
    )
}