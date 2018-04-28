
var StellarSdk = require('stellar-sdk');
var rp = require('request-promise');
var express = require('express');
var router = express.Router();
var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
StellarSdk.Network.useTestNetwork();


var transaction;

createAccount = (req,res)=>{
    console.log("creating account");
    console.log();
    var options = {
        method: 'GET',
        uri: 'https://friendbot.stellar.org',
        qs: { addr:req.body.publickey},
        json: true
        
    };

     rp(options)
    .then(function (parsedBody) {
        // POST succeeded...
        server.loadAccount(req.body.publickey)
        .then(function(account) {
            
            account.balances.forEach(function(balance) {
              res.render('accountInfo',{AssetType:balance.asset_type ,Balance: balance.balance});
            });
          });
    })
    .catch(function (err) {
        // POST failed...
        console.log(err);
        res.send(err);
        
    })
}


payment = (req,res)=>{
    var sourceKeys = StellarSdk.Keypair
  .fromSecret(req.body.secret);
    server.loadAccount(req.body.destinationKey)
    .catch(StellarSdk.NotFoundError, function (error) {
      throw new Error('The destination account does not exist!');
    })
    .then(function() {
      return server.loadAccount(sourceKeys.publicKey());
    })
    .then(function(sourceAccount) {
      transaction = new StellarSdk.TransactionBuilder(sourceAccount)
        .addOperation(StellarSdk.Operation.payment({
          destination: req.body.destinationKey,
          asset: StellarSdk.Asset.native(),
          amount: req.body.amount
        }))
        .addMemo(StellarSdk.Memo.text('Test Transaction'))
        .build();
      transaction.sign(sourceKeys);
      return server.submitTransaction(transaction);
    })
    .then(function(result) {
      console.log('Success! Results:', result);
      server.loadAccount(sourceKeys.publicKey())
        .then(function(account) {
            account.balances.forEach(function(balance) {
              res.render('accountInfo',{AssetType:balance.asset_type ,Balance: balance.balance});
            });
          });
    })
    .catch(function(error) {
      console.error('Something went wrong!', error);
    });

}



getReceivedPayments = (req,res,)=>{
  var payments = server.payments().forAccount(req.query.accountId);
    
  payments.stream({
    onmessage: function(payment) {
      
      if (payment.to !== req.query.accountId) {
        
        return;
      }
      
      var asset;
      if (payment.asset_type === 'native') {
        asset = 'lumens';
      }
      else {
        asset = payment.asset_code + ':' + payment.asset_issuer;
      }
      console.log(payment.amount + ' ' + asset + ' from ' + payment.from);
      
      
    },
   
    onerror: function(error) {
      console.error('Error in payment stream');
    },
   

  });


}



router.get('/publickey',(req,res)=>{
    var pair = StellarSdk.Keypair.random();
    let secret = pair.secret();
    let public = pair.publicKey();
    res.send("Secret:" + secret + "<br> Public:" + public +
    `<br> 
    <br>
    <h2> copy your public key and click on create account to create new account </h2>
    <br>
    <form method='GET' action = '/stellar/createAccount'> 
    <input type = 'submit' value='create account'/>
    </form>`
);
});
router.get('/createAccount',(req,res)=>{
    res.sendFile('views/account.html',{root: __dirname });
});

router.get('/sendPayment',(req,res)=>{
  res.render('payment',{title:"Send payment"});
});


router.get('/receipts',getReceivedPayments);

router.get('/receivedPayment',(req,res)=>{
    res.render('receivedPayments');
});


router.post('/account',createAccount);

router.post('/payment',payment);


 

module.exports = router;
