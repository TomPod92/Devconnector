const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    // Pobrac JTW z header'a
    const token = request.header('x-auth-token')
};