var mysql = require('mysql');
var con = require('./config');
var kafka = require('../kafka/client');

exports.getUserData = (req,res) => {
  console.log("Inside get...")
  console.log(req.params.id);
  kafka.make_request('get_user_data',req.params, function(err,results){
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
}

exports.getRestData = (req,res) => {
  console.log("Inside get for restaurant...")  
  console.log("Rest ID = "+req.params.rest_id)
  console.log(req.params.id);
  kafka.make_request('get_rest_data',req.params, function(err,results){
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
  // let q1 = "Select * from `yelp`.`rest_details` where rest_id="+mysql.escape(req.params.rest_id);  
  
  //   con.query(q1, function (err2, results) {      
  //     if(err2){
  //       console.log("Error occured: "+err2)
  //       res.status(400,{
  //         'Content-Type' : 'text/value'
  //       });
  //       res.end("Error occured")
  //     }
  //     console.log("Results = "+JSON.stringify(results[0]))
  //     res.status(202,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end(JSON.stringify(results[0]))
  //   }) 
}

exports.getDishes = (req,res) => {
  console.log(req.params.rest_id)
  console.log("Inside get dishes for restaurant...")
  
  kafka.make_request('get_dishes',req.params, function(err,results){
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
      
  // let q1 = "Select * from `yelp`.`dish_details` where rest_id="+mysql.escape(req.params.rest_id);
  
  //   con.query(q1, function (err2, results) {      
  //     if(err2){
  //       console.log("Error occured: "+err2)
  //       res.status(400,{
  //         'Content-Type' : 'text/value'
  //       });
  //       res.end("Error occured")
  //     }
  //     console.log("Results = "+JSON.stringify(results))
  //     res.status(202,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end(JSON.stringify(results))
  //   }) 
}

exports.getOrders = (req,res) => {
  console.log("Trying to get orders for restid: ")
  console.log(req.query)
  
  kafka.make_request('get_orders',req.query, function(err,results){
    console.log('in result');
    console.log(JSON.stringify(results));
    console.log("Code : ",results.code)
    console.log("Message : ",results.message)
    if(err){
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
  // let q1;
  // if(req.query.type === 'rest')
  //   q1 = "Select * from `yelp`.`order_register` where rest_id="+mysql.escape(req.query.id);
  // else if(req.query.type === 'user')
  //   q1 = "Select * from `yelp`.`order_register` where user_id="+mysql.escape(req.query.id);
  // answer = []
  // con.query(q1, function (err2, results) {
  //   if(err2){
  //     console.log("Error occured: "+err2)
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }

  //   for(let j in results){      
  //     let dishes = []
  //     let temp = {status:results[j].status, order_id:results[j].order_id, mode:results[j].mode, total:results[j].total}
  //     let q2 = "Select * from `yelp`.`order_details` where order_id="+mysql.escape(results[j].order_id);
  //     con.query(q2, (err2, results2) => {        
  //       //Query 4     
  //       let q4;
  //       if(req.query.type === 'rest'){
  //         q4 = "Select first_name, ilove, last_name,city, country, state  from `yelp`.`user_details` where id="+mysql.escape(results[j].user_id);
  //         con.query(q4, (err4, results4) => {
  //           temp = {...temp, user_name:results4[0].first_name+" "+ results4[0].last_name, city:results4[0].city, country:results4[0].country, state:results4[0].state, ilove:results4[0].ilove}
  //         })
  //       }          
  //       else if(req.query.type === `user`){
  //         q4 = "Select rest_name from `yelp`.`rest_details` where rest_id="+mysql.escape(results[j].rest_id);
  //         con.query(q4, (err4, results4) => {
  //           temp = {...temp, rest_name:results4[0].rest_name}
  //         })
  //       }
          
  //       //Query 3
  //       for(let i in results2){          
  //         console.log("R2: "+JSON.stringify(results2[i]))
  //         let q3 = "Select dish_name from `yelp`.`dish_details` where dish_id="+mysql.escape(results2[i].dish_id);          
  //         con.query(q3, (err3, results3) => {
  //           dishes.push(results2[i].quantity+" * "+results3[0].dish_name)
  //           if(i == results2.length-1){
  //             temp = {...temp, dishes:dishes}
  //             answer.push(temp)
  //             if(j == results.length - 1){
  //               console.log("Final Asnwer : "+JSON.stringify(answer));
  //               res.status(200,{
  //                 'Content-Type' : 'application/json'
  //               });
  //               res.end(JSON.stringify(answer))
  //             }
  //           }            
  //         })
  //       }
  //     })
  //   }
  // })
}

exports.getCart = (req,res) => {
  
  console.log("Inside get cart")

  kafka.make_request('get_cart',req.params, function(err,results){
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
  // answer = []
  // let q1 = "Select * from `yelp`.`cart` where user_id="+mysql.escape(req.params.user_id);

  // con.query(q1, function (err2, results) {
  //   if(err2){
  //     console.log("Error occured: "+err2)
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }
  //   if(results.length>0){
  //     let q2 = "Select rest_name,takeout, delivery, dineout from `yelp`.`rest_details` where rest_id="+mysql.escape(results[0].rest_id);
  //     con.query(q2, function (err3, results2) {
  //       if(err3){
  //         console.log("Error occured: "+err2)
  //         res.status(400,{
  //           'Content-Type' : 'text/value'
  //         });
  //         res.end("Error occured")
  //       }
  //       for(let i in results){
  //         temp = {}
  //         temp = {...temp, rest_name:results2[0].rest_name, takeout:results2[0].takeout, delivery:results2[0].delivery, dineout:results2[0].dineout}
  //         console.log(JSON.stringify(results[i].dish_id))
  //         let q2 = "Select dish_name,dish_price from `yelp`.`dish_details` where dish_id="+mysql.escape(results[i].dish_id);
  //         con.query(q2, function (err3, results2) {
  //           if(err3){
  //             console.log("Error occured: "+err2)
  //             res.status(400,{
  //               'Content-Type' : 'text/value'
  //             });
  //             res.end("Error occured")
  //           }        
  //           console.log("Quantity : "+JSON.stringify(results[0]))
  //           temp = {...temp, user_id:req.params.user_id, cart_id:results[i].cart_id, dish_price:results2[0].dish_price, dish_name:results2[0].dish_name, dish_id:results[i].dish_id, dish_path:results[i].dish_path, rest_id:results[0].rest_id, quantity:results[i].count}
  //           answer.push(temp)
  //           if(i == results.length-1){
  //             console.log("Length of answer = "+answer.length)
  //             res.status(202,{
  //               'Content-Type' : 'application/json'
  //             });
  //             res.end(JSON.stringify(answer))
  //           }
  //         })
  //       }
  //     })      
  //   }       
  //   else{
  //     res.status(202,{
  //       'Content-Type' : 'application/json'
  //     });
  //     res.end(JSON.stringify({}))
  //   }     
  // })
}

exports.getRestaurants = (req,res) => {
  kafka.make_request('get_restaurants', "Hola", function(err,results){
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
  // let q1 = "Select * from `yelp`.`rest_details`";
  // con.query(q1, function (err2, results) {      
  //   if(err2){
  //     console.log("Error occured: "+err2)
  //     res.status(400,{
  //       'Content-Type' : 'text/plain'
  //     });
  //     res.end("Error")
  //   }
  //   // console.log("Results = "+JSON.stringify(results))
  //   res.status(202,{
  //     'Content-Type' : 'application/json'
  //   });
  //   res.end(JSON.stringify(results))
  // }) 
}

exports.getRestCoords = (req,res) => {
  let q1 = "SELECT latitude, longitude, rest_name, rest_id from  `yelp`.`rest_details`"
  con.query(q1, function (err2, results) {
    if(err2){
      console.log("Error occured: "+err2)
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    console.log("Results = "+JSON.stringify(results))
    res.status(200,{
      'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(results))
  })
}

exports.getReviews = (req, res) => {
  console.log("Getting reviews : ")
  console.log(req.query)

  kafka.make_request('get_reviews', req.query, function(err,results){
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
  // let q1;

  // if(req.query.type==="rest"){
  //   q1 = "SELECT * from `yelp`.`reviews` where rest_id = "+mysql.escape(req.query.id);
  // }
  // else if(req.query.type==="user"){
  //   q1 = "SELECT * from `yelp`.`reviews` where user_id = "+mysql.escape(req.query.id);
  // }
  
  // let answer = []
  // con.query(q1, (err,results) => {
  //   if(err){
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }

  //   let sum_of_ratings = 0;

  //   for(let i in results){
  //     sum_of_ratings+=results[i].rating;

  //     let temp = {}
  //     console.log(results[i])
  //     let q2;
  //     if(req.query.type==="rest"){
  //       q2 = "SELECT first_name, last_name from `yelp`.`user_details` where id = "+mysql.escape(results[i].user_id);
  //     }
  //     else if(req.query.type==="user"){
  //       q2 = "SELECT rest_name from `yelp`.`rest_details` where rest_id = "+mysql.escape(results[i].rest_id);
  //     }
  //     console.log("QUERY = "+q2);
  //     con.query(q2, (err2, results2) => {
  //       console.log(results2);
  //       if(req.query.type==="rest"){
  //         answer.push({user_name:results2[0].first_name+" "+results2[0].last_name, ...results[i]}) 
  //       }
  //       else if(req.query.type==="user"){
  //         answer.push({rest_name:results2[0].rest_name, ...results[i]})
  //       }

  //       if(i == results.length - 1){
  //         res.status(200,{
  //           'Content-Type' : 'application/json'
  //         });
  //         let avg = Math.round(sum_of_ratings/results.length);
  //         res.end(JSON.stringify({avg, review_data:answer}))
  //       }
  //     })
  //   }

  //   console.log("Results: "+JSON.stringify(results));
    
  // });
}

exports.searchEvents = (req,res) => {
  let q1 = "SELECT * FROM `yelp`.`event_details` where event_name LIKE '%"+req.params.term+"%'";
  answer = []
  con.query(q1, (err,results) => {
    if(err){
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    console.log(results)
    for(let i in results){
      console.log("Ok "+JSON.stringify(results[i]))
      let q2 = "SELECT rest_name from `yelp`.`rest_details` where rest_id = "+mysql.escape(results[i].rest_id)      
      con.query(q2, (err2, results2) => {
        console.log("Trying")
        console.log({...results[i], rest_name:results2[0].rest_name})
        answer.push({...results[i], rest_name:results2[0].rest_name})

        if(i == results.length - 1 ){
          res.status(200,{
            'Content-Type' : 'application/json'
          });
          res.end(JSON.stringify(answer))
        }
      })      
    }    
  });
}

exports.getEvents = (req,res) => {
  console.log("Inside get events, user side")
  let q1 = "SELECT * FROM `yelp`.`event_details` ORDER BY event_date ASC";
  answer = []
  con.query(q1, (err,results) => {
    if(err){
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    for(let i in results){
      let q2 = "SELECT rest_name from `yelp`.`rest_details` where rest_id = "+mysql.escape(results[i].rest_id)      
      con.query(q2, (err2, results2) => {
        answer.push({...results[i], rest_name:results2[0].rest_name})

        if(i == results.length - 1 ){
          res.status(200,{
            'Content-Type' : 'application/json'
          });
          res.end(JSON.stringify(answer))
        }
      })      
    }    
  });
}

exports.getRestEvents = (req,res) => {
  console.log("Some ridiculous statements")
  let q1 = "SELECT * FROM `yelp`.`event_details` where rest_id="+mysql.escape(req.params.rest_id);
  console.log("QUERY : "+q1)
  answer = []
  con.query(q1, (err,results) => {
    if(err){
      res.status(400,{
        'Content-Type' : 'text/plain'
      });
      res.end('Err')
    }
    console.log("Got r1")
    console.log(results)
    for(let i in results){
      let q2 = "SELECT user_id from `yelp`.`event_registration` where event_id = "+mysql.escape(results[i].event_id)
      con.query(q2, (err2, results2) => {
        
        if(err2){
          res.status(400,{
            'Content-Type' : 'text/plain'
          });
          res.end('Err')
        }
        console.log("Got r2")
        console.log(results2)
        if(results2[0] !== undefined){
          console.log("I = "+i)
          let q3 = "SELECT * from `yelp`.`user_details` where id = "+mysql.escape(results2[0].user_id)

          con.query(q3, (err3, results3) => {
            if(err3){
              res.status(400,{
                'Content-Type' : 'text/plain'
              });
              res.end('Err 3')
            }
            console.log("R3")
            console.log(results3)
            console.log({...results[i], registeredUsers:results3})
            answer.push({...results[i], registeredUsers:results3})
            console.log("Length = "+results.length)
            console.log("i = "+i)
            if(i == results.length - 1 ){
              console.log("Sending")
              console.log(answer);
              res.status(200,{
                'Content-Type' : 'application/json'
              });
              res.end(JSON.stringify(answer))
            }
          })
        }
        else{
          console.log("Now undefined, i = "+i)
          answer.push({...results[i], registeredUsers:[]})
          setTimeout(()=>{
            console.log("After 1 sec")
            console.log(answer)
            res.status(200,{
              'Content-Type' : 'application/json'
            });
            res.end(JSON.stringify(answer))
          },100)
        }
      })
    }
  });
}

exports.getRegisteredEvents = (req,res) => {
  console.log("Calling for help")
  let q1 = "SELECT * FROM `yelp`.`event_registration` where user_id="+mysql.escape(req.params.id);
  console.log("Query : "+q1)
  let answer = []
  con.query(q1, (err,results) => {
    if(err){
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    console.log("One : ")
    console.log(results)

    for(let i in results){
      let q2 = "SELECT * from `yelp`.`event_details` where event_id = "+mysql.escape(results[i].event_id)      
      con.query(q2, (err2, results2) => {
        // answer.push(results2[0])
        answer.push(results2[0])
        if(i == results.length - 1 ){
          res.status(200,{
            'Content-Type' : 'application/json'
          });
          res.end(JSON.stringify(answer))
        }
      })      
    }    
  });
}