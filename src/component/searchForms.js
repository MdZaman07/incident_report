import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <h2>Search Incidents by Location</h2>
      <div>
        <label>Incident Location:</label>
        <input
          type="text"
          value={incidentLocation}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div>
        <h3>Search Results:</h3>
        {incidents.length > 0 ? (
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
        ) : (
          <p>No search results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchIncidents;
