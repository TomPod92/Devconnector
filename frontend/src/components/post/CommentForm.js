import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addComment } from '../../redux/actions/post.actions.js';

const CommentForm = (props) => {
    const [text, setText] = useState('');

    const handleTextChange = (event) => setText(event.target.value);

    const handleSumbit = (event) => {
        event.preventDefault();
        props.addComment(props.post_id, {text});
        setText('');
    }

    return (
        <div className="post-form">
            <div className="bg-primary p">
                <h3>Leave comment</h3>
            </div>

            <form className="form my-1" onSubmit={handleSumbit}>
                <textarea name="text" value={text} onChange={handleTextChange} cols="30" rows="5" placeholder="Comment on this post" required></textarea>
                <input type="submit" className="btn btn-dark my-1" value="Submit" />
            </form>
        </div>
    );
}
 
export default connect(null, { addComment })(CommentForm);