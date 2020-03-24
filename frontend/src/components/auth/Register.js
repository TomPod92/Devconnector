import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert.actions.js';
import { Link } from 'react-router-dom';

const Register = (props) => {

    const [ formData, setFormData ] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

    const handleFormSubmit = (event) => {
        event.preventDefault();

        if( formData.password !== formData.confirmPassword) {
            props.setAlert('Passwords do not match', 'danger');
        } else {
            console.log(formData)

        }
    }

    return ( 
        <>
            <h1 className="large text-primary">Sign Up</h1>

            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={formData.name}  onChange={handleInputChange}required />
                </div>

                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleInputChange} />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" minLength="6" value={formData.password} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="confirmPassword" minLength="6"  value={formData.confirmPassword} onChange={handleInputChange} />
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />
            </form>

            <p className="my-1"> Already have an account? <Link to="/login">Sign In</Link></p>
        </>
     );
}
 
export default connect(null, { setAlert })(Register);