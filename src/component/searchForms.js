// import React, { useState } from "react";

// const SearchIncidents = () => {
//   const [incidentLocation, setIncidentLocation] = useState("");
//   const [incidents, setIncidents] = useState([]);

//   const handleSearch = () => {
//     fetch(
//       `http://localhost:4000/api/searchIncidents?incidentLocation=${incidentLocation}`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => setIncidents(data))
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         // Handle error and display a message to the user.
//       });
//   };

//   return (
//     <div>
//       <h2>Search Incidents by Location</h2>
//       <div>
//         <label>Incident Location:</label>
//         <input
//           type="text"
//           value={incidentLocation}
//           onChange={(e) => setIncidentLocation(e.target.value)}
//         />

//         <button onClick={handleSearch}>Search</button>
//       </div>
//       <div>
//         <h3>Search Results:</h3>
//         {incidents.length > 0 ? ( // Conditionally render table headers
//           <table>
//             <thead>
//               <tr>
//                 <th>Incident Title</th>
//                 <th>Incident Location</th>
//                 <th>Offender Name</th>
//                 <th>Date</th>
//                 <th>Description</th>
//                 <th>Incident Category</th>
//               </tr>
//             </thead>
//             <tbody>
//               {incidents.map((form) => (
//                 <tr key={form._id}>
//                   <td>{form.incidentTitle}</td>
//                   <td>{form.incidentLocation}</td>
//                   <td>{form.offenderName}</td>
//                   <td>{new Date(form.date).toLocaleDateString()}</td>
//                   <td>{form.description}</td>
//                   <td>{form.incidentCategory}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>No search results to display.</p>
//         )}
//         {/* <ul>
//           {incidents.map((incident) => (
//             <li key={incident._id}>
//               <strong>Title:</strong> {incident.incidentTitle},{" "}
//               <strong>Date:</strong>{" "}
//               {new Date(incident.date).toLocaleDateString()}
//             </li>
//           ))}
//         </ul> */}
//       </div>
//     </div>
//   );
// };

// export default SearchIncidents;
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
    if (debouncedLocation) {
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

  return (
    <div>
      <h2>Search Incidents by Location</h2>
      <div>
        <label>Incident Location:</label>
        <input
          type="text"
          value={incidentLocation}
          onChange={(e) => setIncidentLocation(e.target.value)}
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