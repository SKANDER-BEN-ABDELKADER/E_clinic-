const express = require("express");
const router = express.Router();
const { verifyEmail } = require("../controllers/authController");
const authController = require("../controllers/authController");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.get("/verify-email", verifyEmail);


module.exports = router;