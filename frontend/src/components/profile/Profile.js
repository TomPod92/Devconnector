import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getProfileById } from '../../redux/actions/profile.actions.js';
import Spinner from '../layout/Spinner.js';
import ProfileTop from './ProfileTop.js';
import ProfileAbout from './ProfileAbout.js';
import ProfileExperience from './ProfileExperience.js';
import ProfileEducation from './ProfileEducation.js';
import ProfileGithub from './ProfileGithub';

const Profile = (props) => {
    useEffect(()=> {
        props.getProfileById(props.match.params.id);
    }, [props.getProfileById]);

    const { profile, auth, match } = props;

    return (
        <>
            {profile.profile === null || profile.loading ? <Spinner /> : 
                <>
                    <Link to="/profiles" className="btn btn-light">Back to profiles</Link>

                    { auth.isAuthenticated && auth.loading === false &&  auth.user._id === profile.profile.user._id && (<Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)
                    }

                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile.profile}/>
                        <ProfileAbout profile={profile.profile}/>

                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>

                            {profile.profile.experience.length > 0 ? (
                                <>
                                    {profile.profile.experience.map(current => <ProfileExperience key={current._id} experience={current} />)}
                                </>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>

                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.profile.education.length > 0 ? (
                                <>
                                {profile.profile.education.map(education => <ProfileEducation key={education._id} education={education}/>)}
                                </>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>

                        { profile.profile.githubusername && <ProfileGithub username={profile.profile.githubusername}/>}

                    </div>

                    
                </> 
            }
        </>
    );
};

const mapStateToProps = (state) => ({
    profile: state.profileReducer,
    auth: state.authReducer
});
 
export default connect(mapStateToProps, { getProfileById })(Profile);