var {dish_details} = require('../Models/DishDetails');

function handle_request(msg, callback){   
  console.log("Inside add dish kafka backend");
  console.log(msg);
  
  //main logic
  var new_dish = dish_details(msg)
  new_dish.save().then(result => {
    console.log("Dish added", result);
    callback(null, {code:200,message:result._id})
  }).catch(err => {
    console.log("Error occured, dish not added", err)
    callback(null, {code:500,message:"Some error occured, try again"})
  })
  //main logic ends
  console.log("after callback of add dish");
};

exports.handle_request = handle_request;