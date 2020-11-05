var con = require('./config')
var mysql = require('mysql');

exports.addEvent = (req,res) => {
  console.log(req.body)

  kafka.make_request('rest_signup',req.body, function(err,results){
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
  // let q1 = "INSERT INTO `yelp`.`event_details` SET "+mysql.escape(req.body);

  // con.query(q1, (err, results) => {
  //   if(err){
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }
  //   console.log(results)
  //   res.status(200,{
  //     'Content-Type' : 'application/json'
  //   });
  //   res.end("Event Added")
  // });
}

exports.registerForEvent = (req,res) => {
  console.log(req.body)

  let q2 = "SELECT * from `yelp`.`event_registration` WHERE user_id = "+mysql.escape(req.body.user_id)+" AND event_id = "+mysql.escape(req.body.event_id);

  con.query(q2, (err2, results2) => {
    if(err2){
      res.status(403,{
        'Content-Type' : 'text/plain'
      });
      res.end("Some unknown error occured")
    }
    
    if(results2.length>0){
      res.status(403,{
        'Content-Type' : 'text/plain'
      });
      res.end("Already registered")
    }
    else{
      let q1 = "INSERT INTO `yelp`.`event_registration` SET "+mysql.escape(req.body);
      con.query(q1, (err,results) => {
        if(err){
          res.status(400,{
            'Content-Type' : 'text/value'
          });
          res.end("Error occured")
        }
        res.status(200,{
          'Content-Type' : 'application/json'
        });
        res.end("Registered")
      });
    }    
  })  
}