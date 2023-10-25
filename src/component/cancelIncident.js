import React, { useState, useEffect, useCallback } from "react";
import { Panel } from "primereact/panel";
import { Button } from "primereact/button";
import "./cancelIncident.css"

const CancelIncident = ({updateVisible}) => {

    const handleNo = () => {
        updateVisible(false)
    }

    return (
        <>
        <div className="container">
            <h3>Are you sure you want to cancel your incident submission?</h3>
            <div className="button-container">
            <Button label="Yes" className="p-button-success button"></Button> &nbsp; &nbsp;
            <Button label="No" className="p-button-danger button" onClick={handleNo}></Button>
            </div>
            
        </div>
        </>
    )
}

export default CancelIncident;