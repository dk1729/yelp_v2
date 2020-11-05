var {rest_details} = require('../Models/RestDetails');
var {dish_details} = require('../Models/DishDetails');

function handle_request(msg, callback){
    console.log("Inside filter rest kafka backend");
    console.log(msg);
    //main logic
    var arr = [];
    for(var key in msg){
      if(msg.hasOwnProperty(key)) {
        console.log(key + " -> " + msg[key]);
        if(key !== "searchTerm" && key !== "searchLoc"){
            console.log("Inside if")
            let temp = {}
            temp[key] = msg[key]
            arr.push(temp)
        }
        if(key === "searchLoc"){
            let temp = {}
            temp["location"] = msg[key]
            arr.push(temp)
        }
        if(key === "searchTerm"){
            let temp = {}
            temp["rest_name"] = new RegExp(msg[key],'i')
            arr.push(temp)
        }
      }
    }

    if(msg.searchTerm){
        dish_details.find({dish_name:new RegExp(msg.searchTerm,'i')}, {rest_id:1}, function(err, result){
            console.log("I also got invoked")
            console.log(result)
            if(err){
                console.log("Some error occured in fetching searched dish")
                callback(null,{code:500, message:"Some error occured in fetching searched dish"})
            }
            else if(result.length>0){
                let temp = []
                for(let i in result){
                    temp.push(result[i].rest_id)
                }
                console.log(temp)
                arr.push({_id:{$in:temp}})
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
            }
        })
    }
    else{
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
    }    
    //main logic ends
    console.log("after callback of filter");
};

exports.handle_request = handle_request;