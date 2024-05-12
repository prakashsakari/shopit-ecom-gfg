const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://prakash:prakash@cluster0.uushmhn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    );
  } catch (err) {
    console.log("failed to connect to database", err);
  }
};

module.exports = connectDB;
