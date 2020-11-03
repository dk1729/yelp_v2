var {dish_details} = require('../Models/DishDetails');

function handle_request(msg, callback){   
  console.log("Inside update dish kafka backend");
  console.log(msg);
  
  //main logic

  updates = {}
  for (var key in msg) {
    if (msg.hasOwnProperty(key)) {
      console.log(key + " -> " + msg[key]);
      if(key!=="dish_id"){
        console.log("Going in")
        updates[key] = msg[key]
      }
    }
  }

  console.log({...updates})
  dish_details.updateOne({_id:msg.dish_id}, {$set:{...updates}}, function(err, result){
    console.log("I got invoked")
    console.log(result);
    if(err){
      console.log("Error in update")
      console.log(err)
      callback(null,{code:500,message:"Some Error Occured in updating dish"})
    }
    else if(result != null){
      console.log("Let's update dish")
      callback(null,{code:200,message:"Dish Updated"})
    }
    else{
      console.log("Dish doesn't exist")
      callback(null, {code:204,message:"Dish does not exist"})
    }
  })
  //main logic ends
  console.log("after callback of update dish");
};

exports.handle_request = handle_request;