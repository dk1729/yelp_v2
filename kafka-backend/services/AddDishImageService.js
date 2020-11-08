var {dish_details} = require('../Models/DishDetails');

function handle_request(msg, callback){   
  console.log("Inside add user photo kafka backend");
  //main logic
  dish_details.updateOne({_id:msg.dish_id}, {$set:{dish_path:msg.path}}, function(err, result){
    console.log("I got invoked")
    if(err){
      console.log("Error in update")
      console.log(err)
      callback(null,{code:500,message:"Some Error Occured in Adding dish photo"})
    }
    else if(result != null){
      console.log("Let's update")
      callback(null,{code:200,message:"Updated"})
    }
    else{
      console.log("Dish doesn't exist")
      callback(null, {code:204,message:"Dish does not exist"})
    }
  })
  //main logic ends
  console.log("after callback of add dish photo");
};

exports.handle_request = handle_request;