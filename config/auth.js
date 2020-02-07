const jwt = require('jsonwebtoken');
const config = require('./keys');

module.exports = (req, res, next) => {
    const token = req.header('authorization');
    if (!token) {
        return res.status(401).json({ error: "Authorization Required" });
    }

    try {
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json ({ errorMessage: err });
    }
}