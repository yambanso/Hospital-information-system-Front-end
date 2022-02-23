import React, { useState} from 'react'

export default function Step(props) {
    let status = props.Selected;
    return (
        <div className={"stepBlock"+" " + ( status ? "active" : "")}>
            <div className="cicleWrapper">
                <div className="cicle">
                    <span className="it">{props.index + 1}</span>
                </div>
            </div>
            <span>{props.label}</span>
        </div>
    )
}