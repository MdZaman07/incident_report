import React, {useState} from 'react';
import './form.css';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { selectClasses } from '@mui/material';

const Form = () => {

    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState(null);
  

    const[formData, setFormData] = useState( {
        incidentTitle: "",
        incidentLocation: "",
        witnessName: "",
        offenderName: "",
        date: "",
        description: "",
        incidentCategory: "",
        //severityLevel: "",
       // attachedFile: null
    })

    const handleFormChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setFormData(prevData => ({
            ...prevData,
            [fieldName]: fieldValue
        }));
    }

    const handleSearch = async (selectedAddress) => {
        try {
            const results = await geocodeByAddress(selectedAddress);
            const latLng = await getLatLng(results[0]);
            setAddress(selectedAddress);
            setCoordinates(latLng);
          } catch (error) {
            console.error('Error selecting address:', error);
          }
        };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formElement = document.getElementById('incidentForm');
        const formData = new FormData(formElement);

        try {
            const response = await fetch('api/submit', {
                method: 'POST',
                body : formData
            })

            if(response.status === 200) {
                console.log('Form data submitted sucessfully.')
            }
            else {
                console.log('Form submission failed.')
            }
        }
        catch(error) {
            console.log(error)
        }
    }

    // const severityLevels = ["Low", "Medium", "High"];

    const incidentCategories = ["Safety", "Security", "Technical", "Environmental"];
  

    return (
        <div className='incident-form'>
            <h2>Incident Form</h2>
            <form id='incidentForm' onSubmit={handleSubmit}>
                <div className='incident-form__text-area'>
                    <label htmlFor="name">Incident Title: </label>
                    <input type='text' id='incidentTitle' name='offenderName' onChange={handleFormChange} value={formData.incidentTitle}></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="title">Location/Venue: </label>
                    <input type='text' id='location' value={formData.incidentLocation} onChange={handleFormChange} name='location'></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="date">Date of incident: </label>
                    <input type='date' id='date' value={formData.date} onChange={handleFormChange} name='date'></input>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="level">Incident Category: </label>
                    <select id="level" name='incidentCategory' value={formData.incidentCategory} onChange={handleFormChange}>
                        <option value="" disabled>Select a category</option>
                        {incidentCategories.map((level, index) => (
                            <option key={index} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='incident-form__text-area'>
                    <label htmlFor="description">Incident Description: </label>
                    <input type='text' id='description' value={formData.description} name='description'></input>
                </div>
                 <div className='incident-form__text-area'>
                    <label htmlFor="name">Name of offender (if applicable): </label>
                    <input type='text' id='offenderName' name='offenderName' value={formData.offenderName}></input>
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
                <input className='btn' type='submit' value="Submit"></input>
            </form>
        </div>
    ); 
}; 


export default Form;