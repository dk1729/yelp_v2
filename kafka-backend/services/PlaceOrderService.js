var {order_details} = require('../Models/OrderModel');
var {cart} = require('../Models/CartModel');

function handle_request(msg, callback){   
  console.log("Inside place order kafka backend");
  console.log(msg);
  
  let t1_data = {
    "rest_id":msg.orders[0].rest_id,
    "status":"Placed",
    "mode":msg.mode,
    "total":msg.total,
    "user_id":msg.orders[0].user_id
  };

  let dishes = []

  for(let i in msg.orders){    
    dishes.push({dish_id:msg.orders[i].dish_id, quantity:msg.orders[i].quantity})
  }

  console.log("Combined Data = ")
  console.log({...t1_data, dishes})

  var new_order = order_details({...t1_data, dishes})

  new_order.save().then(result => {
    console.log(result)
    cart.remove({_id:msg.orders[0].cart_id}, function(err, result2){
      if(err){
        console.log(err)
        callback(null, {code:500,message:"Failed to delete cart"})
      }
      console.log(result2)
      callback(null, {code:200,message:"Order placed and cart emptied"})
    })
  })
  //main logic

  // updates = {}
  // for (var key in msg) {
  //   if (msg.hasOwnProperty(key)) {
  //     console.log(key + " -> " + msg[key]);
  //     if(key!=="dish_id"){
  //       console.log("Going in")
  //       updates[key] = msg[key]
  //     }
  //   }
  // }

  // console.log({...updates})
  // dish_details.updateOne({_id:msg.dish_id}, {$set:{...updates}}, function(err, result){
  //   console.log("I got invoked")
  //   console.log(result);
  //   if(err){
  //     console.log("Error in update")
  //     console.log(err)
  //     callback(null,{code:500,message:"Some Error Occured in updating dish"})
  //   }
  //   else if(result != null){
  //     console.log("Let's update dish")
  //     callback(null,{code:200,message:"Dish Updated"})
  //   }
  //   else{
  //     console.log("Dish doesn't exist")
  //     callback(null, {code:204,message:"Dish does not exist"})
  //   }
  // })
  //main logic ends
  console.log("after callback of update dish");
};

exports.handle_request = handle_request;