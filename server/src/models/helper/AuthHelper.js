const jwt = require('jsonwebtoken');
const User = require('../user');
const OPTIONS = require('../../config/Options');
const { resCode, apiErrorStrings, errorTypes } = require('./MessagesHelper');
const { default: mongoose } = require('mongoose');

const hasRole = (user, roles) => {
  if (roles && roles.length) {
    return [OPTIONS.usersRoles.SUPER_ADMIN].includes(user.role)
      ? true
      : roles.indexOf(user.role) > -1;
  }
  return false;
};
const verifyJwt = async (token, roles, force) => {
  const secretOrKey = process.env.JWT_SECRET_KEY;
  return await jwt.verify(token, secretOrKey, async (err, jwtPayload) => {
    if (err) {
      return {
        status: resCode.HTTP_UNAUTHORIZED,
        errorMessage: apiErrorStrings.UNAUTHORIZED_ACCESS,
        errorType: errorTypes.UNAUTHORIZED_ACCESS,
      };
    }
    if (jwtPayload && jwtPayload.id) {
      const existingUser = await User.findOne({
        _id: new mongoose.Types.ObjectId(jwtPayload.id),
        status: { $ne: OPTIONS.defaultStatus.DELETED },
      });

      console.log("your found by token",existingUser)
      if (
        !existingUser &&
        ![OPTIONS.defaultStatus.ACTIVE].includes(existingUser.status)
      ) {
        return {
          status: resCode.HTTP_UNAUTHORIZED,
          errorMessage: apiErrorStrings.ACCOUNT_BLOCKED,
          errorType: errorTypes.ACCOUNT_BLOCKED,
        };
      }
      if (existingUser && !roles?true:hasRole(existingUser, roles)) {
        return { status: resCode.HTTP_OK, user: existingUser };
      }
      return {
        status: resCode.HTTP_UNAUTHORIZED,
        errorMessage: apiErrorStrings.UNAUTHORIZED_ACCESS,
        errorType: errorTypes.UNAUTHORIZED_ACCESS,
      };
    }
    if (!force) {
      return { status: resCode.HTTP_OK };
    }
    return {
      status: resCode.HTTP_FORBIDDEN,
      errorType: errorTypes.FORBIDDEN,
    };
  });
};
exports.verifyJwt = verifyJwt;

exports.authenticateJWT = function (roles, force = true) {
  return function (req, res, next) {

    console.log("authenticator run");
    let authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(' ')[1];   // only for testing need to change in production
     console.log("your token",token)
      return verifyJwt(token, roles, force).then((checkAuth) => {
        if (checkAuth.status === resCode.HTTP_OK) {
          req.authenticated = true;
          req.user = checkAuth.user;
          next();
        } else {
          return res.sendStatus(checkAuth.status);
        }
      });
    } else {
      return res.sendStatus(401);
    }
  };
};
