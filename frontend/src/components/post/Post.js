import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getSinglePost } from '../../redux/actions/post.actions.js';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner.js';
import PostItem from '../posts/PostItem.js';
import CommentForm from './CommentForm.js';
import CommentItem from './CommentItem.js';

const Post = (props) => {
    useEffect(() => {
        props.getSinglePost(props.match.params.post_id);
    }, []);

    if(props.postState.loading || props.postState === null) return <Spinner />

    return (
        <>
            <Link to="/posts" className="btn">Back to posts</Link>
            <PostItem post={props.postState.post} showActions={false} />
            <CommentForm post_id={props.postState.post._id}/>
            <div className="comments">
                {props.postState.post.comments.map(current => <CommentItem key={current._id} comment={current} post_id={props.postState.post._id} />)}
            </div>
        </>
    );
};

const mapStateToProps = state => ({
    postState: state.postReducer
});
 
export default connect(mapStateToProps, { getSinglePost })(Post);