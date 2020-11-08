var {event_details} = require('../Models/EventModel');

function handle_request(msg, callback){   
    console.log("Inside add event kafka backend");
    console.log(msg);
        
    //main logic
    var new_event = event_details(msg)
    new_event.save().then(result => {
      console.log("Event added", result);
      callback(null, {code:200,message:"Event added"})
    }) 
    //main logic ends
    console.log("after callback of add event");
};

exports.handle_request = handle_request;