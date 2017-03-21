const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1/picaption_db");
const db = mongoose.connection;

module.exports = mongoose;
