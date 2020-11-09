var {messages} = require('../Models/MessageModel');

function handle_request(msg, callback){   
    console.log("Inside message kafka backend");
    console.log(msg);
        
    //main logic
    let new_message = messages(msg);

    new_message.save().then(response => {
      callback(null, {code:200, message:"OK"})
    })
    //main logic ends
    console.log("after callback of message");
};

exports.handle_request = handle_request;