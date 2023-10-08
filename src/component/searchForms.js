import React, { useState } from "react";

const SearchIncidents = () => {
  const [incidentTitle, setIncidentTitle] = useState("");
  const [incidents, setIncidents] = useState([]);

  const handleSearch = () => {
    fetch(
      `http://localhost:4000/api/searchIncidents?incidentTitle=${incidentTitle}`
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
  };
  const handleInputChange = (e) => {
    const newIncidentTitle = e.target.value;
    setIncidentTitle(newIncidentTitle);
    // Trigger the search on every character change
    handleSearch();
  };

  return (
    <div>
      <h2>Search Incidents by Location</h2>
      <div>
        <label>Incident Location:</label>
        <input type="text" value={incidentTitle} onChange={handleInputChange} />

        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <h3>Search Results:</h3>
        <table>
          <thead>
            <tr>
              <th>Incident Title</th>
              <th>Incident Location</th>
              <th>Offender Name</th>
              <th>Date</th>
              <th>Description</th>
              <th>Incident Category</th>
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
              </tr>
            ))}
          </tbody>
        </table>
        {/* <ul>
          {incidents.map((incident) => (
            <li key={incident._id}>
              <strong>Title:</strong> {incident.incidentTitle},{" "}
              <strong>Date:</strong>{" "}
              {new Date(incident.date).toLocaleDateString()}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default SearchIncidents;
