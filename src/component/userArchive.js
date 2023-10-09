import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

const UserArchive = ( {userData} ) => {
  const navigate = useNavigate();
  const[forms, setForms] = useState([])

  const userId = userData ? userData._id : 'Id could not be retrieved in time'
  const[loading, setLoading] = useState(true)

  const onRowClick = (event) => {
    const incidentID = event.data.incidentID;
    navigate(`/incident/${incidentID}`);
  };

  const getIncidents = async () => {
    try {
        const response = await fetch(`http://localhost:4000/api/getFormsById?userId=${userId}`)

        if(response.status === 200) {
            const data = await response.json()
            console.log(data)
            return data
        }
        else {
            console.log('failed to fetch forms')
        }
    }
    catch(error) {
        console.log(error)
    }
    finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    const fetchIncidents = async () => {
        if(userData) {
            const forms = await getIncidents()
            setForms(forms)
        }
        
    };
    fetchIncidents();
}, [userData]);

  return (
    <div className="centered-content">
       { loading ? (
        <p>Loading...</p>
      ) : (<DataTable
        value={forms}
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
        <Column field="offenderName" header="Offender Name" sortable></Column>
        <Column field="status" header="Status" sortable></Column>
      </DataTable>)
      }
    </div>
  );
}

export default UserArchive
