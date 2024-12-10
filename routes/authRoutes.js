const express = require("express");
const router = express.Router();
const { verifyEmail } = require("../controllers/authController");
const authController = require("../controllers/authController");
//const { upload } = require('../middlewares/upload');
//const { register } = require('../controllers/authController');

router.route("/register").post(authController.register);
//router.post('/register', upload, register);
router.route("/login").post(authController.login);
router.get("/verify-email", verifyEmail);


module.exports = router;