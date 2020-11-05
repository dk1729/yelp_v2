var mongoose = require('../mongo/config');

var event_details = mongoose.model('event_details', {
  rest_id:{
    type:String
  },
  event_name:{
    type:String
  },
  event_hash:{
    type:String
  },
  event_description:{
    type:String
  },
  event_location:{
    type:String
  },
  event_date:{
    type:Date
  },
  registered_users:{
    type:Array
  }
})

module.exports = {event_details};