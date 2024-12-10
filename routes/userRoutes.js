const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const verifyJWT = require("../middelwares/verifyJWT");
const {verifyRoles} = require("../middelwares/verifyRoles");

router.use(verifyJWT);

router.route("/all").get(verifyRoles ('admin', 'moderator'), userController.getUsers);
router.route("/:id").get(userController.getUserById);
router.route("/update/:id").put(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteUser);



module.exports = router;