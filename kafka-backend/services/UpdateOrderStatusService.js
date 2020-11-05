var {order_details} = require('../Models/OrderModel');

function handle_request(msg, callback){   
  console.log("Inside update order status kafka backend");
  console.log(msg);
  
  //main logic

  order_details.updateOne({_id:msg.order_id}, {$set:{status:msg.status}}, function(err, result){
    console.log("I got invoked")
    console.log(result);
    if(err){
      console.log("Error in update")
      console.log(err)
      callback(null,{code:500,message:"Some Error Occured in Updating status"})
    }
    else if(result != null){
      console.log("Let's update status")
      callback(null,{code:200,message:"Status Updated"})
    }
    else{
      console.log("Order doesn't exist")
      callback(null, {code:204,message:"Order does not exist"})
    }
  })

  //main logic ends
  console.log("after callback of update order status");
};

exports.handle_request = handle_request;