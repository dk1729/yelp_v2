var kafka = require('../kafka/client');

exports.usersignup =  (req,res) => {
  console.log("SIGNING UPPP");

  kafka.make_request('user_signup',req.body, function(err,results){
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
}

exports.restSignup = (req,res) => {
  console.log("REST SIGNING UPPP");
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
  // let q1 = "Select * from `yelp`.`rest_register` where email="+mysql.escape(req.body.email);
  // con.query(q1, function (err, result) {
  //   if (err) {
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }
  //   else if(result.length!=0){
  //     res.status(400,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end("Email already exists");
  //   }
  //   else{
  //     let hashedPassword = bcrypt.hashSync(req.body.password,10);
  //     let user = {
  //       'rest_name':req.body.rest_name,
  //       'email':req.body.email, 
  //       'password':hashedPassword, 
  //       'zip':req.body.zip, 
  //       'location':req.body.location
  //     };

  //     const exec = async () => {
  //       console.log("USer = ",user)
  //       let sql = "INSERT INTO `yelp`.`rest_register` SET"+mysql.escape(user);
  //       const temp = await con.query(sql);          
  //       console.log("1st response = "+temp);
  //     }                
  //     exec().then(() => {
  //       const exec2 = async () => {
  //         let sql2 = "INSERT INTO `yelp`.`rest_details` (`rest_name`, `zip`, `location`) VALUES ("+mysql.escape(req.body.rest_name)+", "+mysql.escape(req.body.zip)+", "+mysql.escape(req.body.location)+")";
  //         const temp2 = await con.query(sql2);
  //         res.status(202,{
  //           'Content-Type' : 'application/json'
  //         });
  //         res.end();
  //       }          
  //       exec2();
  //     });
  //   }
  // });
  
}