var {cart} = require('../Models/CartModel');

function handle_request(msg, callback){
    console.log("Inside cart kafka backend");
    console.log(msg);
    
    //main logic
    var cart_items = cart(msg)
    cart_items.save().then(result => {
      console.log("Added to cart")
      callback(null, {code:200,message:"Successfully Added to cart"})
    }).catch(err => {
      callback(null, {code:500,message:"Problem while adding to cart"})
    })
    //main logic ends
    console.log("after callback of add to cart");
};

exports.handle_request = handle_request;