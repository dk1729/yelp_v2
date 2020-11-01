var con = require('./config')
var bcrypt = require('bcrypt');
var mysql = require('mysql');
var kafka = require('../kafka/client');

exports.userLogin =  (req,res) => {  
  console.log("In user login")
  console.log(req.body)

  kafka.make_request('user_login',req.body, function(err,results){
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

  // var sql = "SELECT * FROM yelp.user_register WHERE email = " + mysql.escape(email);
  // var b = {}
  
  // con.query(sql, function (err, results) {
  //   if (err) {
  //     res.writeHead(403, {
  //       'Content-Type': 'text/plain'
  //     });
  //     res.end("No user by this email id");
  // } else {        
  //   console.log("SO : "+results[0])
  //     if(results.length > 0){
  //       console.log("Going inside : "+results[0])
  //       bcrypt.compare(password, results[0].password, function (err, isMatch) {
  //           if (isMatch && !err) {
  //               res.cookie('cookie','user',{maxAge: 900000, httpOnly: false, path : '/'});
  //               req.session.userid = results[0].id;
  //               console.log(req.session)
  //               b.email = results[0].email;
  //               b.id = results[0].id;
  //               res.status(200, {
  //                   'Content-Type': 'application/json'
  //               });
  //               res.send(b);
  //           } else {
  //               console.log("Fuck 2")     
  //               res.writeHead(403, {
  //                   'Content-Type': 'application/json'
  //               });
  //               res.end("Credentials don't match");
  //           }
  //       }, function (err) {
  //           if (err) {
  //               console.log(err)
  //           }
  //       })
  //     }
  //     else {
  //       res.writeHead(205, {
  //         'Content-Type': 'application/json'
  //       });
  //       res.end("User does not exist");
  //     }
  //   }
  // })
  
}

exports.restLogin = (req,res) => {
  
  var email = req.body.email;
  var password = req.body.password;
  console.log("REST LOGINNNN, with email = "+email+" password = "+password)

  var sql = "SELECT * FROM yelp.rest_register WHERE email = " + mysql.escape(email);
  var b = {}

  con.query(sql, function (err, results) {
    if (err) {
      console.log("No user")
      callback(err, " User does not exist ... ")
  } else {
    console.log("Results came back : "+JSON.stringify(results[0]))
      if(results.length > 0){
        bcrypt.compare(password, results[0].password, function (err, isMatch) {
            if (isMatch && !err) {
                console.log("It matched")
                res.cookie('cookie','rest',{maxAge: 900000, httpOnly: false, path : '/'});                  
                console.log(req.session)
                b.email = results[0].email;
                b.rest_id = results[0].rest_id;
                res.status(202, {
                    'Content-Type': 'application/json'
                });
                res.send(b);
            } else {
                console.log("It didnt matched")
                res.writeHead(401, {
                    'Content-Type': 'application/json'
                });
                res.end("Credentials don't match");
            }
        }, function (err) {
            if (err) {
                console.log(err)
            }
        })
      }
      else {
        res.writeHead(205, {
          'Content-Type': 'application/json'
        });
        res.end("Restaurant does not exist");
      }
    }
  })
}