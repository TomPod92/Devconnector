const express = require('express');
const router = express.Router();

// GET api/profile
// test route
// public
router.get('/', (request, response) => response.send("Profile route"));

module.exports = router;