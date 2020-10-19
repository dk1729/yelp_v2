var con = require('./config')
var mysql = require('mysql');

exports.updateUser = (req,res) => {
    
  let q1 = "UPDATE `yelp`.`user_details` SET "+mysql.escape(req.body)+" WHERE (`id` = "+mysql.escape(req.body.id)+")";  
    
  con.query(q1, function (err, result) {
    if (err) {
      res.status(403,{
        'Content-Type' : 'text/plain'
      });
      res.end("Some Error occured")
    }
    else if(result.length!=0){
      console.log("DONE")
      res.status(200,{
        'Content-Type' : 'text/plain'
      });
      res.end("UPDATED")
    }
    else{
      res.status(403,{
        'Content-Type' : 'text/plain'
      });
      res.end("UPDATED")
    }
  });
}

exports.updateRest = (req,res) => {    
  let q1 = "UPDATE `yelp`.`rest_details` SET "+mysql.escape(req.body)+" WHERE (`rest_id` = "+mysql.escape(req.body.rest_id)+")";
  
  con.query(q1, function (err, result) {
    if (err) {
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    else if(result.length!=0){
      console.log("DONE")
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end("UPDATED")
    }
    else{
      res.status(403,{
        'Content-Type' : 'application/json'
      });
      res.end("UPDATED")
    }
    });  
}