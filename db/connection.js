const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/picaption_db");
const db = mongoose.connection;

module.exports = mongoose;
