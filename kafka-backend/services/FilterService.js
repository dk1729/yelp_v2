var {rest_details} = require('../Models/RestDetails');

function handle_request(msg, callback){
    console.log("Inside filter rest kafka backend");
    console.log(msg);
    //main logic
    var arr = []
    for (var key in msg) {
        if (msg.hasOwnProperty(key)) {
          console.log(key + " -> " + msg[key]);
          var temp = {}
          temp[key] = msg[key]
          arr.push(temp)
        }
      }

    console.log("So, the array is ")
    console.log(arr)

    rest_details.find({$or:arr}, {password:0, __v:0}, function(err, result){
        console.log("I got invoked, yeah")
        console.log(result)
        if(err){
            console.log("Some error occured during filter")
            console.log(err)
            callback(null,{code:500,message:"Some Error Occured in Signup"})
        }
        else if(result){
            callback(null, {code:200,message:result})
        }
        else{
            callback(null, {code:204, message:"No restaurants found"})
        }
    })
    //main logic ends
    console.log("after callback of filter");
};

exports.handle_request = handle_request;