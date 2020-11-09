var {rest_details} = require('../Models/RestDetails');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken')
var passport = require('passport')

function handle_request(msg, callback){   
  console.log("Inside rest login kafka backend");
  console.log(msg);
  
  //main logic

  rest_details.findOne({email:msg.email}, function(err, result){
    console.log("I got invoked")
    if(err){
      console.log("Error in Login")
      callback(null,{code:500,message:"Some Error Occured in Rest Login"})
    }
    else if(result != null){
      var b = {}
      //bcrypt logic
      bcrypt.compare(msg.password, result.password, function (err, isMatch) {
        if (isMatch && !err) {
          b.email = result.email;
          b.rest_id = result._id;
          var token={
            email: msg.username,
            user: "user"
          }
          var signed_token = jwt.sign(token, config.secret, {
            expiresIn: 86400 // in seconds
          });
          callback(null,{code:200,message:{b, signed_token}})
        } else {
          callback(null,{code:403,message:"Credentials don't match"})
        }
      }, function (err2) {
          if (err2) {
            console.log(err2)
          }
      })
      //bcrypt logic ends
    }
    else{
      console.log("Restaurant doesn't exist")
      callback(null, {code:204,message:"Restaurant does not exist"})
    }
  })
  //main logic ends
  console.log("after callback of rest login");
};

exports.handle_request = handle_request;