const express = require('express');
const router = express.Router();
const authMiddleware = require('../../middleware/authMiddleware.js');
const Profile = require('../../models/profile.model.js');
const User = require('../../models/user.model.js');

// GET api/profile/me
// Pobierz profil zalogowanego użtykownika
// private
router.get('/me',authMiddleware, async (req, res) => {
    try {
        // pobierz profil użytkownika (gdzie user === req.user.id) i dodaj do niego "name" i "avatar"
        // pierwszy argument "populate" to model, z którego będziemy wyciągali dane
        // drugi argument to pola, które będziemy wyciągali
        const profile = await Profile.findOne({ user: req.user.id }).populate('User', ['name', 'avatar']);

        // jeżeli nie znalazł profilu dla użytkownika o danym ID, zwróc błąd
        if(!profile) return res.status(400).json({ msg: "No profile for that user" }) // 400 - bad request

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});

module.exports = router;