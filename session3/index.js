const axios = require('axios');
var ethers = require('ethers');

// copy-paste your URL from Alchemy
const ALCHEMY_URL = "https://eth-mainnet.alchemyapi.io/v2/eGwSv1B8PnF3ulBOJlu3g0N3M-Q_RV2J";

axios.post(ALCHEMY_URL, {
  jsonrpc: "2.0",
  method: "eth_getTransactionCount",
  params: [
    '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth registration wallet
    'latest'
  ],
  id: 1
}).then((response) => {
  let hexaResponse = response.data.result.toString();
  var bigNumberResponse = ethers.BigNumber.from(hexaResponse)
  console.log(bigNumberResponse.toString());
});
