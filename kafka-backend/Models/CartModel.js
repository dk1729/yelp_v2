var mongoose = require('../mongo/config');

var cart = mongoose.model('cart', {
  dish_id:{
    type:String
  },
  rest_id:{
    type:String
  },
  count:{
    type:Number
  },
  user_id:{
    type:String
  },
  dish_path:{
    type:String
  }
})

module.exports = {cart};