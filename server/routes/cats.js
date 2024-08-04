const CatController = require("../controllers/CatController");
const { authorizeCat } = require("../middlewares/authorization");
const upload = require("../middlewares/multer");
const uploadMultiple = require("../middlewares/uploadMultiple");

const router = require("express").Router();

router.get("/", CatController.findUserCats);
router.post(
  "/",
  upload.array("images", 3),
  uploadMultiple,
  CatController.createCat
);
// router.get("/:id", authorizeCat, CatController.findOneCat);
router.patch("/:id", authorizeCat, CatController.changeCatStatus);
router.delete("/:id", authorizeCat, CatController.deleteCat);

module.exports = router;
