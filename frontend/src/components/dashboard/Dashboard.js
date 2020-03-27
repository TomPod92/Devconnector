import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getLoggedUserProfile } from '../../redux/actions/profile.actions.js';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions.js';
import Spinner from '../layout/Spinner.js';

const Dashboard = (props) => {
    useEffect(() => {
        props.getLoggedUserProfile();
    }, []);

    if(props.profile.loading && props.profile.profile === null) {
        return <Spinner />
    }

    return ( 
        <>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Welcome {props.auth.user && props.auth.user.name}
            </p>

            {props.profile.profile !== null ? (
                <><DashboardActions/></>
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
 
export default connect(mapStateToProps, { getLoggedUserProfile })(Dashboard);