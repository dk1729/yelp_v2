const mongoose = require('mongoose');
mongoose.Promise = require('bluebird')
const uri = 'mongodb+srv://root:rootroot@yelp.sbp6n.mongodb.net/yelp?retryWrites=true&w=majority'

mongoose.connect(uri, {
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
  console.log("Mongo connected")
})
.catch(err=>{
  console.log("Mongo not connected "+err)
})

module.exports = mongoose