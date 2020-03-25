import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loginUser } from '../../redux/actions/auth.actions.js';

const Login = (props) => {

    const [ formData, setFormData ] = useState({
        email: '',
        password: '',
    });

    const handleInputChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        props.loginUser(formData.email, formData.password);
    }

    // Jeżeli użytkownik jest już zalogowany, przekieruj go
    if(props.isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return ( 
        <>
            <h1 className="large text-primary">Sign In</h1>

            <p className="lead"><i className="fas fa-user"></i>Sign Into Your Account</p>

            <form className="form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={formData.email} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <input type="password" placeholder="Password" name="password" minLength="6" value={formData.password} onChange={handleInputChange} />
                </div>

                <input type="submit" className="btn btn-primary" value="Login" />
            </form>

            <p className="my-1">Don't have an account? <Link to="/register">Sign Up</Link></p>
        </>
     );
};

const mapStateToProps = state => ({
    isAuthenticated: state.authReducer.isAuthenticated
});
 
export default connect(mapStateToProps, { loginUser })(Login);