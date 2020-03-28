import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getGithubRepos } from '../../redux/actions/profile.actions.js'
import Spinner from '../layout/Spinner.js';

const ProfileGithub = (props) => {
    useEffect(() => {
        props.getGithubRepos(props.username);
    }, [props.getGithubRepos]);
    
    return (
        <div className="profile-github">
            <h2 className="text-primary my-1">Github repos</h2>
            
            {props.repos === null ? <Spinner /> : (
                props.repos.map(current => (
                    <div key={current.id} className="repo bg-white p-1 my-1">
                        <div>
                            <h4><a href={current.html_url} target="_blank" rel="noopener noreferrer">{current.name}</a></h4>
                            <p>{current.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className="badge badge-primary">Stars: {current.stargazers_count}</li>
                                <li className="badge badge-dark">Watchers: {current.watchers_count}</li>
                                <li className="badge badge-light">Forks: {current.forks_count}</li>
                            </ul>
                        </div>
                    </div> 
                ))
            )}
        </div>
    );
};

const mapStateToProps = state => ({
    repos: state.profileReducer.repos
});
 
export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);