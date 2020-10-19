var con = require('./config')
var mysql = require('mysql');

exports.addDish = (req,res) => {
  
  console.log("Adding dish with data = "+JSON.stringify(req.body))
  let q1 = "INSERT INTO `yelp`.`dish_details` SET"+mysql.escape(req.body);
  
  con.query(q1, function (err, result) {
    if (err) {
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    else if(result.length!=0){
      console.log("DONE")
      console.log(result)
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(result.insertId))
    }
    else{
      res.status(403,{
        'Content-Type' : 'application/json'
      });
      res.end("Not added")
    }
    });
}

exports.updateDish = (req,res) => {      
  // console.log("Updating dish with data = "+JSON.stringify(req.body))
  let q1 = "UPDATE `yelp`.`dish_details` SET "+mysql.escape(req.body)+" WHERE (`dish_id` = "+mysql.escape(req.body.dish_id)+")";
  
  con.query(q1, function (err, result) {
    if (err) {
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }

    else if(result.length!=0){
      // console.log("DONE")
      res.status(202,{
        'Content-Type' : 'application/json'
      });
      res.end("Added")
    }
    else{
      res.status(403,{
        'Content-Type' : 'application/json'
      });
      res.end("Not added")
    }
    });  
}