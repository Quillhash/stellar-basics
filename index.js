var express = require('express');
var app = express();

var stellar = require('./stellar');

app.use('/stellar',stellar)

app.get('/',(req,res)=>{
    res.send("home page");
})
app.listen(3000,()=>{
    console.log("listening")
})