var {rest_details} = require('../Models/RestDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch rest data kafka backend");
  console.log(msg);
  
  //main logic

  rest_details.findOne({_id:msg.rest_id}, {password:0, __v:0} , function(err, result){
      console.log("I got invoked")
      console.log(result)
      if(err){
        console.log("Error in fetching data")
        callback(null,{code:500,message:"Some Error Occured in fetching rest data"})
      }
      else if(result != null){
        callback(null,{code:200,message:result})
      }
      else{
        console.log("Rest doesn't exist")
        callback(null, {code:204,message:"Restaurant does not exist"})
      }
    })

  //main logic ends
  console.log("after callback of rest login");
};

exports.handle_request = handle_request;