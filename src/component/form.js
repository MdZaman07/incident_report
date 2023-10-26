import React, {useState} from 'react';
import './form.css';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { InputTextarea } from 'primereact/inputtextarea';       
import { ProgressSpinner } from 'primereact/progressspinner';
        

const Form = ( {userData} ) => {

    const userId = userData ? userData._id : null


    const[status, setStatus] = useState('')
    const[loading, setLoading] = useState(false)

    //const [address, setAddress] = useState('');
    //const [coordinates, setCoordinates] = useState(null);
  

    const[formData, setFormData] = useState( {
        incidentTitle: "",
        incidentLocation: "",
        offenderName: "",
        date: "",
        description: "",
        incidentCategory: "",
        status: 'pending',
        userId: userId, // Id of user who submits form
        file: null
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

        if(formData.incidentTitle === "" || formData.description === "" || formData.incidentLocation === "" 
        || formData.date === null) {
            setStatus("One of the mandatory fields was empty. Please try again.")
        }
        else {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:4000/api/submit', {
                    method: 'POST',
                    body : JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                })
    
                if(response.status === 200) {
                    console.log(userId)
                    console.log('Form data submitted sucessfully.')
                    setFormData({
                        incidentTitle: "",
                        incidentLocation: "",
                        offenderName: "",
                        date: "",
                        description: "",
                        incidentCategory: "",

                    })
                    setLoading(false);
                    setStatus('Incident form submitted successfully.')
                }
                else {
                    setLoading(false);
                    console.log('Form submission failed.')
                    setStatus('Form fail to submit, please try again.')
                }
            }
            catch(error) {
                setLoading(false);
                console.log(error)
                setStatus('Form fail to submit, please try again.')
            }
        }
        
    }

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFormData((prevData) => ({
          ...prevData,
          file: selectedFile,
        }));
      };

    // const severityLevels = ["Low", "Medium", "High"];

    const incidentCategories = ["Safety", "Security", "Technical", "Environmental"];

    const locations = ["Broadway Sydney", "Westfield Sydney", "Pit Street Mall"]
  

    return (
        <div className='incident-form'>
            <form id='incidentForm' onSubmit={handleSubmit}>
                <div className='incident-form__text-area'>
                    <InputText type='text' id='incidentTitle' placeholder='Title*' name='incidentTitle' onChange={handleFormChange} value={formData.incidentTitle}></InputText>
                </div>
                <div className='incident-form__text-area'>
                <Dropdown className='dropdown' id="incidentLocation" name='incidentLocation' placeholder='Venue Locations*' options={locations} value={formData.incidentLocation} onChange={handleFormChange}></Dropdown>
                </div>
                <div className='incident-form__text-area'>
                    <Calendar className='custom-date' placeholder='Date of incident*' id='date' value={formData.date} onChange={handleFormChange} name='date'></Calendar>
                </div>
                <div className='incident-form__text-area'>
                    <Dropdown id="incidentCategory" className='dropdown' options={incidentCategories} placeholder='Incident Category*' name='incidentCategory' value={formData.incidentCategory} onChange={handleFormChange}/>
                </div>
                <div className='incident-form__text-area'>
                <InputTextarea
                        id='description'
                        placeholder='Description (character limit 500)'
                        value={formData.description}
                        onChange={handleFormChange}
                        name='description'
                        rows="5"
                        maxLength='500'
                        autoResize
                    ></InputTextarea>
                </div>
                 <div className='incident-form__text-area'>
                    <InputText type='text' placeholder='Name of offender (if applicable)' id='offenderName' name='offenderName' onChange={handleFormChange} value={formData.offenderName}></InputText>
                </div>
               <div className='incident-form__text-area'>
                    <label htmlFor="file">Attach image/video: </label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        accept=".jpg, .jpeg, .png"
                        onChange={handleFileChange}
                    />
                </div>
                {loading ? <ProgressSpinner style={{width: '50px', height: '50px'}}/> : null}
                {status && <p className="status">{status}</p>}
                <Button className='submit-button' icon="pi pi-check" iconPos="right" severity='success' type='submit' label="Submit"></Button>
            </form>
        </div>
    ); 
}; 


export default Form;