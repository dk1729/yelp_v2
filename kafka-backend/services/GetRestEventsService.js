var {event_details} = require('../Models/EventModel');
var {event_register} = require('../Models/EventRegisterModel');
var {user_details} = require('../Models/UserDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch rest events kafka backend");
  console.log(msg);
  
  //main logic
  var answer = []
  event_details.find({rest_id:msg.rest_id}, {__v:0} , function(err, result){
      console.log("I got invoked")
      console.log(result)
      if(err){
        console.log("Error in signup")
        callback(null,{code:500,message:"Some Error Occured in Signup"})
      }
      else if(result != null ){
        var main_count=0;
        for(let i in result){
          event_register.find({event_id:result[i]._id}, {__v:0} , function(err, result2){
            console.log("I got invoked 2")
            console.log(result2)
            if(err){
              console.log("Error in finding event")
              callback(null,{code:500,message:"Some Error Occured in finding event"})
            }
            else if(result2.length > 0){              
              let registeredUsers = []
              let secondary_count = 0;
              for(let j in result2){
                user_details.findOne({_id:result2[j].user_id}, {password:0, __v:0}, function(err3, result3){
                  console.log(result3)
                  console.log("Registered for event")
                  if(err3){
                    console.log("Error occured in fetching users")
                    callback(null,{code:500,message:"Some Error Occured in fetching users"})
                  }
                  else{
                    secondary_count++;
                    registeredUsers.push(result3)
                    if(secondary_count === result2.length){
                      main_count++;
                      answer.push({...result[i]._doc, registeredUsers})
                    }
                    if(main_count === result.length){
                      callback(null,{code:200,message:answer})
                    }
                  }
                })
              }
            }
            else{
              main_count++;
              console.log("No registered users")
              answer.push({...result[i]._doc, registeredUsers:[]})
              if(main_count === result.length){
                callback(null,{code:200,message:answer})
              }
              // callback(null, {code:204,message:"User does not exist"})
            }
          })    
        }
        // callback(null,{code:200,message:result})
      }
      else{
        console.log("User doesn't exist")
        callback(null, {code:204,message:"User does not exist"})        
      }
    })

  //main logic ends
  console.log("after callback of fetch rest events");
};

exports.handle_request = handle_request;