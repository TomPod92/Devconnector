import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../redux/actions/auth.actions.js';

const Navbar = (props) => {
    
    const handleLogout = () => props.logout();

    const authLinks = (
        <ul>
            <li>
                <a href="#!" onClick={handleLogout}>
                    <i className="fas fa-sign-out-alt" />{' '}
                    <span className="hide-sm">Logout</span>
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li><Link to="dashboard">Developers</Link></li>
            <li><Link to="register">Register</Link></li>
            <li><Link to="login">Login</Link></li>
        </ul>
    );

    return ( 
        <nav className="navbar bg-dark">
            <h1> <Link to="/"><i className="fas fa-code"></i> DevConnector</Link></h1>
            { !props.auth.loading && (<>{ props.auth.isAuthenticated ? authLinks : guestLinks }</>)}
        </nav>
     );
}

const mapStateToProps = state => ({
    auth: state.authReducer
});
 
export default connect(mapStateToProps, { logout })(Navbar);