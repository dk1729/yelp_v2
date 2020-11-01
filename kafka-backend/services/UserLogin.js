var {user_details} = require('../Models/UserDetails');
var bcrypt = require('bcrypt');

function handle_request(msg, callback){   
  console.log("Inside user login kafka backend");
  console.log(msg);
  
  //main logic

  user_details.findOne({email:msg.email}, function(err, result){
      console.log("I got invoked")
      if(err){
        console.log("Error in signup")
        callback(null,{code:500,message:"Some Error Occured in Signup"})
      }
      else if(result != null){
        console.log("Email already in use")
        var b = {}
        //bcrypt logic
        bcrypt.compare(msg.password, results.password, function (err, isMatch) {
          if (isMatch && !err) {
            b.email = results.email;
            b.id = results._id;
            callback(null,{code:200,message:b})
          } else {
            callback(null,{code:403,message:"Credentials don't match"})
          }
        }, function (err2) {
            if (err2) {
              console.log(err2)
            }
        })
        //bcrypt logic ends
        callback(null, {code:403,message:"Email already in use"})
      }
      else{
        console.log("User doesn't exist")
        callback(null, {code:204,message:"User does not exist"})
      }
    })

  //main logic ends
  console.log("after callback of user login");
};

exports.handle_request = handle_request;