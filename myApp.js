let express = require('express');
let app = express();
let bodyParser = require('body-parser');
require('dotenv').config()

// app.get("/", function(req, res) {
//     res.send('Hello zer');
// })

app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.use(bodyParser.urlencoded({extended: false}))

app.route('/name').get(function(req, res) {
    myName = req.query.first + " " + req.query.last
    res.send({ name: myName});
}).post(function(req, res) {
    myName = req.body.first + " " + req.body.last
    res.send({ name: myName});
})

app.get("/", function(req, res) {
    path = __dirname + '/views/index.html'
    res.sendFile(path);
})

app.get("/:word/echo", function(req, res) {
    res.send({echo: req.params.word});
})

app.get("/json", function(req, res) {
    if(process.env.MESSAGE_STYLE == "uppercase"){
        res.send({"message": "HELLO JSON"});
    }else{
        res.send({"message": "Hello json"});
    }
})

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
  }, function(req, res) {
    res.send({time: req.time});
});

app.use("/public", express.static(__dirname + '/public'))





























 module.exports = app;
