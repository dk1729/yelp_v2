var {messages} = require('../Models/MessageModel')

function handle_request(msg, callback){   
  console.log("Inside fetch chats kafka backend");
  console.log(msg);
  
  //main logic
  messages.find({chat_id:msg.chat_id}, function(err, result){
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
  console.log("after callback of fetch chats");
};

exports.handle_request = handle_request;