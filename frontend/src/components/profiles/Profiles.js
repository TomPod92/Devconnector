import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllProfiles } from '../../redux/actions/profile.actions.js';
import Spinner from '../layout/Spinner.js';
import ProfileItem from './PorfileItem.js';

const Profiles = (props) => {
    useEffect(() => {
        props.getAllProfiles();
    }, []);

    if(props.profile.loading) {
        return <Spinner />
    }

    return ( 
        <>
        <h1 className="large text-primary">Developers</h1>
        <p className="lead">
            <i className="fab fa-connectdevelop">Browse and connect with developers</i>
        </p>

        <div className="profiles">
            {props.profile.profiles.length > 0 ? (
                props.profile.profiles.map(current => <ProfileItem key={current._id} profile={current}/>)
            ) : (
            <h4>No profiles found</h4>
            )}
        </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    profile: state.profileReducer
});

export default connect(mapStateToProps, { getAllProfiles })(Profiles);