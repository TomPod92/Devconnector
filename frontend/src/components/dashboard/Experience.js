import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteExperience } from '../../redux/actions/profile.actions.js';

const Experience = (props) => {

    const experiences = props.experience.map(current => (
        <tr key={current._id}>
            <td>{current.company}</td>
            <td className="hide-sm">{current.title}</td>
            <td>
                <Moment format="YYYY/MM/DD">{moment.utc(current.from)}</Moment> -{' '}

                {current.to === null ? (
                    ' Now'
                ) : (
                    <Moment format="YYYY/MM/DD">{moment.utc(current.to)}</Moment>
                )}
            </td>

            <td>
                <button onClick={() => props.deleteExperience(current._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return ( 
        <>
            <h2 className="my-2">Experience Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className="hide-sm">Title</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>{experiences}</tbody>
            </table>
        </>
    );
}
 
export default connect(null, { deleteExperience })(Experience);