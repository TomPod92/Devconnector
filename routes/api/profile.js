const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
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
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        // jeżeli nie znalazł profilu dla użytkownika o danym ID, zwróc błąd
        if(!profile) return res.status(400).json({ msg: "No profile for that user" }) // 400 - bad request

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error')
    }
});
//---------------------------------------------------------------------------------------
// POST api/profile
// Stwórz/zautualizuj profil użytkownika
// private
router.post('/', [authMiddleware, [
    check('status', 'Status is required').not().isEmpty(),
    check('skills', 'Skills should not be empty').not().isEmpty()
]], async (req, res) => {

    // Jeżeli wystąpiły jakieś błędy, zakończ działanie
    const errors = validationResult(req);
    if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() }) // 400 - bad request

    // Stwórz obiekt profile
    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;

    const profileFields = {};

    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills) profileFields.skills = skills.split(',').map(current => current.trim());
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(linkedin) profileFields.social.linkedin = linkedin;
    if(instagram) profileFields.social.instagram = instagram;
    
    try {
        // Jeżeli profil dla użytkownika o danym ID istnieje zaktualizuj go
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile) {
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile);
        }
        // Jeżeli profil nie istnieje, stwórz go 
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

});
//---------------------------------------------------------------------------------------
// GET api/profile
// Pobierz wszystkie profile
// public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
});
//---------------------------------------------------------------------------------------
// GET api/profile/user/:user_id
// Pobierz profil o danym user_id
// public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if(!profile) return res.status(400).json({ msg: "Profile not found" }); // 400 - bad request

        res.json(profile);
    } catch (error) {
        console.error(error.message);
        if(error.kind == 'ObjectId') return res.status(400).json({ msg: "Profile not found" }); // 400 - bad request
        res.status(500).send("Server error");
    }
});

module.exports = router;