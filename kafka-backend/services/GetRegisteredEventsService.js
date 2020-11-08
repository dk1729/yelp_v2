var {event_details} = require('../Models/EventModel');
var {event_register} = require('../Models/EventRegisterModel');

function handle_request(msg, callback){   
  console.log("Inside fetch registered events user pers kafka backend");
  console.log(msg);
  
  //main logic
  var ans = []
  event_register.find({user_id:msg.id}, {event_id:1}, function(err, result){
    console.log("I got the result, señor")
    if(err){
      console.log("Err", err)
      callback(null, {code:500, message:"Some error occured"})
    }
    else{
      console.log(result)
      let main_count=0;
      for(let i in result){
        event_details.findOne({_id:result[i].event_id}, function(err, results2){
          if(err){
            console.log("Error in fetching event details")
            callback(null, {code:500, message:"Some error occured"})
          }
          else{
            main_count++;
            ans.push(results2)
            if(main_count === result.length){
              callback(null, {code:200, message:ans})
            }
          }
        })
      }
    }
  })
  //main logic ends
  console.log("after callback of fetch registered events");
};

exports.handle_request = handle_request;