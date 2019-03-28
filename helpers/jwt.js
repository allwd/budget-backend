const expressJwt = require('express-jwt');
const userService = require('../routes/users/users.service');

module.exports = jwt;

function jwt() {
    const secret = process.env.SECRET;
    return expressJwt({ secret, isRevoked }).unless({
        path: [
            '/users/authenticate',
            '/users/register',
            /\/api-docs/i
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    if (!user) {
        return done(null, true);
    }

    done();
}