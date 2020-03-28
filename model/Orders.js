const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
  vendor:{type:String},
  product_name: {type: String},
  currency:{type: String},
  created_on:Date,
  products: {type: Array},
  price:{type: Number},
  customer:{
    name:{type: String},
    email:{type: String},
    address:{type: String},
    city:{type:String},
    zip:{type:Number},
    phone:{type: Number}
  }
})



module.exports = mongoose.model('Orders', OrderSchema);
