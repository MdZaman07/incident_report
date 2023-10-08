import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./archive.css";
import { useNavigate } from "react-router-dom";
import { mockData } from "./MOCKDATA.js";

export default function Archive() {
  const navigate = useNavigate();

  const onRowClick = (event) => {
    const incidentID = event.data.incidentID;
    navigate(`/incident/${incidentID}`);
  };

  return (
    <div className="centered-content">
      <DataTable
        value={mockData}
        paginator
        rows={10}
        sortField="status"
        sortOrder={1}
        onRowClick={onRowClick}
      >
        <Column field="incidentID" header="ID" sortable></Column>
        <Column field="date" header="Date" sortable></Column>
        <Column field="incidentTitle" header="Incident" sortable></Column>
        <Column
          field="incidentCategory"
          header="Incident Category"
          sortable
        ></Column>
        <Column field="witnessName" header="Witness Name" sortable></Column>
        <Column field="offenderName" header="Offender Name" sortable></Column>
        <Column field="status" header="Status" sortable></Column>
        <Column field="severity" header="Status" sortable></Column>
      </DataTable>
    </div>
  );
}
