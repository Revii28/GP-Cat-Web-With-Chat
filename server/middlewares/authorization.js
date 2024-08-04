const { UserProfile, Cat } = require("../models");

const authorizeProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const profile = await UserProfile.findOne({ where: { UserId: id } });
    if (!profile) throw { name: "NotFound", message: "User Profile Not Found" };

    next();
  } catch (err) {
    next(err);
  }
};

const authorizeCat = async (req, res, next) => {
  try {
    const UserId = req.user.id;
    const { id } = req.params;

    const cat = await Cat.findByPk(id);
    if (!cat) throw { name: "NotFound", message: "Cat Not found" };

    if (cat.UserId !== UserId) throw { name: "Forbidden" };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authorizeProfile, authorizeCat };
