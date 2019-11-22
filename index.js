var express = require('express');
const app = express();

var routes = require('./routes/index');

var database = require('./database');

app.use(express.urlencoded());

app.use(express.json());


app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*'); 
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); 
    next(); 
});

app.use('/',routes);



app.listen(5000,function(){
    console.log("app is listning on 5000");
});