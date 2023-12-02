const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const { signup, signin, signout } = require("../controllers/auth.controller");

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;

// AUTHENTICATION

// signup -> POST /signup

// body: {
//     name: '',
//     email: '',
//     mobileNumber: '',
//     password: '',
//     gender: ""
// }

// Steps to be followed while signup:

// email and mobileNumber should be unique
// password is mandatory.

// if passowrd is available,

// encryption / decryption ->

// Encryption
// Welcome123 -> ASDFSGDFDBERG32423424EGSGDREETET$%%$#%#@
// Decryption
// ASDFSGDFDBERG32423424EGSGDREETET$%%$#%#@ -> Welcome123

// hashing
// Welcome123 -> ASDFSGDFDBERG32423424EGSGDREETET$%%$#%#@
// compare with the hashed data

// converting password to hashedPassword
// saving new user.

//
//
//

// signin -> POST /signin

// body: {
//     email: "",
//     password: ""
// }

// signout -> GET /signout
