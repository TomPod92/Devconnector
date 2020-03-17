const jwt = require('jsonwebtoken');
const config = require('config');

// Dodanie tej funkcji jako middleware to któregoś endpointa wystarczy aby zrobić z niego "protected route"
// WYKŁAD 13 od Brad'a

module.exports = function(req, res, next) {
    // Pobrac JTW z header'a zapytania
    const token = req.header('x-auth-token');

    // Jeżeli JTW nie istnieje, zwróć błąd
    if(!token) return res.status(401).json({ msg: "No token, authorization denied" }); // 401 - unauthorized

    // Sprawdz czy JWT jest poprawny (porówna jwtSecret z zakodowanym secret'em znajdującym się w przesłanym token'ie)
    try {
        const decodedToken = jwt.verify(token, config.get('jwtSecret'));

        // dzięki temu w każdym endpoint'cie który ma dodany ten middleware, będziemy mieli dostęp do "req.user"
        req.user = decodedToken.user;
        next();
    } catch (error) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};