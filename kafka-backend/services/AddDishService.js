var {dish_details} = require('../Models/DishDetails');

function handle_request(msg, callback){   
    console.log("Inside add dish kafka backend");
    console.log(msg);
    
    //main logic
    var new_dish = dish_details(msg)
    new_dish.save().then(result => {
      console.log("Dish added", result);
      callback(null, {code:200,message:"Successfully signed up"})
    }).catch(err => {
      console.log("Error occured, dish not added", err)
      callback(null, {code:500,message:"Some error occured, try again"})
    })

    // user_details.findOne({email:msg.email}, function(err, result){
    //     // console.log("I got invoked")
    //     if(err){
    //       console.log("Error in signup")
    //       callback(null,{code:500,message:"Some Error Occured in Signup"})
    //     }
    //     else if(result){
    //     //   console.log("Email already in use")
    //       callback(null, {code:403,message:"Email already in use"})
    //     }
    //     else{
    //     //   console.log("Ok, I'll insert")
    //       let hashedPassword = bcrypt.hashSync(msg.password,10);
    //       let today = new Date();
    //       let user = {
    //         'first_name':msg.first_name,
    //         'last_name':msg.last_name,
    //         'email':msg.email,
    //         'password':hashedPassword,
    //         'zip':msg.zip,
    //         'birthdate':msg.birthdate,
    //         'yelping_since': today.getMonth()+"/"+today.getFullYear()
    //       };
    
    //       var new_user = user_details(user)
    //       new_user.save().then(result => {
    //         // console.log("Signed Up", result);
    //       })
    //       callback(null, {code:200,message:"Successfully signed up"})
    //     }
    //   })

    //main logic ends
    console.log("after callback of add dish");
};

exports.handle_request = handle_request;