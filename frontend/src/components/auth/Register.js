import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/actions/alert.actions.js';
import { registerUser } from '../../redux/actions/auth.actions.js';
import { Link, Redirect } from 'react-router-dom';

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
            props.registerUser(formData.name, formData.email, formData.password);
        }
    }

    // Jeżeli użytkownik jest już zalogowany, przekieruj go
    if(props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return ( 
        <>
            <h1 className="large text-primary">Sign Up</h1>

            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleInputChange} />
                    <small className="form-text">This site uses Gravatar so if you want a profile image, use a Gravatar email</small>
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" value={formData.password} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Confirm Password" name="confirmPassword"  value={formData.confirmPassword} onChange={handleInputChange} />
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />
            </form>

            <p className="my-1"> Already have an account? <Link to="/login">Sign In</Link></p>
        </>
     );
}

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});
 
export default connect(mapStateToProps, { setAlert, registerUser })(Register);