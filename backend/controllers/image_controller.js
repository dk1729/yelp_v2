var multer = require('multer');
var path = require('path');
var {v4: uuidv4} = require('uuid')
var con = require('./config')
var mysql = require('mysql');
var kafka = require('../kafka/client')

const storage = multer.diskStorage({
  destination:"./uploads",
  filename:(req, file, callback)=>{
    callback(null, "PROFILE-"+Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
}).single("image");

exports.uploadUserImage = (req,res) => {
  upload(req, res, err => {
    if(err){
      throw err;
    }
    kafka.make_request('upload_user_image', {file:req.file.filename, user_id:req.body.id}, function(err,results){
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
        res.end(results.message);
      }
    });
  })
}

const DIR = './uploads/'
const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
  }
});

var upload1 = multer({
  storage: storage1,
  fileFilter: (req, file, cb) => {
      if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
      } else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
      }
  }
}).array('images', 4);

exports.restImagesUpload =  (req, res, next) => {
  console.log("Over here")
  console.log(req.files)

  upload1(req, res, err => {
    if(err){
      throw err;
    }

    kafka.make_request('upload_rest_images', {path1:req.files[0].filename, path2:req.files[1].filename, path3:req.files[2].filename, path4:req.files[3].filename, rest_id:req.body.rest_id}, function(err,results){
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
        res.end(results.message);
      }
    });
  })
}

const storage2 = multer.diskStorage({
  destination:"./uploads/",
  filename:(req, file, callback)=>{
    callback(null, "DISH-"+Date.now()+path.extname(file.originalname))
  }
})

const upload3 = multer({
  storage:storage2
}).single("dish_image");

exports.uploadDishImage = (req,res) => {
  upload3(req, res, err=>{
    if(err){
      throw err;
    }          
    kafka.make_request('upload_dish_image', {path:req.file.filename, dish_id:req.body.dish_id}, function(err,results){
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
        res.end(results.message);
      }
    });
  })
}