var con = require('./config');
var mysql = require('mysql');
var kafka = require('../kafka/client');

exports.submitReview = (req,res) => {
  console.log("Here to review : "+JSON.stringify(req.body))

  kafka.make_request('submit_review',req.body, function(err,results){
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
  // let q1 = "INSERT INTO `yelp`.`reviews` SET "+mysql.escape(req.body)
  // con.query(q1, (err, results) => {
  //   if(err){
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }
  //   console.log("Done")
  // })
}