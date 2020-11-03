var con = require('./config')
var mysql = require('mysql');
var kafka = require('../kafka/client')

exports.addDish = (req,res) => {
  
  console.log("Adding dish with data = "+JSON.stringify(req.body))

  kafka.make_request('add_dish',req.body, function(err,results){
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
      res.end(results.message);
    }
  });

  // let q1 = "INSERT INTO `yelp`.`dish_details` SET"+mysql.escape(req.body);
  
  // con.query(q1, function (err, result) {
  //   if (err) {
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }
  //   else if(result.length!=0){
  //     console.log("DONE")
  //     console.log(result)
  //     res.status(202,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end(JSON.stringify(result.insertId))
  //   }
  //   else{
  //     res.status(403,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end("Not added")
  //   }
  //   });
}

exports.updateDish = (req,res) => {

  kafka.make_request('update_dish',req.body, function(err,results){
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
  // console.log("Updating dish with data = "+JSON.stringify(req.body))
  // let q1 = "UPDATE `yelp`.`dish_details` SET "+mysql.escape(req.body)+" WHERE (`dish_id` = "+mysql.escape(req.body.dish_id)+")";
  
  // con.query(q1, function (err, result) {
  //   if (err) {
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }

  //   else if(result.length!=0){
  //     // console.log("DONE")
  //     res.status(202,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end("Added")
  //   }
  //   else{
  //     res.status(403,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end("Not added")
  //   }
  //   });
}