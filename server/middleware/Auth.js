const jwt = require("jsonwebtoken");
require('dotenv').config()

const isAuth = (req, res, next) => {
    const { AccessToken } = req.cookies
    if (!AccessToken) {
        return res.status(400).json({ message: "Login again." })
    }
    jwt.verify(AccessToken, process.env.SecretKey, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: err })
        }
        if (decoded) {
            req.user = decoded.userData
        }
        next()
    });
}

module.exports = isAuth