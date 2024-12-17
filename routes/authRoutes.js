const express = require("express");
const router = express.Router();

const { verifyEmail } = require("../controllers/authController");
const authController = require("../controllers/authController");
//const { register } = require('../controllers/authController');
const AppointmentController = require("../controllers/AppointmentController")

router.route("/register").post(authController.register);
//router.post('/register', upload, register);
router.route("/login").post(authController.login);
router.get("/verify-email", verifyEmail);
router.post("/app", AppointmentController.CreateAppointment)





module.exports = router;