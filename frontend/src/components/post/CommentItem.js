import React from 'react';
import { connect } from 'react-redux';
import { removeComment } from '../../redux/actions/post.actions.js';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

const CommentItem = (props) => {
    const handleRemoveComment = () => props.removeComment(props.post_id, props.comment._id);

    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${props.comment.user}`}>
              <img className="round-img" src={props.comment.avatar} alt=""/>
              <h4>{props.comment.name}</h4>
            </Link>
          </div>

          <div>
                <p className="my-1">{props.comment.text}</p>
                <p className="post-date">Posted on <Moment format="YYYY/MM/DD">{props.comment.date}</Moment></p>
                {!props.auth.loading && props.auth.user._id === props.comment.user && (
                    <button className="btn btn-danger" onClick={handleRemoveComment} type="button"><i className="fas fa-times"></i></button>
                )}
          </div>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.authReducer
});
 
export default connect(mapStateToProps, { removeComment })(CommentItem);