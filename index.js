var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var stellar = require('./stellar');
app.set("view engine","jade");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/stellar',stellar)

app.get('/',(req,res)=>{
    res.sendFile('views/index.html',{root: __dirname });
})
app.post('/account',(req,res)=>{
    console.log(req.body)
})
app.listen(3000,()=>{
   
    console.log("listening")
})