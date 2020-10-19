var mysql = require('mysql');

var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "rootroot"
});

module.exports = con;