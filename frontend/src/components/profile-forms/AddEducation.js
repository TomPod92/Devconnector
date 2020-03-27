import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { addEducation } from '../../redux/actions/profile.actions.js';

const AddEducation = (props) => {

    const [ formData, setFormData ] = useState({
        school: '',
        degree: '',
        fieldofstudy: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, setToDateDisabled] = useState(false);

    const { school, degree, fieldofstudy, from, to, current, description } = formData;

    const handleInputChange = (event) => setFormData({...formData, [event.target.name]: event.target.value});

    const handleCheckboxChange = () => {
        setFormData({...formData, current: !current});
        setToDateDisabled(!toDateDisabled);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        props.addEducation(formData, props.history);
    };

    return ( 
        <>
            <h1 className="large text-primary">Add Yuor Education</h1>

            <p className="lead"><i className="fas fa-code-branch"></i> Add any school that you have attended</p>

            <small>* = required field</small>

            <form className="form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                    <input type="text" placeholder="* School" name="school" value={school} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="* Degree" name="degree" value={degree} onChange={handleInputChange} required />
                </div>

                <div className="form-group">
                    <input type="text" placeholder="Field of Study" name="fieldofstudy" value={fieldofstudy} onChange={handleInputChange}/>
                </div>

                <div className="form-group">
                    <h4>From Date</h4>
                    <input type="date" name="from" value={from} onChange={handleInputChange}/>
                </div>

                <div className="form-group">
                    <p><input type="checkbox" name="current" checked={current} value={current} onChange={handleCheckboxChange} />{' '}Current</p>
                </div>

                <div className="form-group">
                    <h4>To Date</h4>
                    <input type="date" name="to"  value={to} onChange={handleInputChange} disabled={toDateDisabled ? 'disabled' : ''}/>
                </div>

                <div className="form-group">
                    <textarea name="description" cols="30" rows="5" placeholder="Program Description" value={description} onChange={handleInputChange}></textarea>
                </div>

                <input type="submit" className="btn btn-primary my-1" />
                <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
            </form>
        </>
    );
}
 
export default connect(null, { addEducation })(withRouter(AddEducation));