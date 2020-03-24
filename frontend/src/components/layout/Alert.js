import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => props.alerts !== null && props.alerts.length > 0 && props.alerts.map(current => (
    <div className={`alert alert-${current.alertType}`} key={current.id}>{current.msg}</div>
));


const mapStateToProps = (state) => ({
    alerts: state.alertReducer
});
 
export default connect(mapStateToProps)(Alert);