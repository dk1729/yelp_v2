var mongoose = require('../mongo/config');

var dish_details = mongoose.model('dish_details', {
  rest_id:{
    type:String
  },
  dish_name:{
    type:String
  },
  ingredients:{
    type:String
  },
  dish_price:{
    type:Number
  },
  description:{
    type:String
  },
  dish_type:{
    type:String
  },
  dish_path:{
    type:String
  }
})

module.exports = {dish_details};