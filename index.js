const express = require("express");
const productRoutes = require("./routes/product.routes");
// const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");

const db = require("./db/connect");

const app = express();

app.use(express.json());

//Connecting DB
db();

// custom middleware
app.use(productRoutes);
app.use(categoryRoutes);
// app.use(userRoutes);

app.listen(5000, () => {
  console.log("App is running on PORT 5000");
});
