var {event_register} = require('../Models/EventRegisterModel');

function handle_request(msg, callback){   
    console.log("Inside register for event kafka backend");
    console.log(msg);    
    //main logic
    event_register.findOne(msg, function(err, result){
        if(err){
            console.log("Some error occured")
            callback(null, {code:500, message:"Some error occured"})
        }
        else if(result !== null ){
            console.log("Result")
            console.log(result)
            callback(null, {code:204, message:"Already registered"})
        }
        else{
            let new_user = event_register(msg)
            new_user.save().then(result=>{
                console.log("Registered", result);
                callback(null, {code:200,message:"Registered"})
            })
        }
    })
    //main logic ends
    console.log("after callback of register for event");
};

exports.handle_request = handle_request;