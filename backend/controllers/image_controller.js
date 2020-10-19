var multer = require('multer');
var path = require('path');
var {v4: uuidv4} = require('uuid')
var con = require('./config')
var mysql = require('mysql');

const storage = multer.diskStorage({
  destination:"../uploads/",
  filename:(req, file, callback)=>{
    callback(null, "PROFILE-"+Date.now()+path.extname(file.originalname))
  }
})

const upload = multer({
  storage:storage
}).single("image");

exports.uploadUserImage = (req,res) => {
  upload(req, res, err=>{
    if(err){
      throw err;
    }          
    let sql = "UPDATE `yelp`.`user_details` SET `path` = "+mysql.escape(req.file.filename)+" WHERE (`id` = "+req.body.id+");"
    
      con.query(sql, function (err, result) {
        if (err){
          throw err;
          res.status(400,{
            'Content-Type' : 'text/value'
          });
          res.end("Error occured")
        }
        if(result.length>0){
          console.log("UPLOADED SUCCESSFULLY")
          res.status(202,{
            'Content-Type' : 'application/json'
          });
          res.end("UPLOADED")
        }
        else{
          res.status(205,{
            'Content-Type' : 'application/json'
          });
          res.end("Some error occured")
        }
      });
    
    
    if(!err){
      return res.sendStatus(200).end();
    }
  })
}

const DIR = '../uploads/'
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

  for(let i=0;i<req.files.length;i++){
    let sql = "UPDATE `yelp`.`rest_details` SET `path"+(i+1)+"` = "+mysql.escape(req.files[i].filename)+" WHERE (`rest_id` = "+req.body.rest_id+");"
    
    console.log("Query = "+sql)
    con.query(sql, (err, result) => {
      if (err){
        throw err;
        res.status(400,{
          'Content-Type' : 'text/value'
        });
        res.end("Error occured")
      }

      if(i == 3){
        if(result.length>0){
          console.log("UPLOADED SUCCESSFULLY")
          res.status(202,{
            'Content-Type' : 'application/json'
          });
          res.end("UPLOADED")
        }
        else{
          res.status(205,{
            'Content-Type' : 'application/json'
          });
          res.end("Some error occured")
        }
      }      
    });
  }
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
    let sql = "UPDATE `yelp`.`dish_details` SET `dish_path` = "+mysql.escape(req.file.filename)+" WHERE (`dish_id` = "+req.body.dish_id+");"
    
      con.query(sql, function (err, result) {
        if (err){
          throw err;
          res.status(400,{
            'Content-Type' : 'text/value'
          });
          res.end("Error occured")
        }
        if(result.length>0){
          console.log("UPLOADED SUCCESSFULLY")
          res.status(202,{
            'Content-Type' : 'application/json'
          });
          res.end("UPLOADED")
        }
        else{
          res.status(205,{
            'Content-Type' : 'application/json'
          });
          res.end("Some error occured")
        }
      });
    
    
    if(!err){
      return res.sendStatus(200).end();
    }
  })
}