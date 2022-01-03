// imports
import "./index.scss";
const server = "http://localhost:3042";
import { Buffer } from 'buffer';
const EC = require('elliptic').ec;
const SHA256 = require('crypto-js/sha256');
const ec = new EC('secp256k1');

function signMessage(rawPrivateKey) {
  const ec = new EC('secp256k1');
  let keyPair = ec.keyFromPrivate(Buffer.from(rawPrivateKey,'base64').toString('hex'), 'hex');
  let privKey = keyPair.getPrivate("hex");
  let pubKey = keyPair.getPublic();
  let key = ec.keyFromPublic(pubKey.encode('hex'), 'hex'); 
  let msg = [ 0, 1, 2, 3 ];
  let signature = ec.sign(msg, privKey, "hex", {canonical: true});

  // var pubKeyHash = SHA256(pubKey).toString(); // console.log(`Private key: ${privKey}`);
  // console.log("Public key:", pubKey.encode("hex").substr(2));
  // console.log("Public key (compressed):",
  //             pubKey.encodeCompressed("hex"));
  // console.log(`Msg hash: ${msg}`);
  // console.log("Signature:", signature);

  let derSign = signature.toDER();
  console.log('Signature verification status: (Client Side)' + key.verify(msg, derSign));
  return signature;
};

document.getElementById("private-key").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("verification").innerHTML = "No Private Key Supplied";
    return;
  } else {
    document.getElementById("verification").innerHTML = "Key Recieved, Ready to Attempt to Transfer";
  }
});

document.getElementById("exchange-address").addEventListener('input', ({ target: {value} }) => {
  if(value === "") {
    document.getElementById("balance").innerHTML = 0;
    return;
  }
  fetch(`${server}/balance/${value}`).then((response) => {
    return response.json();
  }).then(({ balance }) => {
    document.getElementById("balance").innerHTML = balance;
  });
});

document.getElementById("transfer-amount").addEventListener('click', () => {
  const sender = document.getElementById("exchange-address").value;
  const amount = document.getElementById("send-amount").value;
  const recipient = document.getElementById("recipient").value;
  const rawPrivateKey = document.getElementById("private-key").value;
  const signature = signMessage(rawPrivateKey);

  // also sending variable signature
  const body = JSON.stringify({
    sender, amount, recipient, signature
  });

  const request = new Request(`${server}/send`, { method: 'POST', body });

  fetch(request, { headers: { 'Content-Type': 'application/json' }}).then(response => {
    return response.json();
  }).then(({ balance, verificationStatus }) => {
    document.getElementById("balance").innerHTML = balance;
    if(verificationStatus){
      document.getElementById("verification").innerHTML = "Key Verified, Transaction Sent Successfully";
    } else {
      document.getElementById("verification").innerHTML = "Key Incorrect! Are you up to some mischief?";
    }
  });
});