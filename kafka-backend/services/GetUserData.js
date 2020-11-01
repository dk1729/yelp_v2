var {user_details} = require('../Models/UserDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch user data kafka backend");
  console.log(msg);
  
  //main logic

  user_details.findOne({_id:msg.id}, {password:0, __v:0} , function(err, result){
      console.log("I got invoked")
      console.log(result)
      if(err){
        console.log("Error in signup")
        callback(null,{code:500,message:"Some Error Occured in Signup"})
      }
      else if(result != null){
        callback(null,{code:200,message:result})
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