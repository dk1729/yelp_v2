var {reviews} = require('../Models/ReviewModel');
var {user_details} = require('../Models/UserDetails');
var {rest_details} = require('../Models/RestDetails');

function handle_request(msg, callback){   
  console.log("Inside fetch reviews kafka backend");
  console.log(msg);
  
  //main logic
  let searchCriteria;

  if(msg.type === "user"){
    searchCriteria = {user_id:msg.id}
  }
  else if(msg.type === "rest"){
    searchCriteria = {rest_id:msg.id}
  }
  else{
    callbacl(null, {code:500, message:"Invalid type"})
  }

  console.log("Search according to ",searchCriteria)
  var ans = []
  reviews.find(searchCriteria, {__v:0} , function(err, result){
    console.log("I got invoked")
    console.log(result)
    if(err){
      console.log("Error in fetching reviews")
      callback(null,{code:500,message:"Some Error Occured in fetching reviews"})
    }
    else if(result != null){
      let sum_of_ratings = 0;
      let count=0;
      for(let i in result){
        console.log(result[i])
        sum_of_ratings+=result[i].rating;
        if(msg.type === "user"){
          rest_details.findOne({_id:result[i].rest_id}, {rest_name:1}, function(err, result1){
            if(err){
              console.log("Error in fetching rest details")
              callback(null,{code:500,message:"Some Error Occured in fetching rest details"})
            }
            else{
              count++;
              ans.push({rest_name:result1.rest_name, ...result[i]._doc})
              if(count === result.length){
                let avg = Math.round(sum_of_ratings/result.length);
                callback(null,{code:200,message:{avg, review_data:ans}})
              }
            }
          })
        }
        else{
          user_details.findOne({_id:result[i].user_id}, {first_name:1, last_name:1}, function(err, result2){
            if(err){
              console.log("Error in fetching user details")
              callback(null,{code:500,message:"Some Error Occured in fetching user details"})
            }
            else{
              count++;
              ans.push({user_name:result2.first_name+" "+result2.last_name, ...result[i]._doc})
              if(count === result.length){
                let avg = Math.round(sum_of_ratings/result.length);
                callback(null,{code:200,message:{avg, review_data:ans}})
              }
            }
          })
        }
      }
    }
    else{
      console.log("Search criteria doesn't exist doesn't exist")
      callback(null, {code:204,message:"Search Criteria does not exist"})
    }
  })

  //main logic ends
  console.log("after callback of fetch reviews");
};

exports.handle_request = handle_request;