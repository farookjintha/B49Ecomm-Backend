const Users = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const payload = req.body;
    //   {
    //       name: '',
    //       email: '',
    //       password: "",
    //       mobileNumber : '',
    //       gender: '',
    //       role:
    //   }

    if (!payload.password) {
      return res.status(400).send({ message: "Password is required" });
    }

    const hashedValue = await bcrypt.hash(payload.password, 15); // 15 -> salting rounds

    payload.hashedPassword = hashedValue;
    //   {
    //       name: '',
    //       email: '',
    //       password: "",
    //       hashedPassword: ''
    //       mobileNumber : '',
    //       gender: '',
    //       role:
    //   }

    delete payload.password;

    //   {
    //       name: '',
    //       email: '',
    //       hashedPassword: ''
    //       mobileNumber : '',
    //       gender: '',
    //       role:
    //   }

    const newUser = new Users(payload);

    newUser
      .save()
      .then((data) => {
        res.status(201).send({
          message: "User has been registered successfully.",
        });
      })
      .catch((error) => {
        res.status(400).send({
          message: "Error while registering user.",
        });
      });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checking if user exists or not
    const existingUser = await Users.findOne({ email: email });

    console.log("Existing USer: ", existingUser);

    // if user doesnt exist
    if (!existingUser) {
      return res.status(400).send({
        message: "User does not exist.",
      });
    }
    // if user exists, compare passwords
    const isValid = await bcrypt.compare(password, existingUser.hashedPassword); // true or false

    // if password is not valid
    if (!isValid) {
      return res.status(401).send({
        message: "Invalid Credentials",
      });
    }

    // if credentials are valid, jwt token has been generated.
    // jsonwebtoken -> json obj is converted into a random string (token)
    // Encryption: orignal form to random form

    // jwt.sign() -> Converting Obj to Token
    // {
    //   _id: 'asdadadad'
    // }

    // ssvsfsfwrtw4rtwfsafasfa with secret key
    const token = await jwt.sign(
      { _id: existingUser._id },
      process.env.SECRET_KEY
    );

    // token has been set in the cookies with expiration of 24Hr
    res.cookie("accessToken", token, {
      expires: new Date(Date.now() + 86400000),
    });

    return res.status(200).send({
      message: "User signed-in successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const signout = async (req, res) => {
  try {
    await res.clearCookie("accessToken");

    return res.status(200).send({
      message: "User has been signed-out successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = { signup, signin, signout };

// SIGN IN
// 1. email and password from request body
// 2. email exists or not.
// 3. credentials check if email exists.
// 4. if valid credentials, token(jwt) generation and setting the token in cookie
// 5. error if credentials are not valid.
