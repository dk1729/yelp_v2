var {user_details} = require('../Models/UserDetails');

function handle_request(msg, callback){   
  console.log("Inside update user data kafka backend");
  console.log(msg);
  
  //main logic

  updates = {}
  for (var key in msg) {
    if (msg.hasOwnProperty(key)) {
      console.log(key + " -> " + msg[key]);
      if(key!=="id"){
        console.log("Going in")
        updates[key] = msg[key]
      }
    }
  }

  console.log({...updates})
  user_details.updateOne({_id:msg.id}, {$set:{...updates}}, function(err, result){
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
  console.log("after callback of user login");
};

exports.handle_request = handle_request;