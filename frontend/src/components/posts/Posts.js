import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPosts } from '../../redux/actions/post.actions.js';
import Spinner from '../layout/Spinner.js';
import PostItem from './PostItem.js';

const Posts = (props) => {
    useEffect(() => {
        props.getPosts();
    }, [props.getPosts])

    if(props.post.loading) {
        return <Spinner />
    }

    return (
        <>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user"></i>Welcome to the community
            </p>
            <div className="posts">
                {props.post.posts.map(current => <PostItem key={current._id} post={current} />)}
            </div>
        </>
    )
}

const mapStateToProps = state => ({
    post: state.postReducer
});
 
export default connect(mapStateToProps, { getPosts })(Posts);