var kafka = require('../kafka/client');

exports.sendMessage = (req, res) => {
  console.log("Req")
  console.log(req.body);

  kafka.make_request('send_message',req.body, function(err,results){
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