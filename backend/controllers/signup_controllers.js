var con = require('./config')
var bcrypt = require('bcrypt');
var mysql = require('mysql');

exports.usersignup =  (req,res) => {
  console.log("SIGNING UPPP");    
  let q1 = "Select * from `yelp`.`user_register` where email="+mysql.escape(req.body.email);  
  con.query(q1, function (err, result) {
    if (err) {
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    else if(result.length!=0){
      res.status(403,{
        'Content-Type' : 'text/plain'
      });
      res.end("Email already exists");
    }
    else{
      let today = new Date();
      let hashedPassword = bcrypt.hashSync(req.body.password,10);
      let user = {
        'first_name':req.body.first_name,
        'last_name':req.body.last_name,
        'email':req.body.email, 
        'password':hashedPassword, 
        'zip':req.body.zip, 
        'birthdate':req.body.birthdate,          
      };

      let sql = "INSERT INTO `yelp`.`user_register` SET"+mysql.escape(user);
      con.query(sql, (err1, results1) => {
        if(err1){
          res.status(403,{
            'Content-Type' : 'text/plain'
          });
          res.end("Unknown error occured. Please refresh and try again");
        }
        console.log(results1)
        let user_details = {
          'first_name':req.body.first_name,
          'last_name': req.body.last_name,
          'id':results1.insertId,
          'email':req.body.email,
          'yelping_since': today.getMonth()+"/"+today.getFullYear()
        };
        let sql2 = "INSERT INTO `yelp`.`user_details` SET "+mysql.escape(user_details);
        con.query(sql2, (err2,results2) => {
          if(err2){
            res.status(403,{
              'Content-Type' : 'text/plain'
            });
            res.end("Unknown error occured. Please refresh and try again");
          }
          res.status(200,{
            'Content-Type' : 'application/json'
          });
          res.end();
        });
      })        
    }
  });  
}

exports.restSignup = (req,res) => {
  console.log("SIGNING UPPP");
  let q1 = "Select * from `yelp`.`rest_register` where email="+mysql.escape(req.body.email);
  con.query(q1, function (err, result) {
    if (err) {
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    else if(result.length!=0){
      res.status(400,{
        'Content-Type' : 'application/json'
      });
      res.end("Email already exists");
    }
    else{
      let hashedPassword = bcrypt.hashSync(req.body.password,10);
      let user = {
        'rest_name':req.body.rest_name,
        'email':req.body.email, 
        'password':hashedPassword, 
        'zip':req.body.zip, 
        'location':req.body.location
      };

      const exec = async () => {
        console.log("USer = ",user)
        let sql = "INSERT INTO `yelp`.`rest_register` SET"+mysql.escape(user);
        const temp = await con.query(sql);          
        console.log("1st response = "+temp);
      }                
      exec().then(() => {
        const exec2 = async () => {
          let sql2 = "INSERT INTO `yelp`.`rest_details` (`rest_name`, `zip`, `location`) VALUES ("+mysql.escape(req.body.rest_name)+", "+mysql.escape(req.body.zip)+", "+mysql.escape(req.body.location)+")";
          const temp2 = await con.query(sql2);
          res.status(202,{
            'Content-Type' : 'application/json'
          });
          res.end();
        }          
        exec2();
      });
    }
  });
  
}