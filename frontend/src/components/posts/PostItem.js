import React from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../redux/actions/post.actions.js';

const PostItem = (props) => {

    const handleAddLike = () => props.addLike(props.post._id);
    const handleRemoveLike = () => props.removeLike(props.post._id);
    const handleDeletePost = () => props.deletePost(props.post._id);

    return (
        <div className="post bg-white p-1 my-1">
          <div>
            <Link to={`/profile/${props.post.user}`}>
                <img className="round-img" src={props.post.avatar} alt=""/>
                <h4>{props.post.name}</h4>
            </Link>
          </div>

          <div>
            <p className="my-1">{props.post.text}</p>
            <p className="post-date">Posted on <Moment format="YYYY/MM/DD">{props.post.date}</Moment></p>

            {props.showActions && 
                <>
                    <button type="button" className="btn btn-light" onClick={handleAddLike}>
                        <i className="fas fa-thumbs-up">
                            { props.post.likes.length > 0 && <span>{'  '}{props.post.likes.length}</span> }
                        </i>
                    </button>

                    <button type="button" className="btn btn-light" onClick={handleRemoveLike}>
                        <i className="fas fa-thumbs-down"></i>
                    </button>

                    <Link to={`/posts/${props.post._id}`} className="btn btn-primary">
                        Discussion{'  '} 
                        {props.post.comments.length > 0 && 
                        <span className="comment-count">{props.post.comments.length}</span>
                        }
                    </Link>

                    { !props.auth.loading && 
                    props.post.user === props.auth.user._id && 
                    <button type="button" className="btn btn-danger" onClick={handleDeletePost}><i className="fas fa-times"></i></button>
                    }
                </>
            }
            
          </div>
        </div>
    );
}

const mapStateToProps = state => ({
    auth: state.authReducer
});
 
export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem);