const router = require("express").Router();
const authController = require('../controller/Auth');

//route Auth
router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);


module.exports = router