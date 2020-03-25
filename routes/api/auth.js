const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const authMiddleware = require('../../middleware/authMiddleware.js');
const User = require('../../models/user.model.js');

// GET api/auth
// Pobierz użtykownika
// public
router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
//---------------------------------------------------------------------------------------
// POST api/auth
// Zaloguj użytkownika i pobierz token
// public
router.post('/', [
    check('email', 'Email is invalid').isEmail(),
    check('password', 'Password is required').exists()
], async (req, res) => {

    const { email, password } = req.body;
    const errors = validationResult(req);

    // Jeżeli wystąpiły jakieś błędy, zakończ działanie
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }) // 400 - bad request
    }

    try {
        // sprawdz czy użykownik z takim email'em istnieje
        let user = await User.findOne({ email: email });
        if(!user) return res.status(400).json({ errors: [{msg: "Invalid credentials"}] });

        // Sprawdź czy podane hasło pokrywa się z tym, które jest w bazie danych
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({ errors: [{msg: "Invalid credentials"}] });

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