var {user_details} = require('../Models/UserDetails');

function handle_request(msg, callback){   
    console.log("Inside add user photo kafka backend");
    //main logic
    user_details.updateOne({_id:msg.user_id}, {$set:{path:msg.file}}, function(err, result){
      console.log("I got invoked")
      if(err){
        console.log("Error in update")
        console.log(err)
        callback(null,{code:500,message:"Some Error Occured in Signup"})
      }
      else if(result != null){
        console.log("Let's update")        
        callback(null,{code:200,message:"Updated"})
      }
      else{
        console.log("User doesn't exist")
        callback(null, {code:204,message:"User does not exist"})
      }
    })
    //main logic ends
    console.log("after callback of add user photo");
};

exports.handle_request = handle_request;