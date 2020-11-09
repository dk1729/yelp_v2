var {user_details} = require('../Models/UserDetails')

function handle_request(msg, callback){   
  console.log("Inside fetch users kafka backend");
  console.log(msg);
  
  //main logic
  user_details.find({_id:{$ne:msg.user_id}}, {password:0, __v:0}, function(err, result){
    console.log("I got the result, señor")
    if(err){
      console.log("Err", err)
      callback(null, {code:500, message:"Some error occured"})
    }
    else{
      callback(null, {code:200, message:result})      
    }
  })
  //main logic ends
  console.log("after callback of fetch users");
};

exports.handle_request = handle_request;