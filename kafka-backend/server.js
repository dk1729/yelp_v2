var connection =  new require('./kafka/Connection');
//topics files
var UserSignup = require('./services/UserSignup');
var UserLogin = require('./services/UserLogin');
var GetUserData = require('./services/GetUserData');
var UpdateUserData = require('./services/UpdateUserData');
var RestSignup = require('./services/RestSignup')
var RestLoginService = require('./services/RestLoginService');
var GetRestData = require('./services/GetRestData');
var updateRestData = require('./services/UpdateRestData');
var AddDishService = require('./services/AddDishService');
var GetDishesService = require('./services/GetDishesService');
var UpdateDishService = require('./services/UpdateDishService');
var GetRestaurantsService = require('./services/GetRestaurantsService');
var FilterService = require('./services/FilterService');
var AddToCartService = require('./services/AddToCartService')
var GetCartService = require('./services/GetCartService')
var PlaceOrderService = require('./services/PlaceOrderService');
var GetOrdersService = require('./services/GetOrdersService');
var FilterOrdersServices = require('./services/FilterOrdersServices');
var SubmitReviewService = require('./services/SubmitReviewService');
var GetReviewsService = require('./services/GetReviewsService');
var UpdateOrderStatusService = require('./services/UpdateOrderStatusService');
var AddEventService = require('./services/AddEventService');
var GetRestEventsService = require('./services/GetRestEventsService');
var GetEventsService = require('./services/GetEventsService');
var RegisterForEventService = require('./services/RegisterForEventService');
var GetRegisteredEventsService = require('./services/GetRegisteredEventsService');
var SearchEventsService = require('./services/SearchEventsService');
var AddUserPhotoService = require('./services/AddUserPhotoService');
var AddRestPhotosService = require('./services/AddRestPhotosService');
var AddDishImageService = require('./services/AddDishImageService');
var GetUsersService = require('./services/GetUsersService');
var SendMessageService = require('./services/SendMessageService');
var GetChatsService = require('./services/GetChatsService');


function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log("Hola",data);
            });
        });
        return;
    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
handleTopicRequest("user_signup",UserSignup);
handleTopicRequest("user_login",UserLogin);
handleTopicRequest("get_user_data",GetUserData);
handleTopicRequest("update_user_data",UpdateUserData);
handleTopicRequest("rest_signup", RestSignup);
handleTopicRequest("rest_login", RestLoginService);
handleTopicRequest("get_rest_data", GetRestData);
handleTopicRequest("update_rest_data", updateRestData);
handleTopicRequest("add_dish", AddDishService);
handleTopicRequest("get_dishes", GetDishesService);
handleTopicRequest("update_dish", UpdateDishService);
handleTopicRequest("get_restaurants", GetRestaurantsService);
handleTopicRequest("filter", FilterService);
handleTopicRequest("add_to_cart", AddToCartService);
handleTopicRequest("get_cart", GetCartService);
handleTopicRequest("place_order", PlaceOrderService);
handleTopicRequest("get_orders", GetOrdersService);
handleTopicRequest("filter_orders", FilterOrdersServices);
handleTopicRequest("submit_review", SubmitReviewService);
handleTopicRequest("get_reviews", GetReviewsService);
handleTopicRequest("update_order_status", UpdateOrderStatusService);
handleTopicRequest("add_event", AddEventService);
handleTopicRequest("get_rest_events", GetRestEventsService);
handleTopicRequest("get_events", GetEventsService);
handleTopicRequest("register_for_event", RegisterForEventService);
handleTopicRequest("get_registered_events", GetRegisteredEventsService);
handleTopicRequest("search_events", SearchEventsService);
handleTopicRequest("upload_user_image", AddUserPhotoService);
handleTopicRequest("upload_rest_images", AddRestPhotosService);
handleTopicRequest("upload_dish_image", AddDishImageService);
handleTopicRequest("get_users", GetUsersService);
handleTopicRequest("send_message", SendMessageService);
handleTopicRequest("get_chats", GetChatsService);