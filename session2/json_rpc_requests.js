const provider = require('./provider');

async function getTotalBalance(addresses) {

    // create an array of requests
    var requestsArray = [];
    for (let i = 0; i < addresses.length; i++) {
        const request = {
            jsonrpc: "2.0",
            id: i,
            method: "eth_getBalance",
            params: [addresses[i]]
        }
        requestsArray[i] = request;
    }
    
    // send all requests in one HTTP call

    const responses = await provider.send(requestsArray);

    // return the total balance of all the addresses summed
    
    var sumOfBalances = 0;
    for (let i = 0; i < responses.length; i++) {
        var decimalBalanceValue = (parseInt(responses[i].result, 16));
        sumOfBalances += decimalBalanceValue;
    }

    return sumOfBalances;
    
}

module.exports = getTotalBalance;