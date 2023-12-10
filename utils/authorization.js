const Users = require("../models/user.model");

const isSellerAccess = async (req, res, next) => {
  try {
    const { _id } = req;

    const currentUser = await Users.findOne({ _id: _id });

    if (currentUser.role !== 1) {
      return res.status(401).send({
        message: "Seller Resource. Not Authorized!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const isAdminAccess = async (req, res, next) => {
  try {
    const { _id } = req;

    const currentUser = await Users.findOne({ _id: _id });

    if (currentUser.role !== 0) {
      return res.status(401).send({
        message: "Admin Resource. Not Authorized!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

const isPrivilegedUserAccess = async (req, res, next) => {
  try {
    const { _id } = req;

    const currentUser = await Users.findOne({ _id: _id });

    if (currentUser.role !== 3) {
      return res.status(401).send({
        message: "Privileged User Resource. Not Authorized!",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

module.exports = { isSellerAccess, isAdminAccess, isPrivilegedUserAccess };

// AUTHORIZATION: which user can access which resource/module/segments
