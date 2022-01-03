const SHA256 = require('crypto-js/sha256');
const TARGET_DIFFICULTY = BigInt(0x0ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
const MAX_TRANSACTIONS = 10;

const mempool = [];
const blocks = [];

function addTransaction(transaction) {
    mempool.unshift(transaction) // adds current transaction to the top of the array
}

function mine() {
    // TODO: mine a block
    // console.log(TARGET_DIFFICULTY)
    let transactions = [];
    for (let i = 0; i < MAX_TRANSACTIONS; i++) {
        if (mempool.length > 0) {
            transactions.push(mempool.pop()); // will pop last element off and push transaction the end of transactions array
        };
    };
    // need to implement a loop that starts a nonce at 0, tries the hash, compares the hash
    // to the difficulty
    const block = { // creates a block object
        id: blocks.length, // with property id: length of blocks array (block height)
        transactions: transactions, // add transactions array
        nonce: 0 // starter nonce
    };
    const hash = SHA256(JSON.stringify(block)); // creating a immutable variable of the hash of the current block
    const hash_string = hash.toString();
    const hash_int =  BigInt(`0x${hash}`); // converting hash to BigInt (just a huge number equal to the decimal value of the hexadecimal hash)
    // these have to be calculated for first comparison

    var lowerHash = false;
    while (lowerHash == false) {
        if (hash_int < TARGET_DIFFICULTY) {
            // congrats you won a block
            blocks.push({ ...block, hash }); // push block
            console.log('you won!');
            var lowerHash = true; // break from while loop
        } else {
            console.log('Hash still lower, incrementing hash');
            block.nonce += 1;
            console.log('Block nonce increasing to ' + block.nonce);
            const hash = SHA256(JSON.stringify(block)); // new hash
            const hash_int = BigInt(`0x${hash}`); // new BigInt value
            console.log('Hash value equal to: ' + hash_int);
            console.log('Target difficulty equal to: ' + TARGET_DIFFICULTY);
            var lowerHash = false; // still while loop so go back to the beginning
        };
    };
};

for (let i = 0; i < 5; i++) {
    addTransaction({ sender: 'bob', to: 'alice' });
    console.log('added transaction');
};

mine();



module.exports = {
    TARGET_DIFFICULTY,
    MAX_TRANSACTIONS,
    addTransaction, 
    mine, 
    blocks,
    mempool
};