var express = require('express');
var app     = express();

var bodyParser = require('body-parser');
var mongoose    = require('mongoose');

var morgan = require('morgan');

var dbconfig    = require('./config/database');
var user = require('./routes/user.route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const dbconnection  = mongoose.connect(dbconfig.url);
if(dbconnection){
    console.log("The data base is connected")
}else{
    console.log("There is a connection error");
}
mongoose.Promise=global.Promise;



app.use('/user' , user);



app.get('/' , function(req,res){
    res.send("This is root");
});




app.listen(3000 ,function(){
    console.log("The server is running on the port 3000");
});