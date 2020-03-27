import React from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import moment from 'moment';
import { deleteEducation } from '../../redux/actions/profile.actions.js';

const Education = (props) => {

    const educations = props.education.map(current => (
        <tr key={current._id}>
            <td>{current.school}</td>
            <td className="hide-sm">{current.degree}</td>
            <td>
                <Moment format="YYYY/MM/DD">{moment.utc(current.from)}</Moment> -{' '}
                
                {current.to === null ? (
                    ' Now'
                ) : (
                    <Moment format="YYYY/MM/DD">{moment.utc(current.to)}</Moment>
                )}
            </td>

            <td>
                <button onClick={() => props.deleteEducation(current._id)} className="btn btn-danger">Delete</button>
            </td>
        </tr>
    ));

    return ( 
        <>
            <h2 className="my-2">Education Credentials</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>School</th>
                        <th className="hide-sm">Degree</th>
                        <th className="hide-sm">Years</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>{educations}</tbody>
            </table>
        </>
    );
}
 
export default connect(null, { deleteEducation })(Education);