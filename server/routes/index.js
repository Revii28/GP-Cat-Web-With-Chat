const router = require("express").Router();
const PubController = require("../controllers/PubController");
const catsRouter = require("./cats");
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");
const breedsRouter = require("./breeds");
// const OpenAIController = require("../controllers/OpenAIController");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/login/google", UserController.loginGoogle);
router.get("/pub/cats", PubController.findAllCats);

router.use(authentication);
router.use("/cats", catsRouter);
router.use("/breeds", breedsRouter);
// router.post("/generate-breeds", OpenAIController.generatePromt);

module.exports = router;
