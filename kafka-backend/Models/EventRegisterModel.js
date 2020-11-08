var mongoose = require('../mongo/config');

var event_register = mongoose.model('event_register', {
  event_id:{
    type:String
  },
  user_id:{
    type:String
  }
})

module.exports = {event_register};