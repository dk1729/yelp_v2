var {rest_details} = require('../Models/RestDetails');

function handle_request(msg, callback){   
  console.log("Inside update rest data kafka backend");
  console.log(msg);
  
  //main logic

  updates = {}
  for (var key in msg) {
    if (msg.hasOwnProperty(key)) {
      console.log(key + " -> " + msg[key]);
      if(key!=="rest_id"){
        console.log("Going in")
        updates[key] = msg[key]
      }
    }
  }

  console.log({...updates})
  rest_details.updateOne({_id:msg.rest_id}, {$set:{...updates}}, function(err, result){
    console.log("I got invoked")
    console.log(result);
    if(err){
      console.log("Error in update")
      console.log(err)
      callback(null,{code:500,message:"Some Error Occured in Signup"})
    }
    else if(result != null){
      console.log("Let's update rest data")        
      callback(null,{code:200,message:"Updated"})
    }
    else{
      console.log("Restaurant doesn't exist")
      callback(null, {code:204,message:"Restaurant does not exist"})
    }
  })

  //main logic ends
  console.log("after callback of rest update data");
};

exports.handle_request = handle_request;