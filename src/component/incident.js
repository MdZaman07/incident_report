import React, { useState, useEffect } from "react";
import "./incident.css";
import { useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom";
import { Dialog } from "primereact/dialog";
import EditIncident from "./editIncident";
import CancelIncident from "./cancelIncident";

function Incident() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [fileName, setFileName] = useState('');

  const getIncident = async () => {
    const response = await fetch(`http://localhost:4000/api/getFormById/${id}`);
    const data = await response.json();
    setIncident(data);
  };

  useEffect(() => {
    getIncident();
  }, [id]);

  useEffect(() => {
    setFileName(incident?.fileName || '');
    console.log(fileName)
  }, [incident])

  const handleEdit = () => {
    setEditVisible(true);
    //navigate(`/incident/${id}/edit`);
  };

  const handleCancel = () => {
    setCancelVisible(true);
  }

  // for edit
  const updateVisible = (value) => {
    setEditVisible(value);
  };

  // for cancel
  const updateCancelVisible = (value) => {
    setCancelVisible(value);
  };

  const navBack = () => {
    navigate(-1);
  };

  const getFile = () => {
    return `http://localhost:4000/api/image/${fileName}`;
  }

  if (!incident) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dialog
        header="Header"
        visible={editVisible}
        onHide={() => setEditVisible(false)}
      >
        <EditIncident updateVisible={updateVisible} getIncident={getIncident} />
      </Dialog>
      <Dialog
        header="Cancel Incident"
        visible={cancelVisible}
        onHide={() => setCancelVisible(false)}
      >
        <CancelIncident updateCancelVisible={updateCancelVisible} getIncident={getIncident} />
      </Dialog>
      <div className="incident-details-container">
        <div className="incident-details">
          <Panel header={`Incident: ${incident.incidentTitle}`}>
            <p>Date: {new Date(incident.date).toLocaleDateString()}</p>
            <p>Offender Name: {incident.offenderName}</p>
            <p>Incident Category: {incident.incidentCategory}</p>
            <p>Location: {incident.incidentLocation}</p>
            <p>Description: {incident.description}</p>
            {fileName  ? (
              <Image
                src={getFile()}
                width="100%"
                preview
                alt="Evidence"
              />
            ) : (
              <p>No image evidence supplied</p>
            )}
            <p>Status: {incident.status}</p>
            <Button label="Back" onClick={navBack} /> &nbsp;
            <Button label="Edit Incident" onClick={handleEdit} /> &nbsp;
            <Button id='cancelButton' severity="danger" label="Cancel Incident" onClick={handleCancel}/>
          </Panel>
        </div>
      </div>
    </>
  );
}

export default Incident;
