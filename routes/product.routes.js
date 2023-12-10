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
const { isSellerAccess } = require("../utils/authorization");

// To retrieve all products
router.get("/products", getAllProducts);

// To retrieve a product using productId
router.get("/products/:productId", getProductById);

// To Add a new product
router.post("/products", isAuth, isSellerAccess, addProduct);

// To update a product
router.put("/products/:productId", isAuth, isSellerAccess, updateProduct);

// To delete a product
router.delete("/products/:productId", isAuth, isSellerAccess, deleteProduct);

module.exports = router;
