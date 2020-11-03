var {dish_details} = require('../Models/DishDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch dish data kafka backend");
  console.log(msg);
  
  //main logic

  dish_details.find({rest_id:msg.rest_id}, {__v:0} , function(err, result){
      console.log("I got invoked")
      console.log(result)
      if(err){
        console.log("Error in fetching dish data")
        callback(null,{code:500,message:"Some Error Occured in fetching dish data"})
      }
      else if(result != null){
        // var dish = {
        //   dish_id: result._id, 
        //   dish_name: result.dish_name,
        //   ingredients: result.ingredients,
        //   dish_price: result.dish_price,
        //   description: result.description,
        //   dish_type: result.dish_type,
        //   rest_id: result.rest_id
        // }
        
        callback(null,{code:200,message:result})
      }
      else{
        console.log("Rest doesn't exist")
        callback(null, {code:204,message:"Restaurant does not exist"})
      }
    })

  //main logic ends
  console.log("after callback of get dish data");
};

exports.handle_request = handle_request;