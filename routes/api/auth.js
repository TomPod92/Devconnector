const express = require('express');
const router = express.Router();

// GET api/auth
// test route
// public
router.get('/', (request, response) => response.send("Auth route"));

module.exports = router;