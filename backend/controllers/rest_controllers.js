var con = require('./config')
var mysql = require('mysql');

exports.filter = (req,res) => {
  console.log("Filter = "+JSON.stringify(req.body))

  let temp1 = ""
  let temp2 = ""
  let temp3 = ""
  let temp4 = ""
  let temp5 = ""

  if(!req.body.takeout){
    temp1 = "%"
  }
  else{
    temp1 = req.body.takeout
  }

  if(!req.body.delivery){
    temp2 = "%"
  }
  else{
    temp2 = req.body.delivery
  }

  if(!req.body.dineout){
    temp3 = "%"
  }
  else{
    temp3 = req.body.dineout
  }

  if(!req.body.searchTerm){
    temp4 = "%"
  }
  else{
    temp4 = req.body.searchTerm
  }

  if(!req.body.searchLoc){
    temp5 = "%"
  }
  else{
    temp5 = req.body.searchLoc
  }

  let q1;

  if(req.body.hood !== undefined){
    q1 = "Select * from `yelp`.`rest_details` where (rest_id IN (SELECT rest_id FROM `yelp`.`dish_details` WHERE dish_name LIKE '%"+temp4+"%') OR rest_name LIKE '%"+temp4+"%') AND location LIKE '%"+temp5+"%' AND takeout LIKE '"+temp1+"' AND delivery LIKE '"+temp2+"' AND dineout LIKE '"+temp3+"' AND hood in ("+mysql.escape(req.body.hood)+")";
  }    
  else{
    q1 = "Select * from `yelp`.`rest_details` where (rest_id IN (SELECT rest_id FROM `yelp`.`dish_details` WHERE dish_name LIKE '%"+temp4+"%') OR rest_name LIKE '%"+temp4+"%') AND location LIKE '%"+temp5+"%' AND takeout LIKE '"+temp1+"' AND delivery LIKE '"+temp2+"' AND dineout LIKE '"+temp3+"'";
  }
  console.log("QUERY = "+q1)
  
  con.query(q1, function (err2, results) {      
    if(err2){
      console.log("Error occured: "+err2)
      res.status(400,{
        'Content-Type' : 'text/value'
      });
      res.end("Error occured")
    }

    if(results.length>0){
      res.status(200,{
        'Content-Type' : 'application/json'
      });
      res.end(JSON.stringify(results))
    }
    else{
      console.log("Sending this")
      res.status(404,{
        'Content-Type' : 'text/plain'
      });
      res.end("Not found")
    }
  })
  
}