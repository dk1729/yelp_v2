var mongoose = require('../mongo/config');

var reviews = mongoose.model('reviews', {
  rest_id:{
    type:String
  },
  user_id:{
    type:String
  },
  rating:{
    type:Number
  },
  review:{
    type:String
  }
})

module.exports = {reviews};