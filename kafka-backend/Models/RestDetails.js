var mongoose = require('../mongo/config');

var rest_details = mongoose.model('rest_details', {
  rest_name:{
    type:String
  },
  email:{
    type:String
  },
  password:{
    type:String
  },
  zip:{
    type:String
  },
  location:{
    type:String
  },
  timings:{
    type:String
  },
  delivery:{
    type:Boolean
  },
  takeout:{
    type:Boolean
  },
  dineout:{
    type:Boolean
  },
  description:{
    type:String
  },
  hood:{
    type:String
  },
  address:{
    type:String
  },
  latitude:{
    type:String
  },
  longitude:{
    type:String
  },
  path1:{
    type:String
  },
  path2:{
    type:String
  },
  path3:{
    type:String
  },
  path4:{
    type:String
  }
  
})

module.exports = {rest_details};