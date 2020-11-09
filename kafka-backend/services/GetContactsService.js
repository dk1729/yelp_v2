var {order_details} = require('../Models/OrderModel');
var {user_details} = require('../Models/UserDetails');
var {rest_details} = require('../Models/RestDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch contact data kafka backend");
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

  order_details.find(search_criteria_1, function(err, results){
    console.log("Trying to find data")
    console.log(results)
    if(err){
      callback(null,{code:500, message:"Server error"})
    }
    else{
      let count = 0;
      let ans = [];
      let exists = false;
      for(let j in results){
        let temp = {}        
        console.log("pdh ",ans)
        if(msg.type === 'user'){
          for(let i in ans){
            if(ans[i].id === results[j].rest_id){
              count++;
              exists = true;
              break;
            }
            exists = false;
          }

          if(exists){
            continue
          }

          rest_details.findOne({_id:results[j].rest_id}, {rest_name:1}, function(err2, results2){
            if(err2){
              throw err2;
            }
            count++;            
            temp = {...temp, name:results2.rest_name, id:results[j].rest_id}        

            if(count === results.length){
              console.log("Ans = ")
              console.log(ans)
              callback(null, {code:200, message:ans})
            }
          })
        }
        else{
          for(let i in ans){
            console.log("Condition = "+ans[i].id === results[j].user_id)
            if(ans[i].id === results[j].user_id){
              count++;
              exists = true;
              break;
            }
            exists = false;
          }

          if(exists){
            continue
          }
          console.log("UI = "+results[j].user_id)
          user_details.findOne({_id:results[j].user_id}, {first_name:1, last_name:1}, function(err3, results3){
            console.log("Okkkkkkk")
            if(err3){
              throw err3;
            }

            count++;
            temp = {...temp, name:results3.first_name+" "+ results3.last_name, id:results[j].user_id}
            
            if(count === results.length){
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
  console.log("after callback of fetch contacts");
};

exports.handle_request = handle_request;