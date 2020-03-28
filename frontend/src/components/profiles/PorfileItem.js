import React from 'react';
import { Link } from 'react-router-dom';

const ProfileItem = (props) => {
    const { user, name, status, company, location, _id, skills } = props.profile

    return (
        <div className="profile bg-light">
            <img className="round-img" src={user.avatar} alt="profile picture"/>

            <div>
                <h2>{name}</h2>
                <p>{status} {company && <span> at {company}</span> }</p>
                <p className="my-1">{location && <span>{location}</span> }</p>
                <Link to={`/profile/${user._id}`} className="btn btn-primary">View Profile</Link>
            </div>

            <ul>
                {skills.slice(0,4).map((current, index) => (
                    <li key={index} className="text-primary">
                        <i className="fas fa-check"></i>{current}
                    </li>
                ))}
            </ul>
        </div>
    );
};
 
export default ProfileItem;