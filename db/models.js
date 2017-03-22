const mongoose = require("./connection.js");
// let Schema = mongoose.Schema

const CaptionSchema = new mongoose.Schema(
  {
    author: String,
    content: String,
  },
  {
    timestamps: true
  }
)

const PictureSchema = new mongoose.Schema(
  {
    photo_url: String,
    alt: String,
    captions: [CaptionSchema]
  }
)

const Picture = mongoose.model("Picture", PictureSchema)
const Caption = mongoose.model("Caption", CaptionSchema)

module.exports = {
  Picture,
  Caption
}
