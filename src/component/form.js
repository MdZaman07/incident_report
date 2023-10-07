import React, {useState} from 'react';
import './form.css';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';
import { selectClasses } from '@mui/material';

const Form = () => {

    //const [address, setAddress] = useState('');
    //const [coordinates, setCoordinates] = useState(null);
  

    const[formData, setFormData] = useState( {
        incidentTitle: "",
        incidentLocation: "",
        //witnessName: "", Shouldnt be required as a login should note the witness name.
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

        if(formData.incidentTitle == "" || formData.description == "" || formData.incidentLocation == "") {
            alert("One of the mandatory fields is empty, please try again.")
        }
        else {
            try {
                const response = await fetch('http://localhost:4000/api/submit', {
                    method: 'POST',
                    body : JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                })
    
                if(response.status === 200) {
                    console.log('Form data submitted sucessfully.')
                }
                else {
                    console.log('Form submission failed.')
                    console.log(response.status)
                }
            }
            catch(error) {
                console.log(error)
            }
        }

        
    }

    // const severityLevels = ["Low", "Medium", "High"];

    const incidentCategories = ["Safety", "Security", "Technical", "Environmental"];
  

    return (
        <div className='incident-form'>
            <h2>Incident Form</h2>
            <form id='incidentForm' onSubmit={handleSubmit}>
                <div className='incident-form__text-area'>
                    <input type='text' id='incidentTitle' placeholder='Title*' name='incidentTitle' onChange={handleFormChange} value={formData.incidentTitle}></input>
                </div>
                <div className='incident-form__text-area'>
                    <input type='text' id='incidentLocation' placeholder='Location*' value={formData.incidentLocation} onChange={handleFormChange} name='incidentLocation'></input>
                </div>
                <div className='incident-form__text-area'>
                    <input type='date' placeholder='Date*' id='date' value={formData.date} onChange={handleFormChange} name='date'></input>
                </div>
                <div className='incident-form__text-area'>
                    <select id="incidentCategory" name='incidentCategory' value={formData.incidentCategory} onChange={handleFormChange}>
                        <option value="" disabled>Incident Category</option>
                        {incidentCategories.map((level, index) => (
                            <option key={index} value={level}>
                                {level}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='incident-form__text-area'>
                <textarea
                        id='description'
                        placeholder='Description (character limit 500)'
                        value={formData.description}
                        onChange={handleFormChange}
                        name='description'
                        rows="5"
                        maxLength='500'
                    ></textarea>
                </div>
                 <div className='incident-form__text-area'>
                    <input type='text' placeholder='Name of offender (if applicable)' id='offenderName' name='offenderName' onChange={handleFormChange} value={formData.offenderName}></input>
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