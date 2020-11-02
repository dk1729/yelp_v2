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