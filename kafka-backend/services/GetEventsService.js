var {event_details} = require('../Models/EventModel');
var {rest_details} = require('../Models/RestDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch events user pers kafka backend");
  console.log(msg);
  
  //main logic
  var ans = []
  event_details.find({}, null, {sort:{event_date:1}}, function(err, result){
    console.log("I got the result, señor")
    if(err){
      console.log("Err", err)
      callback(null, {code:500, message:"Some error occured"})
    }
    else{
      console.log(result)
      let main_count=0;
      for(let i in result){
        rest_details.findOne({_id:result[i].rest_id}, {rest_name:1}, function(err, results2){
          if(err){
            console.log("Error in fetching rest name")
            callback(null, {code:500, message:"Some error occured"})
          }
          else{
            main_count++;
            ans.push({...result[i]._doc, rest_name:results2.rest_name})
            if(main_count === result.length){
              callback(null, {code:200, message:ans})
            }
          }
        })
      }
    }
  })
  //main logic ends
  console.log("after callback of fetch user pers events");
};

exports.handle_request = handle_request;