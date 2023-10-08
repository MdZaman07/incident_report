import React, { useRef } from "react";
import "./incident.css";
import { useParams } from "react-router-dom";
import { mockData } from "./MOCKDATA";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Panel } from "primereact/panel";
import { Image } from "primereact/image";
import { useNavigate } from "react-router-dom";

function Incident() {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useRef(null);

  const resolvedConfirmation = () => {
    toast.current.show({
      severity: "success",
      summary: "Resolved",
      detail: "You have successfully resolved the incident .",
      life: 3000,
    });
    navigate("/archive.js");
  };

  const deniedConfirmation = () => {
    toast.current.show({
      severity: "success",
      summary: "Denied",
      detail: "You have denied resolved the incident .",
      life: 3000,
    });
    navigate("/archive.js");
  };

  const resolveConfirmation = () => {
    confirmDialog({
      message: "Are you sure you want to resolve this incident?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: resolvedConfirmation,
    });
  };

  const denyConfirmation = () => {
    confirmDialog({
      message: "Are you sure you want to deny this incident?",
      header: "Confirmation",
      icon: "pi pi-info-circle",
      acceptClassName: "p-button-danger",
      accept: deniedConfirmation,
    });
  };

  const incident = mockData.find((incident) => incident.incidentID === id);

  if (!incident) {
    return <div>No incident found for ID: {id}</div>;
  }

  return (
    <>
      <Toast ref={toast} />
      <ConfirmDialog />
      <div className="incident-details-container">
        <div className="incident-details">
          <Panel header={`Incident: ${id} - ${incident.incidentTitle}`}>
            <p>Witness Name: {incident.witnessName}</p>
            <p>Offender Name: {incident.offenderName}</p>
            <p>Date: {incident.date}</p>
            <p>Incident Category: {incident.incidentCategory}</p>
            <p>Severity: {incident.severity}</p>
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
            <div>
              <Button
                onClick={resolveConfirmation}
                icon="pi pi-check"
                label="Resolve"
                className="mr-2"
              ></Button>
              <Button
                style={{ marginLeft: "1em" }}
                onClick={denyConfirmation}
                icon="pi pi-times"
                label="Deny"
              ></Button>
            </div>
          </Panel>
        </div>
      </div>
    </>
  );
}

export default Incident;
