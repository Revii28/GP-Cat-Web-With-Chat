const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const access_token = req.headers.authorization;
    if (!access_token) throw { name: "Unauthenticated" };

    const [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") throw { name: "Unauthenticated" };

    const payload = verifyToken(token);

    if (!payload) throw { name: "Unauthenticated" };

    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated" };

    req.user = { id: user.id };

    next();
  } catch (err) {
    next(err);
  }
};

const authSocket = async (socket, next) => {
  try {
    const access_token = socket.handshake;
    console.log(access_token);
    if (!access_token) throw { name: "Unauthenticated" };

    const [bearer, token] = access_token.split(" ");
    if (bearer !== "Bearer") throw { name: "Unauthenticated" };

    const payload = verifyToken(token);

    if (!payload) throw { name: "Unauthenticated" };

    const user = await User.findByPk(payload.id);
    if (!user) throw { name: "Unauthenticated" };

    req.user = { id: user.id };

    next();
  } catch (err) {
    next(new Error("Authentication error"));
  }
};

module.exports = { authentication, authSocket };
