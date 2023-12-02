const mongoose = require("mongoose"); // Node.js ORM for MongoDB

const db = async () => {
  try {
    await mongoose.connect(
      // "mongodb://localhost:27017/myShopDB"
      "mongodb+srv://farookjintha:Welcome123@b49wetamil.51bb8l2.mongodb.net/?retryWrites=true&w=majority"
    );
    console.log("Database connection established...");
  } catch (error) {
    console.log("Error While connecting DB: ", error);
  }
};

module.exports = db;
