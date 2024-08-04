const { Cat, CatImage } = require("../models");

module.exports = class CatController {
  static async findUserCats(req, res, next) {
    try {
      const UserId = req.user.id;
      const cats = await Cat.findAll({ where: { UserId }, include: CatImage });
      if (!cats) throw { name: "NotFound", message: "Cat Not found" };

      res.status(200).json({ cats });
    } catch (err) {
      next(err);
    }
  }

  static async createCat(req, res, next) {
    try {
      const images = req.images;
      const UserId = req.user.id;
      if (!images || images.length < 1)
        throw { name: "Required", message: "Please upload the image" };
      const { name, breed, age, gender, description, contact } = req.body;
      const cat = await Cat.create({
        name,
        breed,
        age,
        gender,
        description,
        contact,
        UserId,
      });

      for (let image of images) {
        await CatImage.create({ imgUrl: image, CatId: cat.id });
      }
      res.status(201).json({ cat });
    } catch (err) {
      next(err);
    }
  }

  static async changeCatStatus(req, res, next) {
    try {
      const { id } = req.params;
      const cat = await Cat.findByPk(id);

      let adoptionStatus =
        cat.adoptionStatus == "Available" ? "Unavailable" : "Available";

      const updateCat = await cat.update({
        adoptionStatus,
      });
      res.status(200).json({ updateCat });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCat(req, res, next) {
    const { id } = req.params;
    try {
      await CatImage.destroy({ where: { CatId: id } });
      await Cat.destroy({ where: { id } });
      res.status(200).json({ message: "Delete success" });
    } catch (err) {
      next(err);
    }
  }
};
