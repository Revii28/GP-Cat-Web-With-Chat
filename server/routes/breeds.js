const CatAPI = require("../controllers/CatAPI");

const router = require("express").Router();

router.get("/", CatAPI.getAllBreeds);
router.get("/image/:imageId", CatAPI.getCatImage);

module.exports = router;
