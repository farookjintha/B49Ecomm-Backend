const express = require("express");
const router = express.Router();

const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");

// To retrieve all products
router.get("/categories", getAllCategories);

// To retrieve a product using productId
router.get("/categories/:categoryId", getCategoryById);

// To Add a new product
router.post("/categories", addCategory);

// To update a product
router.put("/categories/:categoryId", updateCategory);

// To delete a product
router.delete("/categories/:categoryId", deleteCategory);

module.exports = router;
