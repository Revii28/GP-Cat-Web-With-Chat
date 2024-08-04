const axios = require("axios");

module.exports = class CatAPI {
  static async getAllBreeds(req, res, next) {
    try {
      const { data } = await axios.get("https://api.thecatapi.com/v1/breeds", {
        headers: {
          common: {
            "x-api-key": process.env.CAT_API_KEY,
          },
        },
      });
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
  static async getCatImage(req, res, next) {
    const { imageId } = req.params;
    try {
      const { data } = await axios.get(
        `https://api.thecatapi.com/v1/images/${imageId}`,
        {
          headers: {
            common: {
              "x-api-key": process.env.CAT_API_KEY,
            },
          },
        }
      );
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }
};
