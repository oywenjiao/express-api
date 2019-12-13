const Tools = require('wj-general-tools');
const config = require(process.cwd() + '/app/config/env');
const secret = config.jwt_secret;
const jwt = new Tools.Jwt(secret);
module.exports = jwt;
