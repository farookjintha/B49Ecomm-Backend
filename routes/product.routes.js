const express = require("express");
const router = express.Router();

const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/products.controller");

// To retrieve all products
router.get("/products", getAllProducts);

// To retrieve a product using productId
router.get("/products/:productId", getProductById);

// To Add a new product
router.post("/products", addProduct);

// To update a product
router.put("/products/:productId", updateProduct);

// To delete a product
router.delete("/products/:productId", deleteProduct);

module.exports = router;
