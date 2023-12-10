const jwt = require("jsonwebtoken");

const isAuth = async (req, res, next) => {
  const { cookies } = req;

  if (cookies.accessToken) {
    // jwt.verify() -> converting token into obj with secret key;

    // Decryption: random form to original form
    const userObj = await jwt.verify(
      cookies.accessToken,
      process.env.SECRET_KEY
    );

    req._id = userObj._id;

    if (!userObj._id) {
      return res.status(401).send({
        message: "Not Authenticated.",
      });
    }

    return next();
  }

  return res.status(401).send({
    message: "Not Authenticated",
  });
};

module.exports = { isAuth };

// AUTHENTICATION: whether this user access our application or not -> Can Sign in or not
