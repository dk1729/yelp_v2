var con = require('./config')
var mysql = require('mysql');

exports.submitReview = (req,res) => {
  console.log("Here to review : "+JSON.stringify(req.body))
  let q1 = "INSERT INTO `yelp`.`reviews` SET "+mysql.escape(req.body)
  con.query(q1, (err, results) => {
    if(err){
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    console.log("Done")
  })
}