const jwt = require("jsonwebtoken");

const secret = "mysecretssshhhhhhh";
const expiration = "2h";

module.exports = {
    // rewrite the given file since we no longer use RESTapi with req,res and next()
    // we use GraphQL with JWT now, all we care is req and token return
    // hint: copy and paste the authMiddleware file from the lecture files
    authMiddleware: function ({ req }) {
        let token =
            req.body.token || req.query.token || req.headers.authorization;

        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }

        if (!token) {
            return req;
        }

        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration });
            req.user = data;
        } catch {
            console.log("Invalid token");
        }

        return req;
    },
    signToken: function ({ email, username, _id }) {
        const payload = { email, username, _id };
        return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
    },
};
