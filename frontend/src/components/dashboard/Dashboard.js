import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLoggedUserProfile, deleteAccount } from '../../redux/actions/profile.actions.js';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions.js';
import Experience from './Experience.js';
import Education from './Education.js';
import Spinner from '../layout/Spinner.js';

const Dashboard = (props) => {
    useEffect(() => {
        props.getLoggedUserProfile();
    }, []);

    if(props.profile.loading && props.profile.profile === null) {
        return <Spinner />
    }

    const handleDeleteAccount = () => {
        props.deleteAccount();
    }

    return ( 
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {props.auth.user && props.auth.user.name}
            </p>

            {props.profile.profile !== null ? (
                <>
                    <DashboardActions/>
                    <Experience experience={props.profile.profile.experience} />
                    <Education education={props.profile.profile.education} />
                    <div className="my-2">
                        <button className="btn btn-danger" onClick={handleDeleteAccount}>
                            <i className="fas fa-user-minus"></i>Delete my account
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="brn btn-primary my-1">Create Profile</Link>
                </>
            )}
        </>
    );
}

const mapStateToProps = state => ({
    auth: state.authReducer,
    profile: state.profileReducer
});
 
export default connect(mapStateToProps, { getLoggedUserProfile, deleteAccount })(Dashboard);