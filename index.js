const express = require('express');
const parser = require('body-parser');
const hbs = require('hbs');
const mongoose = require('./db/connection.js');

// pulling schemas from models
const Picture = require('./db/models.js').Picture;
const Caption = require('./db/models.js').Caption;


let app = express();

app.set("port", process.env.PORT || 3002);
app.set("view engine", "hbs");
app.use("/assets", express.static("public"));
app.use(parser.json({extended: true}));

app.get("/", function(req, res) {
  res.send(console.log("hello it's me"));
})

app.listen(app.get("port"), function(){
  console.log("Port works!");
})
