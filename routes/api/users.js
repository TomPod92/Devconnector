const express = require('express');
const router = express.Router();

// GET api/user
// test route
// public
router.get('/', (request, response) => response.send("User route"));

module.exports = router;