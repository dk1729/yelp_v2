//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
app.set('view engine', 'ejs');

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

//imports
var image_controller = require('./controllers/image_controller');
var get_data_controllers = require('./controllers/get_data_controllers');
var dish_controllers = require('./controllers/dish_controllers');
var event_controllers = require('./controllers/event_controllers');
var login_controllers = require('./controllers/login_controllers');
var order_controllers = require('./controllers/order_controllers');
var rest_controllers = require('./controllers/rest_controllers');
var signup_controllers = require('./controllers/signup_controllers');
var review_controllers = require('./controllers/review_controllers');
var update_controllers = require('./controllers/update_controllers');
//post paths
app.post("/upload", image_controller.uploadUserImage)
app.post("/uploadRestImages", image_controller.restImagesUpload)
app.post("/uploadDishImage", image_controller.uploadDishImage)
app.post("/login", login_controllers.userLogin)
app.post("/restlogin", login_controllers.restLogin)
app.post("/signup", signup_controllers.usersignup)
app.post("/restsignup", signup_controllers.restSignup)
app.post("/update", update_controllers.updateUser)
app.post("/updateRest", update_controllers.updateRest)
app.post("/addDish", dish_controllers.addDish)
app.post("/updateDish", dish_controllers.updateDish)
app.post("/placeOrder", order_controllers.placeOrder)
app.post("/deleteCart", order_controllers.deleteCart)
app.post("/filter", rest_controllers.filter)
app.post('/addToCart', order_controllers.addToCart)
app.post('/updateOrderStatus', order_controllers.updateOrderStatus)
app.post("/filter_order_status", order_controllers.filter_order_status)
app.post('/submitReview', review_controllers.submitReview);
app.post("/addEvent", event_controllers.addEvent);
app.post("/registerForEvent", event_controllers.registerForEvent);
//get paths
app.get("/searchEvents/:term", get_data_controllers.searchEvents)
app.get("/getEvents", get_data_controllers.getEvents)
app.get("/getRestEvents/:rest_id", get_data_controllers.getRestEvents)
app.get("/getRegisteredEvents/:id", get_data_controllers.getRegisteredEvents);
app.get("/getData/:id", get_data_controllers.getUserData);
app.get("/getRestData/:rest_id", get_data_controllers.getRestData)
app.get("/getDishes/:rest_id", get_data_controllers.getDishes)
app.get("/getOrders", get_data_controllers.getOrders)
app.get("/getCart/:user_id", get_data_controllers.getCart)
app.get('/getReviews', get_data_controllers.getReviews)
//more config
app.listen(3001);
console.log("Server Listening on port 3001");