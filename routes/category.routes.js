const express = require("express");
const router = express.Router();
const { isAuth } = require("../utils/authentication");

const {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categories.controller");
const { isAdminAccess } = require("../utils/authorization");

// To retrieve all products
router.get("/categories", getAllCategories);

// To retrieve a product using productId
router.get("/categories/:categoryId", getCategoryById);

// To Add a new product
router.post("/categories", isAuth, isAdminAccess, addCategory);

// To update a product
router.put("/categories/:categoryId", isAuth, isAdminAccess, updateCategory);

// To delete a product
router.delete("/categories/:categoryId", isAuth, isAdminAccess, deleteCategory);

module.exports = router;
