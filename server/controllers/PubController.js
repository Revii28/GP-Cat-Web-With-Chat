const { Cat, User, CatImage } = require("../models");

module.exports = class PubController {
  static async findAllCats(req, res, next) {
    try {
      const cats = await Cat.findAll({
        where: { adoptionStatus: "Available" },
        include: [
          {
            model: User,
            attributes: ["userName"],
          },
          {
            model: CatImage,
            attributes: ["imgUrl"],
          },
        ],
      });

      res.status(200).json({ cats });
    } catch (err) {
      next(err);
    }
  }
};
