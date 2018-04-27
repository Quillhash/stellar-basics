var bodyParser = require('body-parser');
var stellar = require('stellar-sdk');

var express = require('express');
var router = express.Router();
createAccount = (req,res)=>{
    res.send("creating account");

}
payment = (req,res)=>{
    res.send("sending payment");

}
getHistory = (req,res)=>{
    res.send("getting history");

},
getReceivedPayments = (req,res)=>{
    res.send("getting payments")

}
router.get('/',(req,res)=>{
    res.send(` <h1> api endpoints for get method: </h1> <br> <h2> /history </h2> <br> <h2> /receivedPayment </h2> <br> 
    <h1> api endpoints for post method: </h1> <br> <h2> /createAccount </h2> <br> <h2> /sendPayment </h2>`)
});
router.get('/history',getHistory);

router.get('/receivedPayment',getReceivedPayments);
module.exports = router;
