const Products = require("../models/products.model");
const products = require("../dB/products");

const postAllProducts = async (req, res) => {
  try {
    await Products.deleteMany({});
    const data = await Products.insertMany(products.data);
    res.status(201).json({ status: "SUCCESS", data });
  } catch (err) {
    res.status(500).json({
      status: "ERROR",
      data: {
        errorMessage:
          "We are not able to process your request. Please try again after sometime",
      },
    });
    console.log("failed to add to DB", err);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({});
    res.status(200).json({ status: "SUCCESS", data: products });
  } catch (err) {
    res
      .status(500)
      .json({
        status: "ERROR",
        data: {
          errorMessage:
            "We are not able to process your request. Please try again after sometime",
        },
      });
  }
};

module.exports = { postAllProducts, getAllProducts };
