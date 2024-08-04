const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { match } = require("../helpers/bcryptjs");
const client = new OAuth2Client();
const clientId = process.env.GOOGLE_CLIENT_ID;

module.exports = class UserController {
  static async register(req, res, next) {
    try {
      const { userName, email, password, confirmPassword } = req.body;

      if (password !== confirmPassword)
        throw { name: "Validate", message: "Password doesn't match" };

      const user = await User.create({
        userName,
        email,
        password,
      });

      res.status(201).json({
        username: user.userName,
        email: user.email,
        message: "Register Success",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "Required", message: "Email is required" };
      if (!password)
        throw { name: "Required", message: "Password is required" };

      const user = await User.findOne({ where: { email } });

      if (!user)
        throw { name: "Validate", message: "Email has not been registered" };

      const isValidPassword = match(password, user.password);

      if (!isValidPassword)
        throw { name: "Validate", message: "Invalid password" };

      const token = signToken({ id: user.id });

      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: clientId,
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        hooks: false,
        defaults: {
          userName: payload.name,
          email: payload.email,
          password: Math.random().toString(),
        },
      });

      const token = signToken({ id: user.id });
      res.status(created ? 201 : 200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }
};
