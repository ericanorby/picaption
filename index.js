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
  res.render("main")
})

app.get("/api/pictures", function(req,res) {
  Picture.find({}).then(function(pictures){
    res.json(pictures)
  })
})

app.get("/api/pictures/:id", function(req,res) {
  Picture.findOne({_id: req.params.id}).then(function(picture){
    res.json(picture)
  })
})

app.post("/api/pictures", function(req, res){
  Picture.create(req.body).then(function(picture){
    res.json(picture);
  });
});

app.delete("/api/pictures/:id", function(req, res){
  Picture.findOneAndRemove({_id: req.params.id}).then(function(){
    res.json({success: true});
  });
});

app.put("/api/pictures/:id", function(req, res){
  Picture.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}).then(function(picture){
    res.json(picture);
  });
});

//not sure what route to use but this one makes sense, but it seems to be throwing an error?
app.post("/api/pictures/:pic_id/captions", function(req,res) {
  Picture.findOne({_id: req.params.pic_id}).then(function(picture){
    Caption.create(req.body.caption).then((caption) => {
      console.log(caption)
    })
  })
})

app.listen(app.get("port"), function(){
  console.log("Port works!");
})
