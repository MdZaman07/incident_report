import React, { useState, useEffect, useRef } from "react";
import "./form.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { FileUpload } from "primereact/fileupload";

const Form = ({ userData }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null); // Use a state variable to store the map
  const [searchTerm, setSearchTerm] = useState("");
  const [malls, setMalls] = useState([]);

  useEffect(() => {
    // Initialize the map when the component mounts
    const googleMap = new window.google.maps.Map(mapRef.current, {
      center: { lat: 40.7128, lng: -74.006 }, // Set initial map center
      zoom: 12, // Set initial zoom level
    });

    setMap(googleMap);
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    // Create an instance of the Places service
    const placesService = new window.google.maps.places.PlacesService(map);

    // Define the search request
    const request = {
      query: `Shopping Mall ${searchTerm}`,
      fields: ["name"],
    };

    // Perform the text-based search
    placesService.textSearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const mallOptions = results.map((mall) => ({
          label: mall.name,
          value: mall.name,
        }));
        setMalls(mallOptions);
      } else {
        console.error("Error fetching shopping malls:", status);
      }
    });
  };

  const userId = userData ? userData._id : null;

  //const [address, setAddress] = useState('');
  //const [coordinates, setCoordinates] = useState(null);

  const [formData, setFormData] = useState({
    incidentTitle: "",
    incidentLocation: "",
    offenderName: "",
    date: "",
    description: "",
    incidentCategory: "",
    status: "pending",
    userId: userId, // Id of user who submits form
    // attachedFile: null
  });

  const handleFormChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: fieldValue,
    }));
  };

  const [status, setStatus] = useState("");

  const [inputType, setInputType] = useState("text");

  const handleInputFocus = () => {
    setInputType("date");
  };

  const handleInputBlur = () => {
    setInputType("text");
  };

  /*const handleSearch = async (selectedAddress) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setAddress(selectedAddress);
            setCoordinates(latLng);
          } catch (error) {
            console.error('Error selecting address:', error);
          }
        }; */

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      formData.incidentTitle == "" ||
      formData.description == "" ||
      formData.incidentLocation == ""
    ) {
      alert("One of the mandatory fields is empty, please try again.");
    } else {
      try {
        const response = await fetch("http://localhost:4000/api/submit", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          console.log(userId);
          console.log("Form data submitted sucessfully.");
          setFormData({
            incidentTitle: "",
            incidentLocation: "",
            offenderName: "",
            date: "",
            description: "",
            incidentCategory: "",
          });
          setStatus("Incident form submitted successfully.");
        } else {
          console.log("Form submission failed.");
          setStatus("Form fail to submit, please try again.");
        }
      } catch (error) {
        console.log(error);
        setStatus("Form fail to submit, please try again.");
      }
    }
  };

  // const severityLevels = ["Low", "Medium", "High"];

  const incidentCategories = [
    "Safety",
    "Security",
    "Technical",
    "Environmental",
  ];

  const locations = ["Broadway Sydney", "Westfield Sydney", "Pit Street Mall"];

  return (
    <div className="incident-form">
      <form id="incidentForm" onSubmit={handleSubmit}>
        <div className="incident-form__text-area">
          <InputText
            type="text"
            id="incidentTitle"
            placeholder="Title*"
            name="incidentTitle"
            onChange={handleFormChange}
            value={formData.incidentTitle}
          ></InputText>
        </div>
        <div className="incident-form__text-area">
          <input
            type="text"
            placeholder="Search for shopping malls..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <div ref={mapRef} className="map-container"></div>
          <Dropdown
            className="dropdown"
            required
            id="incidentLocation"
            name="incidentLocation"
            placeholder="Venue Locations"
            options={malls}
            value={formData.incidentLocation}
            onChange={handleFormChange}
          ></Dropdown>
        </div>
        <div className="incident-form__text-area">
          <Calendar
            className="custom-date"
            placeholder="Date of incident"
            id="date"
            value={formData.date}
            onChange={handleFormChange}
            name="date"
          ></Calendar>
        </div>
        <div className="incident-form__text-area">
          <Dropdown
            required
            id="incidentCategory"
            className="dropdown"
            options={incidentCategories}
            placeholder="Incident Categories"
            name="incidentCategory"
            value={formData.incidentCategory}
            onChange={handleFormChange}
          />
        </div>
        <div className="incident-form__text-area">
          <InputTextarea
            id="description"
            placeholder="Description (character limit 500)"
            value={formData.description}
            onChange={handleFormChange}
            name="description"
            rows="5"
            maxLength="500"
            autoResize
          ></InputTextarea>
        </div>
        <div className="incident-form__text-area">
          <InputText
            type="text"
            placeholder="Name of offender (if applicable)"
            id="offenderName"
            name="offenderName"
            onChange={handleFormChange}
            value={formData.offenderName}
          ></InputText>
        </div>
        <div>
          <label>Upload an image:</label>
          <FileUpload name="fileupload" id="fileupload" url="./upload" />
        </div>
        {/*<div className='incident-form__text-area'>
                    <label htmlFor="file">Attach image/video: </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept=".pdf, .doc, .docx, .jpg, .jpeg, .png, .mp4"
                    />
                        </div> */}
        {status && <p className="status">{status}</p>}
        <Button
          className="submit-button"
          icon="pi pi-check"
          iconPos="right"
          severity="success"
          type="submit"
          label="Submit"
        ></Button>
      </form>
    </div>
  );
};

export default Form;
