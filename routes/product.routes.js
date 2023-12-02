const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");
const { isAuth } = require("../utils/authentication");

// To retrieve all products
router.get("/products", getAllProducts);

// To retrieve a product using productId
router.get("/products/:productId", getProductById);

// To Add a new product
router.post("/products", isAuth, addProduct);

// To update a product
router.put("/products/:productId", isAuth, updateProduct);

// To delete a product
router.delete("/products/:productId", isAuth, deleteProduct);

module.exports = router;
