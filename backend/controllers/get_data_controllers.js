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
}

exports.searchEvents = (req,res) => {
  kafka.make_request('search_events', req.params, function(err,results){
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
  // let q1 = "SELECT * FROM `yelp`.`event_details` where event_name LIKE '%"+req.params.term+"%'";
  // answer = []
  // con.query(q1, (err,results) => {
  //   if(err){
  //     res.status(400,{
  //       'Content-Type' : 'text/value'
  //     });
  //     res.end("Error occured")
  //   }
  //   console.log(results)
  //   for(let i in results){
  //     console.log("Ok "+JSON.stringify(results[i]))
  //     let q2 = "SELECT rest_name from `yelp`.`rest_details` where rest_id = "+mysql.escape(results[i].rest_id)      
  //     con.query(q2, (err2, results2) => {
  //       console.log("Trying")
  //       console.log({...results[i], rest_name:results2[0].rest_name})
  //       answer.push({...results[i], rest_name:results2[0].rest_name})

  //       if(i == results.length - 1 ){
  //         res.status(200,{
  //           'Content-Type' : 'application/json'
  //         });
  //         res.end(JSON.stringify(answer))
  //       }
  //     })      
  //   }    
  // });
}

exports.getEvents = (req,res) => {
  console.log("Inside get events, user side")
  kafka.make_request('get_events',"Hola Señor", function(err,results){
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

exports.getRestEvents = (req,res) => {
  console.log("Some ridiculous statements")
  kafka.make_request('get_rest_events',req.params, function(err,results){
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

exports.getRegisteredEvents = (req,res) => {
  console.log("Calling for help")
  kafka.make_request('get_registered_events',req.params, function(err,results){
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