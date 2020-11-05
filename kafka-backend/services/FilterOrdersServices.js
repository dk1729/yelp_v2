var {order_details} = require('../Models/OrderModel');
var {user_details} = require('../Models/UserDetails');
var {rest_details} = require('../Models/RestDetails');
var {dish_details} = require('../Models/DishDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch order data kafka backend");
  console.log(msg);
  
  //main logic

  var search_criteria_1;

  if(msg.type === 'user'){
    search_criteria_1 = {user_id:msg.id}
  }
  else if(msg.type === 'rest'){
    search_criteria_1 = {rest_id:msg.id}
  }
  else{
    callback(null,{code:500, message:"Invalid type"})
  }

  order_details.find({...search_criteria_1, status:{$in:msg.statuses}}, function(err, results){
    console.log("Trying to find data")
    console.log(results)
    if(err){
      console.log("Errrr", err)
      callback(null,{code:500, message:"Server error"})
    }
    else{
      let count = 0;
      let ans = [];
      for(let j in results){
        let dishes = []
        let temp = {status:results[j].status, order_id:results[j]._id, mode:results[j].mode, total:results[j].total}

        if(msg.type === 'user'){
          rest_details.findOne({_id:results[j].rest_id}, {rest_name:1}, function(err2, results2){
            temp = {...temp, rest_name:results2.rest_name}
          })
        }
        else{
          user_details.findOne({_id:results[j].user_id}, {first_name:1, ilove:1, last_name:1, city:1, country:1, state:1}, function(err3, results3){
            temp = {...temp, user_name:results3.first_name+" "+ results3.last_name, city:results3.city, country:results3.country, state:results3.state, ilove:results3.ilove}
          })
        }
                        
        for(let k in results[j].dishes){
          dish_details.findOne({_id:results[j].dishes[k].dish_id}, {dish_name:1}, function(err4, results4){
            if(err4){
              callback(null,{code:500, message:"Some error occured"})
            }
            console.log(results4)
            count++;
            dishes.push(results[j].dishes[k].quantity+" x "+results4.dish_name)

            if(k == results[j].dishes.length-1){
              temp = {...temp, dishes:dishes}
              ans.push(temp)
            }
            if(count === results.length*results[j].dishes.length){
              console.log("Ans = ")
              console.log(ans)
              callback(null, {code:200, message:ans})
            }
          })
        }
      }
    }
  })

  //main logic ends
  console.log("after callback of user login");
};

exports.handle_request = handle_request;