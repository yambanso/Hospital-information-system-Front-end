import React, { useState} from 'react'

export default function Step(props) {
    return (
        <div className="stepBlock">
            <div className="cicleWrapper">
                <div className="cicle">

                </div>
            </div>
            <span>{props.label}</span>
        </div>
    )
}