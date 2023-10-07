import React, {useState} from 'react';
import "./signup.css";


const Signup = () => {

      const[formData, setFormData] = useState( {
        userid: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        verifyPassword: ""
      })

      const[error, setError] = useState('')

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
          setError('Passwords do not match')
        }
        else {
          setError('')
          try {
            const response = await fetch('http://localhost:4000/api/register', {
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
            />
          </div>
          {error && <p className="error">{error}</p>}
          <input
            type="submit"
            value="Sign-Up"
            className="btn"
          />
        </form>
        <a className="link" href="/login.js">Back to Login</a>
      </div>
    )
}
export default Signup;
