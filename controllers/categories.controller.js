const Categories = require("../models/category.model");

const getAllCategories = (req, res) => {
  try {
    Categories.find()
      .then((data) => {
        res.status(200).send({
          message: "Categories have been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while retrieving Categories.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const getCategoryById = (req, res) => {
  try {
    let categoryId = req.params.categoryId;

    Categories.findById(categoryId)
      .then((data) => {
        res.status(200).send({
          message: "Category has been retrieved successfully.",
          data: data,
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while retrieving a category by id.",
          error: error,
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const addCategory = (req, res) => {
  try {
    const newCategory = new Categories(req.body);

    newCategory
      .save()
      .then((data) => {
        res
          .status(201)
          .send({ message: "A new category has been added successfully." });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while adding a new category",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    let categoryId = req.params.categoryId;

    let existingCategory = await Categories.findById(categoryId);

    if (!existingCategory) {
      return res.status(400).send({
        message: "Category doesnot exist.",
      });
    }

    Categories.findByIdAndUpdate({ _id: categoryId }, { $set: req.body })
      .then((data) => {
        res.status(200).send({
          message: "Category has been updated successfully.",
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while updating Category.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let categoryId = req.params.categoryId;

    let existingCategory = await Categories.findById(categoryId);

    if (!existingCategory) {
      return res.status(400).send({
        message: "Category doesnot exist.",
      });
    }

    Categories.findByIdAndDelete({ _id: categoryId })
      .then((data) => {
        res.status(200).send({
          message: "Category has been deleted successfully.",
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while deleting Category.",
        });
      });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  addCategory,
  updateCategory,
  deleteCategory,
};
