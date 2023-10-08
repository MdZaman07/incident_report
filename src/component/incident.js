import React from "react";
import "./incident.css";
import { useParams } from "react-router-dom";
import { mockData } from "./MOCKDATA";

function Incident() {
  const { id } = useParams();

  const incident = mockData.find((incident) => incident.incidentID === id);

  if (!incident) {
    return <div>No incident found for ID: {id}</div>;
  }

  return (
    <div className="incident-details-container">
      <div className="incident-details">
        <h1>Incident Details for ID: {id}</h1>
        <p>Incident Title: {incident.incidentTitle}</p>
        <p>Description: {incident.description}</p>
        <p>Witness Name: {incident.witnessName}</p>
        <p>Offender Name: {incident.offenderName}</p>
        <p>Date: {incident.date}</p>
        <p>Incident Category: {incident.incidentCategory}</p>
        <p>Status: {incident.status}</p>
        {incident.attachedFile ? (
          <img src={incident.attachedFile} alt="Evidence" />
        ) : (
          <p>No evidence supplied</p>
        )}
      </div>
    </div>
  );
}

export default Incident;
