### Prerequisites
Your machine must have nodejs installed

### Running the app
After cloning ,install the application dependancies by: <br>
- npm install <br>

Start the app:<br>

- node index <br>

Now open your browser and go to http://localhost:3000
Browser window will show you api endpoints.<br>

## Api end points:
### http://localhost:3000/stellar/publickey
>> #### This will generate you the key pair.Key pair will contain public key and secret seed.Public key will be used to create account and secret seed will be used to perform transactions from your account.


### http://localhost:3000/stellar/createAccount
>> #### This end point will show you a form to create your account.You just need to enter your public key here.Form submission will send a post request to http://localhost:3000/stellar/account  where logic of creating account is fired.You can directly send post request to '/stellar/account' end point by sending publickey in body of request.You can test post request in postman app.


### http://localhost:3000/stellar/sendPayment
>> #### This end point will show you a form to send assets (here we can send only lumens as for test network we can have only lumens in our account) from one account to another.You need to have your account secret seed and receiver account public key to send payment.Form submission will send a post request to http://localhost:3000/stellar/payment  where logic of sending payment is fired.You can directly send post request to '/stellar/payment' end point by sending your secret and receiver public key in body of request.You can test post request in postman app.

### http://localhost:3000/stellar/receivedPayments
>> #### This end point will show you a form to get the details of received payments of an public key.You need to have your account secret seed and receiver account public key to send payment.Form submission will send a post request to http://localhost:3000/stellar/receipts  where logic of getting receipts is fired.Stellar sdk sends receipts as server sent events.Event data will gets logged to terminal .We can subscribe to these events on client side also but here we are simply logging them .You can directly send post request to '/stellar/receipts' end point by sending your public key in body of request.You can test post request in postman app.












