import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";
import "./searchForms.css";

const SearchIncidents = () => {
  const [searchCriteria, setSearchCriteria] = useState("incidentLocation"); // Default to "location"
  const [searchTerm, setSearchTerm] = useState("");
  const [incidentLocation, setIncidentLocation] = useState("");
  const [incidents, setIncidents] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm !== undefined) {
      console.log(debouncedSearchTerm);
      fetch(
        `http://localhost:4000/api/searchIncidents?searchCriteria=${searchCriteria}&searchTerm=${debouncedSearchTerm}`
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
        });
    } else {
      setIncidents([]);
    }
  }, [debouncedSearchTerm, searchCriteria]);
  const handleSearch = (e) => {
    console.log(e);
    console.log(e === "");
    setSearchTerm(e);
  };
  const handleStatus = (id, status) => {
    const requestBody = {
      id: id,
      status: status,
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
      });
  };
  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e);
    setSearchTerm("");
  };

  return (
    <div className="container">
      {/* <h2 className="header">Search Incidents by Location</h2> */}
      <div className="search-container">
        <label className="label" htmlFor="search-criteria">
          Search Criteria:
        </label>
        <Dropdown
          id="search-criteria"
          className="select"
          value={searchCriteria}
          options={[
            { label: "Location", value: "incidentLocation" },
            { label: "Incident Title", value: "incidentTitle" },
            { label: "Description", value: "description" },
            { label: "Incident Category", value: "incidentCategory" },
            { label: "Form Status", value: "status" },
          ]}
          onChange={(e) => handleSearchCriteriaChange(e.value)}
          placeholder="Select a criteria"
        />
        <input
          type="text"
          id="search-term"
          className="input-text"
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div>
        {searchTerm === "" ? (
          <h3 className="h3 center-text">All Incidents</h3>
        ) : (
          <h3 className="h3 center-text">Search Results:</h3>
        )}

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
