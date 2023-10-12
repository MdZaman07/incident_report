import React, { useState, useEffect } from "react";
import "./incident.css";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import EditIncident from "./editIncident";

function Incident() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [visible, setVisible] = useState(false);

  //Sent a request to the server to get the incident details by its ID
  const getIncident = async () => {
    const response = await fetch(`http://localhost:4000/api/getFormById/${id}`);
    const data = await response.json();
    setIncident(data);
  };

  //Get incident when component is first loaded
  useEffect(() => {
    getIncident();
  }, [id]);

  //Called when edit button is pressed, sets visible state of the edible component to true.
  const handleEdit = () => {
    setVisible(true);
    //navigate(`/incident/${id}/edit`);
  };

  //Set visible state of the editable component to the passed in value.
  const updateVisible = (value) => {
    setVisible(value);
  };

  //Navigate to the previous page
  const navBack = () => {
    navigate(-1);
  };

  //If there is not incident in the state, display loading.
  if (!incident) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dialog
        header="Header"
        visible={visible}
        onHide={() => setVisible(false)}
      >
        <EditIncident updateVisible={updateVisible} getIncident={getIncident} />
      </Dialog>
      <div className="incident-details-container">
        <div className="incident-details">
          <Panel header={`Incident: ${incident.incidentTitle}`}>
            <p>Date: {new Date(incident.date).toLocaleDateString()}</p>
            <p>Offender Name: {incident.offenderName}</p>
            <p>Incident Category: {incident.incidentCategory}</p>
            <p>Location: {incident.incidentLocation}</p>
            <p>Description: {incident.description}</p>
            {incident.attachedFile ? (
              <Image
                src={incident.attachedFile}
                width="100%"
                preview
                alt="Evidence"
              />
            ) : (
              <p>No evidence supplied</p>
            )}
            <p>Status: {incident.status}</p>
            <Button label="Back" onClick={navBack} /> &nbsp;
            <Button label="Edit Incident" onClick={handleEdit} /> &nbsp;
            <Button id='cancelButton' severity="danger" label="Cancel"/>
          </Panel>
        </div>
      </div>
    </>
  );
}

export default Incident;
