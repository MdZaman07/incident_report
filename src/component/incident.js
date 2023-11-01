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
import { Dropdown } from "primereact/dropdown";

function Incident() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [incident, setIncident] = useState(null);
  const [editVisible, setEditVisible] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [version, editVersion] = useState(0);

  //Sent a request to the server to get the incident details by its ID
  const getIncident = async () => {
    const response = await fetch(`http://localhost:4000/api/getFormById/${id}`);
    const data = await response.json();
    setIncident(data);
    editVersion(data.versions.length - 1);
  };

  //Get incident when component is first loaded
  useEffect(() => {
    getIncident();
  }, [id]);

  //Called when edit button is pressed, sets visible state of the edible component to true.
  const handleEdit = () => {
    setEditVisible(true);
    //navigate(`/incident/${id}/edit`);
  };

  const handleCancel = () => {
    setCancelVisible(true);
  };

  // for edit
  const updateVisible = (value) => {
    setEditVisible(value);
  };

  // for cancel
  const updateCancelVisible = (value) => {
    setCancelVisible(value);
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
        <CancelIncident
          updateCancelVisible={updateCancelVisible}
          getIncident={getIncident}
        />
      </Dialog>
      <div className="incident-details-container">
        <div className="incident-details">
          <Dropdown
            options={Array.from(
              { length: incident.versions.length },
              (_, i) => ({
                label: `Version ${incident.versions.length - i}`,
                value: incident.versions.length - i - 1,
              })
            )}
            placeholder="Select a Version"
            value={version}
            onChange={(e) => editVersion(e.value)}
          />
          <Panel
            header={`Incident: ${incident.versions[version].incidentTitle}`}
          >
            <p>
              Date:{" "}
              {new Date(incident.versions[version].date).toLocaleDateString()}
            </p>
            <p>Offender Name: {incident.versions[version].offenderName}</p>
            <p>
              Incident Category: {incident.versions[version].incidentCategory}
            </p>
            <p>Location: {incident.versions[version].incidentLocation}</p>
            <p>Description: {incident.versions[version].description}</p>
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
            <p>
              Updated:{" "}
              {new Date(incident.versions[version].updatedAt).toLocaleString(
                "en-GB",
                {
                  timeStyle: "medium",
                  dateStyle: "medium",
                }
              )}
            </p>
            <Button label="Back" onClick={navBack} /> &nbsp;
            <Button
              label="Edit Incident"
              onClick={handleEdit}
              disabled={version !== incident.versions.length - 1}
            />
            &nbsp; &nbsp;
            <Button
              id="cancelButton"
              severity="danger"
              label="Cancel Incident"
              onClick={handleCancel}
              disabled={version !== incident.versions.length - 1}
            />
          </Panel>
          {incident.versions[version].editNote && (
            <Panel>
              <p>Edit Notes: {incident.versions[version].editNote}</p>
            </Panel>
          )}
        </div>
      </div>
    </>
  );
}

export default Incident;
