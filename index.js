require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const productRoutes = require("./routes/product.routes");
// const userRoutes = require("./routes/user.routes");
const categoryRoutes = require("./routes/category.routes");
const authRoutes = require("./routes/auth.routes");

const db = require("./db/connect");

const app = express();

app.use(express.json());
app.use(cookieParser());

//Connecting DB
db();

// custom middleware
app.use(authRoutes);
app.use(productRoutes);
app.use(categoryRoutes);
// app.use(userRoutes);

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`App is running on PORT ${PORT}`);
});
