var express = require("express");
var cors = require("cors");
var app = express();
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

app.use(cors());
//const { response } = require("express");
const mysql = require("mysql2");

// create the connection to database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "apiserver",
});

app.post("/register", jsonParser, function (req, res, next) {
  // execute will internally call prepare and query
  connection.execute(
    "INSERT INTO users (`Fullname`, `Username`, `Passwd`, `Email`) VALUES (?, ?, ?, ?) ",
    [req.body.Fullname, req.body.Username, req.body.Passwd, req.body.Email],

    // [req.body.Fullname, req.body.Username, req.body.Passwd, req.body.Email],
    function (err, results, fields) {
      //   console.log(results); // results contains rows returned by server
      //   console.log(fields); // fields contains extra meta data about results, if available
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "OK" });
      //   res.json({ Email });
      // If you execute same statement again, it will be picked from a LRU cache
      // which will save query preparation time and give better performance
    }
  );
  //   var Email = req.body.Email;
});


app.listen(3333, jsonParser, function () {
  console.log("CORS-enabled web server listening on port 3333");
});
