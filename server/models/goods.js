var mongoose = require('mongoose')
var Schema = mongoose.Schema

var produtSchema = new Schema({
  "productId" : String,
  "productName" : String,
  "prodcutPrice" : Number,
  'prodcutNum': Number,
  'cheaked': String,
  "prodcutImg" : String
})

module.exports = mongoose.model("Good",produtSchema)
