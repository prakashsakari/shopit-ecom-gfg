const Wishlist = require("../models/wishlist.model");

const getAllWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({});
    res.status(200).json({ status: "success", data: wishlist });
  } catch (err) {
    res.status(500).json({
      status: "error",
      data: { errorMessage: "something went wrong" },
    });
  }
};

const createWishlist = async (req, res) => {
  try {
    console.log(req.body.product);
    const product = new Wishlist(req.body.product);
    const savedProduct = await product.save();
    !savedProduct
      ? res.status(400).json({
          status: "error",
          data: { errorMessage: "nothing to add to wishlist" },
        })
      : res.status(201).json({ status: "success" });
  } catch (err) {
    res.status(500).json({
      status: "error",
      data: { errorMessage: "unable to add to wish" },
    });
    console.log("err -", err);
  }
};

const deleteWishlist = async (req, res) => {
  try {
    await Wishlist.findByIdAndDelete(req.params.id);
    res.status(200).json({ status: "success" });
  } catch (err) {
    res
      .status(500)
      .json({ status: "error", data: { errorMessage: "something went wrong" } });
  }
};

module.exports = { createWishlist, deleteWishlist, getAllWishlist };
