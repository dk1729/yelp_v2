var mongoose = require('../mongo/config');

var messages = mongoose.model('messages', {
  chat_id:{
    type:String
  },
  messageTerm:{
    type:String
  },
  side:{
    type:String
  }
})

module.exports = {messages};