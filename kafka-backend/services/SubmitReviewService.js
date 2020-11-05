var {reviews} = require('../Models/ReviewModel');

function handle_request(msg, callback){   
    console.log("Inside submit review kafka backend");
    console.log(msg);
    
    //main logic
    var new_review = reviews(msg)
    new_review.save().then(result => {
      console.log("Review added", result);
      callback(null, {code:200,message:"Review submitted"})
    })
    //main logic ends
    console.log("after callback of submit review");
};

exports.handle_request = handle_request;