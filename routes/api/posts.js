const express = require('express');
const router = express.Router();

// GET api/post
// test route
// public
router.get('/', (request, response) => response.send("Post route"));

module.exports = router;