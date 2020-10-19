var con = require('./config')
var mysql = require('mysql');

exports.placeOrder = (req,res) => {
  console.log("Received order on backend")
  console.log("Orders "+JSON.stringify(req.body))
  let t1_data = {
    "rest_id":req.body.orders[0].rest_id,
    "status":"Placed",
    "mode":req.body.mode,
    "total":req.body.total,
    "user_id":req.body.orders[0].user_id
  };
  let q1 = "INSERT INTO `yelp`.`order_register` SET "+mysql.escape(t1_data);
  
  const q1_exec = async () => {
    return await con.query(q1)
  }

  con.query(q1, (err,results) => {
    if(err){
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }      
    console.log("Results : "+JSON.stringify(results))
    req.body.orders.map(order => {
      let t2_data = {
        "order_id":results.insertId,
        "dish_id":order.dish_id,
        "quantity":order.quantity
      };
      let q2 = "INSERT INTO `yelp`.`order_details` SET "+mysql.escape(t2_data);
      con.query(q2, (err1,t_results) => {
        if(err1){
          res.status(400,{
            'Content-Type' : 'text/value'
          });
          res.end("Error occured")
        }          
        console.log("Yeah, I inserted them")
      })
    })

    let q3 = "TRUNCATE `yelp`.`cart`;"
    con.query(q3, (err2, del_result) => {
      if(err2){
        res.status(400,{
          'Content-Type' : 'text/value'
        });
        res.end("Error occured")
      }
      console.log("Deleted cart")
    })
    
    res.status(200,{
      'Content-Type' : 'application/json'
    });
    res.end("Order placed")
  })
};

exports.deleteCart = (req,res) => {
  console.log("I will delete "+JSON.stringify(req.body))      
  let q1 = "DELETE from `yelp`.`cart` where cart_id="+mysql.escape(req.body.cart_id);
  
  con.query(q1, function (err2, results) {      
    if(err2){
      console.log("Error occured: "+err2)
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    console.log("Results = "+JSON.stringify(results))
    res.status(202,{
      'Content-Type' : 'application/json'
    });
    res.end(JSON.stringify(results))
  })
}

exports.addToCart = (req,res) => {
  
  console.log("Trying to add")
  let q1 = "INSERT INTO `yelp`.`cart` SET"+mysql.escape(req.body);

  con.query(q1, function (err2, results) {      
    if(err2){
      console.log("Error occured, fucker: "+err2)
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    console.log("Done adding")
    res.status(200,{
      'Content-Type' : 'text/plain'
    });
    res.end("Added to cart")
  })
  
};

exports.updateOrderStatus = (req,res) => {
  console.log("Update status at details : "+JSON.stringify(req.body))

  let q1 = "UPDATE `yelp`.`order_register` SET `status` = "+mysql.escape(req.body.status)+" WHERE (`order_id` = "+req.body.order_id+");"
  console.log("QUERY : "+q1)
  con.query(q1, function (err2, results) {      
    if(err2){
      console.log("Error occured, fucker: "+err2)    
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    console.log("Updated")
    res.status(200,{
      'Content-Type' : 'application/json'
    });
    res.end("Done")
  })
};

exports.filter_order_status = (req,res) => {
  console.log("Give details reg: "+JSON.stringify(req.body.statuses))
  let q1;
  if(req.body.type === "rest"){
    if(req.body.statuses.length>0){
      q1 = "Select * from `yelp`.`order_register` where status IN ("+mysql.escape(req.body.statuses)+") and rest_id="+mysql.escape(req.body.id);
    }
    else{
      q1 = "Select * from `yelp`.`order_register` where rest_id="+mysql.escape(req.body.id);
    }    
  }    
  else if(req.body.type === "user"){
    if(req.body.statuses.length>0){
      q1 = "Select * from `yelp`.`order_register` where status IN ("+mysql.escape(req.body.statuses)+") and user_id="+mysql.escape(req.body.id);
    } 
    else{
      q1 = "Select * from `yelp`.`order_register` where user_id="+mysql.escape(req.body.id);
    }   
  }    
  answer = []
  con.query(q1, function (err2, results) {
    if(err2){
      console.log("Error occured: "+err2)
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }
    console.log("Restlts of weird query")
    console.log(results)
    if(results.length === 0){
      res.status(404,{
        'Content-Type' : 'text/plain'
      });
      res.end("No such things")
    }
    for(let j in results){
      let dishes = []
      let temp = {status:results[j].status, order_id:results[j].order_id, mode:results[j].mode, total:results[j].total}
      let q2 = "Select * from `yelp`.`order_details` where order_id="+mysql.escape(results[j].order_id);
      con.query(q2, (err2, results2) => {        
        //Query 4        
        let q4;

        if(req.body.type==="rest"){
          q4 = "Select first_name, ilove, last_name,city, country, state  from `yelp`.`user_details` where id="+mysql.escape(results[j].user_id);
          con.query(q4, (err4, results4) => {
            console.log(results4)
            temp = {...temp, user_name:results4[0].first_name+" "+ results4[0].last_name, city:results4[0].city, country:results4[0].country, state:results4[0].state, ilove:results4[0].ilove}
          })
        }
        else if(req.body.type==="user"){
          q4 = "Select rest_name from `yelp`.`rest_details` where rest_id="+mysql.escape(results[j].rest_id);
          con.query(q4, (err4, results4) => {
            temp = {...temp, rest_name:results4[0].rest_name}
          })
        }        
        //Query 3
        for(let i in results2){          
          console.log("R2: "+JSON.stringify(results2[i]))
          let q3 = "Select dish_name from `yelp`.`dish_details` where dish_id="+mysql.escape(results2[i].dish_id);          
          con.query(q3, (err3, results3) => {
            dishes.push(results2[i].quantity+" * "+results3[0].dish_name)
            if(i == results2.length-1){
              temp = {...temp, dishes:dishes}
              answer.push(temp)
              if(j == results.length - 1){
                console.log("Final Asnwer : "+JSON.stringify(answer));
                res.status(200,{
                  'Content-Type' : 'application/json'
                });
                res.end(JSON.stringify(answer))
              }
            }            
          })
        }
      })
    }
  })
}