var {rest_details} = require('../Models/RestDetails');

function handle_request(msg, callback){   
  console.log("Inside add user photo kafka backend");
  //main logic
  rest_details.updateOne({_id:msg.rest_id}, {$set:{path1:msg.path1, path2:msg.path2, path3:msg.path3, path4:msg.path4}}, function(err, result){
    console.log("I got invoked")
    if(err){
      console.log("Error in update")
      console.log(err)
      callback(null,{code:500,message:"Some Error Occured in Adding rest photos"})
    }
    else if(result != null){
      console.log("Let's update")
      callback(null,{code:200,message:"Updated"})
    }
    else{
      console.log("Rest doesn't exist")
      callback(null, {code:204,message:"Rest does not exist"})
    }
  })
  //main logic ends
  console.log("after callback of add rest photo");
};

exports.handle_request = handle_request;