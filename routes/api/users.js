const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const config = require('config');
const User = require('../../models/user.model.js');

// POST api/user
// Zarejestruj użtkownika
// public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Enter a password with 6+ characters').isLength({min: 6})
], async (req, res) => {

    const { name, email, password } = req.body;
    const errors = validationResult(req);

    // Jeżeli wystąpiły jakieś błędy, zakończ działanie
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }) // 400 - bad request

    try {
        // sprawdz czy użykownik z takim email'em już istnieje
        let user = await User.findOne({ email: email });
        if(user) return res.status(400).json({ errors: [{msg: "User already exists"}] });

        // pobierz avatar
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

        // stwórz nowego użytkownika (hash'owanie hasła) i zapisz go do bazy
        user = new User({ name, email, avatar, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        // stwórz i zwróć JWT na frontend
        // będzie on zawierać ID użytkownika z bazy danych
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (error, token) => {
            if(error) throw error;
            res.json({ token: token })
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
//---------------------------------------------------------------------------------------
module.exports = router;