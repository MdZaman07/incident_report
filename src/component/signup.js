import React, {useState} from 'react';
import "./signup.css";
import {Link, Navigate, useNavigate} from 'react-router-dom';


const Signup = () => {

      const navigate = useNavigate()

      const[formData, setFormData] = useState( {
        userid: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        verifyPassword: ""
      })

      const[status, setStatus] = useState('')
      const[submitDisabled, setSubmitDisabled] = useState(false);

      const handleFormChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;

        setFormData(prevData => ({
            ...prevData,
            [fieldName]: fieldValue
        }));
      }

      const handleSubmit = async (event) => {
        event.preventDefault()

        if(formData.password !== formData.verifyPassword) {
          setStatus('Passwords do not match')
        }
        else {
          setStatus('')
          try {
            const response = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                body : JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json', 
                },
            })
            if(response.status === 200) {
                setSubmitDisabled(true)
                setStatus('Sign up successful. An email notification has been sent for confirmation. Redirecting...')

                setTimeout(() => {
                  navigate('/login.js');
                }, 2000);
                console.log('Form data submitted sucessfully.')
            }
            else {
                setStatus('Error. Try again.')
                console.log('Form submission failed.')
                console.log(response.status)
            }
        }
        catch(error) {
          console.log(error)
        }
      }
    }

      return (
        <div className="Signup">
        <h4>Sign-up!</h4>
        <form onSubmit={handleSubmit}>
          <div className="text_area">
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleFormChange}
              placeholder="First Name"
              className="text_input"
              required

            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleFormChange}
              placeholder="Last Name"
              className="text_input"
              required

            />
          </div>
          <div className="text_area">
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              placeholder="Email Address"
              className="text_input"
              required

            />
          </div>
          <div className="text_area">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              onChange={handleFormChange}
              className="text_input"
              required

            />
          </div>
          <div className="text_area">
            <input
              type="password"
              id="verifyPassword"
              name="verifyPassword"
              value={formData.verifyPassword}
              placeholder="Verify Password"
              onChange={handleFormChange}
              className="text_input"
              required
            />
          </div>
          {status && <p className="status">{status}</p>}
          <input
            type="submit"
            value="Sign-Up"
            className="btn"
            disabled={submitDisabled}
          />
        </form>
        <br></br>
        <Link className='link' to='/login.js'>Go to Login</Link>
      </div>
    )
}
export default Signup;

