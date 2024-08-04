const { ChatMessage, Recipient } = require("../models");

module.exports = class ChatController {
  static async getMessages(req, res, next) {
    try {
      const { message } = req.body;
      const messages = await ChatMessage.create({
        message,
        UserId: req.user.id,
        RecipientId: "",
      });
    } catch (err) {
      next(err);
    }
  }
};
