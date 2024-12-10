const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");


router.route("/:categorie").get(productController.CategorieFilter);

module.exports = router;