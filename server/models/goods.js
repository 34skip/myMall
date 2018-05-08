var mongoose = require('mongoose')
var Schema = mongoose.Schema

var produtSchema = new Schema({
  "productId" : String,
  "productName" : String,
  "prodcutPrice" : Number,
  "prodcutImg" : String
})

module.exports = mongoose.model("Good",produtSchema)
