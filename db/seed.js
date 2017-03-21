const Picture = require("./models.js").Picture
const Caption = require("./models.js").Caption

Picture.remove({}, err => {
  if (err) {
    console.log(err);
  }
})

Caption.remove({}, err => {
  if (err) {
    console.log(err);
  }
})

var leopard = new Picture({
  "photo_url": "http://i2.cdn.cnn.com/cnnnext/dam/assets/151001180930-04-week-in-photos-1002-super-169.jpg",
  "alt": "Leopard with bucket on head"
})
var pig = new Picture({
  "photo_url": "https://www.ima.umn.edu/~nigam/funny.jpg",
  "alt": "Two people pulling a pig on a leash"
})
var sponge = new Picture({
  "photo_url": "http://static.fjcdn.com/large/pictures/8c/87/8c87eb_2340376.jpg",
  "alt": "Spongebob looking guilty with hands behind back"
})

var caption1 = new Caption({
  "author": "Eva",
  "content": "Help! I'm stuck and I can't get out!"
})
var caption2 = new Caption({
  "author": "Erica",
  "content": "Does this metal hat compliment my fur tone?"
})
var caption3 = new Caption({
  "author": "Eva",
  "content": "Pig: But I don't wanna go to school!"
})
var caption4 = new Caption({
  "author": "Erica",
  "content": "Guess what I have behind my back?"
})

leopard.captions.push(caption1, caption2)
leopard.save((err, picture) => {
  if (err) {
    console.log(err);
  } else {
    console.log(picture)
  }
})
pig.captions.push(caption3)
pig.save((err, picture) => {
  if (err) {
    console.log(err);
  } else {
    console.log(picture)
  }
})
sponge.captions.push(caption4)
sponge.save((err, picture) => {
  if (err) {
    console.log(err);
  } else {
    console.log(picture)
  }
})


// const PicSeedData = require("./pic-seeds.json")
// const CapSeedData = require("./cap-seeds.json")



// Picture.remove({}, () => {
//   Picture.new()
// })
