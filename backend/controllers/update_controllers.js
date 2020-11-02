var con = require('./config')
var mysql = require('mysql');
var kafka = require('../kafka/client');

exports.updateUser = (req,res) => {
    
  console.log("Please update this");
  console.log(req.body);

  kafka.make_request('update_user_data',req.body, function(err,results){
    console.log('in result');
    console.log(JSON.stringify(results));
    console.log("Code : ",results.code)
    console.log("Message : ",results.message)
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
      res.status(results.code,{
        'Content-Type' : 'application/json'
      });
      console.log("Type = "+typeof(results.message))
      if(typeof(results.message) === "object"){
        console.log("Stringify")
        res.end(JSON.stringify(results.message));
      }
      else{
        console.log("No strngify")
        res.end(results.message);
      }      
    }
  });
  // let q1 = "UPDATE `yelp`.`user_details` SET "+mysql.escape(req.body)+" WHERE (`id` = "+mysql.escape(req.body.id)+")";  
    
  // con.query(q1, function (err, result) {
  //   if (err) {
  //     res.status(403,{
  //       'Content-Type' : 'text/plain'
  //     });
  //     res.end("Some Error occured")
  //   }
  //   else if(result.length!=0){
  //     console.log("DONE")
  //     res.status(200,{
  //       'Content-Type' : 'text/plain'
  //     });
  //     res.end("UPDATED")
  //   }
  //   else{
  //     res.status(403,{
  //       'Content-Type' : 'text/plain'
  //     });
  //     res.end("UPDATED")
  //   }
  // });
}

exports.updateRest = (req,res) => {
  console.log("Trying to update rest...")
  console.log(req.body)
  kafka.make_request('update_rest_data',req.body, function(err,results){
    console.log('in result');
    console.log(JSON.stringify(results));
    console.log("Code : ",results.code)
    console.log("Message : ",results.message)
    if (err){
        console.log("Inside err");
        res.json({
            status:"error",
            msg:"System Error, Try Again."
        })
    }else{
      res.status(results.code,{
        'Content-Type' : 'application/json'
      });
      console.log("Type = "+typeof(results.message))
      if(typeof(results.message) === "object"){
        console.log("Stringify")
        res.end(JSON.stringify(results.message));
      }
      else{
        console.log("No strngify")
        res.end(results.message);
      }      
    }
  });
  // let q1 = "UPDATE `yelp`.`rest_details` SET "+mysql.escape(req.body)+" WHERE (`rest_id` = "+mysql.escape(req.body.rest_id)+")";
  
  // con.query(q1, function (err, result) {
  //   if (err) {
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }
  //   else if(result.length!=0){
  //     console.log("DONE")
  //     res.status(202,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end("UPDATED")
  //   }
  //   else{
  //     res.status(403,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end("UPDATED")
  //   }
  //   });  
}