import React, { useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import "./archive.css";
import { useNavigate } from "react-router-dom";
import { mockData } from "./MOCKDATA.js";

const UserArchive = ( {userData} ) => {
  const navigate = useNavigate();

  const userId = userData ? userData._id : 'Id could not be retrieved in time'

  const onRowClick = (event) => {
    const incidentID = event.data.incidentID;
    navigate(`/incident/${incidentID}`);
  };

  const getIncidents = async () => {
    try {

    }
    catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    const fetchIncidents = async () => {
        const incidents = await getIncidents()
    };
    fetchIncidents();
}, []);

  return (
    <div className="centered-content">
      <DataTable
        value={mockData}
        paginator
        rows={10}
        sortField="status"
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

export default UserArchive
