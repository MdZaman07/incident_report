// import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "./searchForms.css";

const SearchIncidents = () => {
  const [incidentLocation, setIncidentLocation] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [debouncedLocation, setDebouncedLocation] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedLocation(incidentLocation);
    }, 100); // Adjust the debounce delay as needed

    return () => {
      clearTimeout(timer);
    };
  }, [incidentLocation]);

  useEffect(() => {
    if (debouncedLocation !== undefined) {
      console.log(debouncedLocation);
      fetch(
        `http://localhost:4000/api/searchIncidents?incidentLocation=${debouncedLocation}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => setIncidents(data))
        .catch((error) => {
          console.error("Error fetching data:", error);
          // Handle error and display a message to the user.
        });
    } else {
      // Clear the search results if the input is empty
      setIncidents([]);
    }
  }, [debouncedLocation]);
  const handleSearch = (e) => {
    console.log(e);
    console.log(e === "");
    setIncidentLocation(e);
  };
  const handleStatus = (id, status) => {
    // Create a request body with the incident ID and the new status
    const requestBody = {
      id: id,
      status: status, // Set the new status to 'approved'
    };

    fetch(`http://localhost:4000/api/approveIncident`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        // Update the local state with the new status
        const updatedIncidents = incidents.map((form) => {
          if (form._id === id) {
            return { ...form, status: status };
          }
          return form;
        });
        setIncidents(updatedIncidents);
      })
      .catch((error) => {
        console.error("Error approving incident:", error);
        // Handle error and display a message to the user.
      });
  };

  return (
    <div className="container">
      <h2 className="header">Search Incidents by Location</h2>
      <div className="search-container">
        <label className="label" htmlFor="incident-location">
          Incident Location:
        </label>
        <input
          type="text"
          id="incident-location"
          className="input-text"
          value={incidentLocation}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div>
        <h3 className="h3">Search Results:</h3>
        {incidents.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th className="th">Incident Title</th>
                <th className="th">Incident Location</th>
                <th className="th">Offender Name</th>
                <th className="th">Date</th>
                <th className="th">Description</th>
                <th className="th">Incident Category</th>
                <th className="th">Incident Status</th>
                <th className="th">Approval</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map((form) => (
                <tr key={form._id}>
                  <td>{form.incidentTitle}</td>
                  <td>{form.incidentLocation}</td>
                  <td>{form.offenderName}</td>
                  <td>{new Date(form.date).toLocaleDateString()}</td>
                  <td>{form.description}</td>
                  <td>{form.incidentCategory}</td>
                  <td className="status-label">{form.status}</td>

                  <td>
                    {form.status === "pending" ? (
                      <div className="button-container">
                        <Button
                          icon="pi pi-check"
                          tooltip="Approve"
                          className="approve-button"
                          onClick={() => handleStatus(form._id, "Approved")}
                          disabled={form.status === "Approved"}
                        />
                        <Button
                          icon="pi pi-times"
                          tooltip="Reject"
                          className="reject-button"
                          onClick={() => handleStatus(form._id, "Rejected")}
                          disabled={form.status === "Rejected"}
                        />
                      </div>
                    ) : (
                      <p>{form.status}</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-results">No search results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchIncidents;
