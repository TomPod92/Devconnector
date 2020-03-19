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
        const post = await Post.findOne({ _id: req.params.post_id });
        console.log(post)
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

//---------------------------------------------------------------------------------------
// DELETE api/post/:post_id
// Usuń pojedyńczego posta
// private
router.delete('/:post_id', authMiddleware, async (req, res) => {
    try {
        // Pobierz posta o danym ID
        const post = await Post.findOne({ _id: req.params.post_id });
        // const post = await Post.findById(req.params.post_id); // inny sposób

        // jeżeli użytkownik jako post_id wpisał cos niepoprawnego np. "01"
        if(!post) {
            return res.status(404).json({ msg: "Post not found"}); // 404 - not found
        }

        // Sprawdz czy użytkownik, który chce usunąć posta jest jego właścicielem
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" }); // 401 - not authorized
        }

        // Usuń posta
        await post.remove();

        res.json({ msg: "Post removed" });
    } catch (error) {
        console.error(error.message);
        // jeżeli użytkownik jako post_id wpisał cos niepoprawnego np. "01"
        if(error.kind === "ObjectId") {
            return res.status(404).json({ msg: "Post not found"}); // 404 - not found
        }
        res.status(500).send('Server error');
    }
});

//---------------------------------------------------------------------------------------
// PUT api/post/like/:post_id
// Dodaj polubienie posta
// private
router.put('/like/:post_id', authMiddleware, async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id });
        // const post = await Post.findById(req.params.post_id); // inny sposób

        // Usuń like'a jeżeli zalogowany użtykownik wcześniej polubił tego posta
        if(post.likes.filter(current => current.user.toString() === req.user.id).length > 0) {
            // Znajdz index like'a do usunięcia
            const indexToRemove = post.likes.findIndex(current => current.user.toString() === req.user.id);
            post.likes.splice(indexToRemove, 1);
            await post.save();

            return res.json(post.likes);
        }

        // Dodaj id zalogowanego użytkownika do tablicy like'ów
        post.likes.unshift({ user: req.user.id });
        await post.save();

        res.json(post.likes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
//---------------------------------------------------------------------------------------
// POST api/post/comment/:post_id
// Dodaj komentarz do posta
// private
router.post('/comment/:post_id',[authMiddleware, [
    check("text", "Text is required").not().isEmpty()
]], async (req, res) => {
    // Jeżeli wystąpiły jakieś błędy, zakończ działanie
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) // 400 - bad request
    }
    
    try {
        const user = await User.findOne({ _id: req.user.id }).select('-password');
        const post = await Post.findOne({ _id: req.params.post_id });

        // Stwórz komentarz i dodaj go do posta
        const newComment = {
            user: req.user.id,
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
        };

        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

//---------------------------------------------------------------------------------------
// DELETE api/post/comment/:post_id/:comment_id
// Usuń komentarz z posta
// private
router.delete('/comment/:post_id/:comment_id', authMiddleware , async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.post_id });
        const comment = post.comments.find(current => current.id === req.params.comment_id);

        // Sprawdzić czy znalazł komentarz
        if(!comment) {
            return res.status(404).json({ msg: "Comment not found" }); // 404 - not found
        }

        // Sprawdzić czy zalogowany użtykownik jest autorem komentarza
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" }); // 401 - not authorized
        }

        // Znajdz index komentarza do usunięcia
        const indexToRemove = post.comments.findIndex(current => current.user.toString() === req.params.comment_id);
        post.comments.splice(indexToRemove, 1);
        await post.save();

        return res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});
//---------------------------------------------------------------------------------------
// PUT api/post/comment/:post_id/:comment_id
// Edytuj komentarz
// private
router.put('/comment/:post_id/:comment_id',[authMiddleware, [
    check('text', 'Text is required').not().isEmpty()
]], async (req, res) => {
    // Jeżeli wystąpiły jakieś błędy, zakończ działanie
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) // 400 - bad request
    }

    try { 
        const post = await Post.findOne({ _id: req.params.post_id });
        const commentIndex = post.comments.findIndex(current => current.id === req.params.comment_id);
        
        // Sprawdzić czy zalogowany użtykownik jest autorem komentarza
        if(post.comments[commentIndex].user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "User not authorized" }); // 401 - not authorized
        }

        // Zmień text danego komentarza
        post.comments[commentIndex].text = req.body.text;
        await post.save();
        
        res.json(post.comments[commentIndex]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;