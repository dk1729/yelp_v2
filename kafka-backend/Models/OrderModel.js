var mongoose = require('../mongo/config');

var order_details = mongoose.model('order_details', {
  rest_id:{
    type:String
  },
  status:{
    type:String
  },
  user_id:{
    type:String
  },
  mode:{
    type:String
  },
  total:{
    type:String
  },
  dishes:{
    type:Array
  }
})

module.exports = {order_details};