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
//---------------------------------------------------------------------------------------
// GET api/post
// Pobierz wszystkie posty
// private
router.get('/', authMiddleware, async (req, res) => {
    try {
        // Pobierz wszytskie posty i posortuj je od najnowszego do najstarszego
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//---------------------------------------------------------------------------------------
// GET api/post/:post_id
// Pobierz pojedyńczego posta
// private
router.get('/:post_id', authMiddleware, async (req, res) => {
    try {
        // Pobierz posta o danym ID
        const post = await Post.find({ _id: req.params.post_id });
        // const post = await Post.findById(req.params.post_id); // inny sposób

        if(!post) {
            return res.status(404).json({ msg: "Post not found"}); // 404 - not found
        }

        res.json(post);
    } catch (error) {
        console.error(error.message);

        // jeżeli użytkownik jako post_id wpisał cos niepoprawnego np. "01"
        if(error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found"}); // 404 - not found
        }

        res.status(500).send('Server error');
    }
});

module.exports = router;