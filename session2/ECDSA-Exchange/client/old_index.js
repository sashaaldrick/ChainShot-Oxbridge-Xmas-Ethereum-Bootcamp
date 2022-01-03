import "./index.scss";
const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1');
const server = "http://localhost:3042";

// what do we need to do?
// using the element "private-key", we need to authenticate the private key with the public key on the front-end and allow the transaction to go ahead. probably absolutely appalling security-wise especially that we are using the private key, but this is for learning purposes only.
// document.getElementById("private-key").addEventListener('input', ({ target: {value} }) => {
//   // assuming people will copy and paste a key in so no need to worry about when typing is stopped
//   // no private key what do
//   // if (value === "") {
//   //   document.getElementById("verification").innerHTML = "No Private Key Supplied";
//   //   return;
//   // }

//   // console.log('Current value variable: ' + value);
//   // const key = ec.keyFromPrivate(Buffer.from(value,'base64').toString('hex'), 'hex')
//   // const key = ec.keyFromPrivate(value);
//   // console.log('Public Key generated from private key is: ' + key);
//   console.log('I spy a private kye!');
//   // var msg = [0, 1, 2, 3]; // message to sign for verification purposes
//   // var signature = key.sign(msg); // doesn't work because it is not a key.
//   // var derSign = signature.toDER();
//   console.log("this works")

// }
// );

// document.getElementById("verify-ownership").addEventListener('click', () => {
//   // take input from text box which is supposedly private key and authenticate that here against the private key, return to a visible field that yes indeed verified and only be able to send from the other buttons if you are verified otherwise say 'not verified' and don't let balance be sent.
//   const private_key = document.getElementById("private-key").value;

// });



// code for balance checker, on the input box of your address
// takes the element, adds an even listener on input
// if value is null or empty return 0
// otherwise fetch the server balance based on 'value' variable being the input in the box
// then return response.json
// then pass that in as an object called balance and send that into the inner HTML of the balance div with id 'balance'.
document.getElementById("exchange-address").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  };

  fetch(`${server}/balance/${value}`).then((response) => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});


// code for transfer
// on click set up sender, amount and recipient variables
// send to an object called body which then is stringified to be sent as JSON 
// send a POST request to server with body
// fetch a response and pass it into the balance div inner html to update the balance.


document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;

  const body = JSON.stringify({
    sender, amount, recipient
  });

  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});
