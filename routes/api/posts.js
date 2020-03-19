const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const authMiddleware = require('../../middleware/authMiddleware.js');
const User = require('../../models/user.model.js');
const Profile = require('../../models/profile.model.js');
const Post = require('../../models/post.model.js');

// POST api/post
// Stworzyć post
// private
router.post('/',[authMiddleware, [
    check("text", "Text is required").not().isEmpty()
]], async (req, res) => {
    // Jeżeli wystąpiły jakieś błędy, zakończ działanie
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) // 400 - bad request
    }
    
    try {
        const user = await User.findOne({ _id: req.user.id }).select('-password');
        const newPost = new Post({
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        });

        const post = await newPost.save();

        res.json(post);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;