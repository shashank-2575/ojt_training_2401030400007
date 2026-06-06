const mongoose = require("mongoose");

const mongoURI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/billingSystem";

mongoose.connect(mongoURI);

module.exports = mongoose;
