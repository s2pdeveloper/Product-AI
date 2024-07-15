
require('dotenv').config();

const jwtOptions = {};
jwtOptions.secretOrKey = process.env.JWT_SECRET_KEY;
jwtOptions.expiry = process.env.TOKEN_EXPIRE_TIME;

module.exports = jwtOptions;
