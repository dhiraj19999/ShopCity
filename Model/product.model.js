const mongoose = require("mongoose");

const reqString = { type: String, required: true };
const reqNumber = { type: Number, required: true };
const bol={type:Boolean,required: true }

const ProductSchema = mongoose.Schema({
 name: reqString,
  category: reqString,
  image:[String,String,String,String],
  color:[String,String,String,String],
  retail_price: reqNumber,
  discounted_price: reqNumber,
  rating: reqNumber,
  description:reqString,
  brand: reqString,
  unique_id:String,
  cancelable:bol,
  returnable:bol,
  size:[String,String,String,String],
  gender:{type:String}
});

const ProductModel = mongoose.model("products", ProductSchema);

module.exports = {
  ProductModel
};