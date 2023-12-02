const Products = require("../models/products.model");

const getAllProducts = (req, res) => {
  try {
    Products.find()
      .then((data) => {
        res.status(200).send({
          message: "Products have been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while retrieving products.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const getProductById = (req, res) => {
  try {
    let productId = req.params.productId;

    Products.findById(productId)
      .then((data) => {
        res.status(200).send({
          message: "Product has been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while retrieving a product by id.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const addProduct = (req, res) => {
  try {
    const newProduct = new Products(req.body);

    newProduct
      .save()
      .then((data) => {
        res
          .status(201)
          .send({ message: "A new product has been added successfully." });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while adding a new product",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    let productId = req.params.productId;

    let existingProduct = await Products.findById(productId);

    if (!existingProduct) {
      return res.status(400).send({
        message: "Product doesnot exist.",
      });
    }

    Products.findByIdAndUpdate({ _id: productId }, { $set: req.body })
      .then((data) => {
        res.status(200).send({
          message: "Product has been updated successfully.",
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while updating product.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    let productId = req.params.productId;

    let existingProduct = await Products.findById(productId);

    if (!existingProduct) {
      return res.status(400).send({
        message: "Product doesnot exist.",
      });
    }

    Products.findByIdAndDelete({ _id: productId })
      .then((data) => {
        res.status(200).send({
          message: "Product has been deleted successfully.",
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while deleting product.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
