var {cart} = require('../Models/CartModel');
var {rest_details} = require('../Models/RestDetails');
var {dish_details} = require('../Models/DishDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch cart data kafka backend");
  console.log(msg);
  
  //main logic
  var ans = [];
  var count=0;

  cart.find({user_id:msg.user_id}, {__v:0} , function(err, result){
      console.log("I got invoked")
      console.log(result)
      if(err){
        console.log("Error in fetching cart")
        callback(null,{code:500,message:"Some Error Occured in fetching cart"})
      }
      else if(result.length>0){
        rest_details.find({_id:result[0].rest_id}, {rest_name:1, takeout:1, delivery:1, dineout:1}, function(err, results2){
          if(err){
            console.log("Error in fetching rest name", err)
            callback(null,{code:500,message:"Some Error Occured in fetching rest name"})
          }
          else{
            console.log(results2)

            for(var i in result){
              temp = {}
              temp = {...temp, rest_name:results2[0].rest_name, takeout:results2[0].takeout, delivery:results2[0].delivery, dineout:results2[0].dineout}
              dish_details.findOne({_id:result[i].dish_id}, {dish_name:1, dish_price:1}, function(err3, results3){
                if(err3){
                  console.log("Error occured during fetching dish name", err3)
                  callback(null,{code:500,message:"Some Error Occured in fetching dish name"})
                }
                else{
                  console.log(results3)
                  temp = {...temp, user_id:msg.user_id, cart_id:result[i]._id, dish_price:results3.dish_price, dish_name:results3.dish_name, dish_id:result[i].dish_id, dish_path:result[i].dish_path, rest_id:result[0].rest_id, quantity:result[i].count}
                  ans.push(temp)
                  count++;
                  if(count == result.length){
                    console.log("Ans = ")
                    console.log(ans)
                    callback(null,{code:200,message:ans})
                  }
                }
              })
            }            
          }
        })
      }
      else{
        console.log("User doesn't exist")
        callback(null, {code:204,message:"User does not exist"})
      }
    })

  //main logic ends
  console.log("after callback of user login");
};

exports.handle_request = handle_request;