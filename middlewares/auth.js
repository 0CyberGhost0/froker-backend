const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {
        const authToken = req.header("auth-token");

        console.log(authToken);

        if (!authToken) {
            return res.json({ message: "Authentication token is missing, access denied" });
        }

        const decodedToken = jwt.verify(authToken, "password");

        if (!decodedToken) {
            return res.json({ message: "Token verification failed, authorization denied" });
        }

        req.userId = decodedToken.id;
        req.authToken = authToken;
        next();
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = authMiddleware;
