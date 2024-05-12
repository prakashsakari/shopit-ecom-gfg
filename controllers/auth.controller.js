const Users = require("../models/users.model");
const { nameRegex } = require("../utilities");
const jwt = require("jsonwebtoken");

const tokenSecretKey = "84b8f988-397c-494a-b708-3ea36745fd58";

const signup = async (req, res) => {
  try {
    const { name, email, password, number } = req.body;
    if (!nameRegex.test(name)) {
      res
        .status(400)
        .json({ status: "error", data: "name should be alphabets only" });
    } else if (!nameRegex.test(number)) {
      res
        .status(400)
        .json({ status: "error", data: "number should be number only" });
    } else {
      const user = new Users({
        name,
        email,
        password,
        number,
      });
      const savedUser = await user.save();
      res.status(201).json({ status: "success", data: savedUser });
    }
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      message: `unable to create a new user - ${err}`,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await Users.findOne({ number: req.body.number });
    if (!user) {
      res.status(401).json({
        status: "error",
        data: {
          errorMessage: "Invalid number",
        },
      });
    }
    if (user.password !== req.body.password) {
      res.status(401).json({
        status: "error",
        data: {
          errorMessage: "Invalid password",
        },
      });
    }
    const token = jwt.sign({ number: user.number }, tokenSecretKey);

    res.status(200).json({ status: "success", data: { token } });
  } catch (err) {
    res.status(500).json({
      status: "error",
      data: {
        errorMessage: "unable to login",
      },
    });
  }
};

module.exports = { signup, login };
