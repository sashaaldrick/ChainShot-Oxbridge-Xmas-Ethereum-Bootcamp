class MerkleTree {
    constructor(leaves, concat) {
        // leaves: an inputArray of leaf nodes
        // a combination function used to concatenate and hash two leaves together
        this.leaves = leaves;
        this.concat = concat;
        
    }
    getRoot() {
        // generalising to 1, 2, 4 and 8 leaf nodes

        if(this.leaves.length == 1) {
            console.log('base case, no hashing required');
            return this.leaves;
        } else {
            var lengthCounter = 2; // any value to get the while loop started.
            let currentLeaves = this.leaves;
            while(lengthCounter!= 1) {
                var arrayOfHashes = hashLayer(currentLeaves, this.concat);
                currentLeaves = arrayOfHashes;
                lengthCounter = arrayOfHashes.length;
            }
            return arrayOfHashes[0].toString();
        }

        function hashLayer(leaves, concat) {
            let arrayOfHashes = []; 
            if (leaves.length % 2 == 1) {
                // odd number of leaves
                console.log("We're in an odd situation... ba dum tss");
                let individualTrees = sortArray(leaves); // makes arrays of trees
                let individualTreeHashes = []; // storing arrays of hashes of trees
                
                // cycling through individual tree and hashing those
                for(let i = 0; i < individualTrees.length; i++) {
                    if(individualTrees[i].length != 1) {
                        console.log('individualTrees[' + i + ']: ' + individualTrees[i]);
                        let result = hashForward(individualTrees[i], concat);
                        console.log('result: ' + result);
                        individualTreeHashes.push(result);
                    } else { // if it does equal 1
                        individualTreeHashes.push(individualTrees[i]);
                        console.log('individualTrees[' + i + ']: ' + individualTrees[i]);
                    }
                }

                // hashing within the individual trees
                for(let i = 0; i < individualTreeHashes.length; i++) {
                    if (i + 1 < individualTreeHashes.length && individualTreeHashes[i].length && individualTrees[i+1].length == 1 && individualTrees[i+1].includes("Hash") == false) {
                        //combine those badboys
                        console.log('COMBINATION REQUIRED BITCHES');
                        console.log('individualTreeHashes[i]: ' + individualTreeHashes[i]);
                        console.log('individualTreeHashes[i+1]: ' + individualTreeHashes[i+1]);
                        individualTreeHashes[i] = concat(individualTreeHashes[i], individualTreeHashes[i+1]);
                        console.log('new ith[i]' + individualTreeHashes[i]);

                        
                    }

                    // if(individualTreeHashes[i].length != 1) {
                    //     for(let j = 0; j < individualTreeHashes[i].length; j++) {
                    //         individualTreeHashes[i] = [concat(individualTreeHashes[i][j], individualTreeHashes[i][j + 1])];
                    //     }
                    // } 
                }

                for(let i = 0; i < individualTreeHashes.length; i++) {
                    console.log('individualTreeHashes[', i, ']:' + individualTreeHashes[i]);
                }

                let finalArray = [];
                //need to take individualTreeHashes and hash properly just like before, perhaps recursion with hashLayer???
                finalArray = hashLayer(individualTreeHashes, concat);
                // not quite because last hash needs to hash with E + F and not the whole previous hash
                return finalArray;

            } else {
                // not odd amount of leaves
               arrayOfHashes = hashForward(leaves, concat);
            //    console.log('arrayOfHashes: ' + arrayOfHashes);
               return arrayOfHashes;
            }

            function hashForward(leaves, concat) {
                arrayOfHashes = []  ;
                for (let i = 0; i < leaves.length; i++) {
                    if (((i + 1) % 2) == 1) { // we're at an index to hash from
                        let currentHash = concat(leaves[i], leaves[i + 1]);
                        arrayOfHashes.push(currentHash);
                    }
                }
                return arrayOfHashes;
            }
        }; 

        function sortArray(inputArray) {
            let log2result = getBaseLog(2, inputArray.length);
            if (Number.isInteger(log2result)) {
                return inputArray;
            } else { // number is not a power of two
                // gonna have to sort those powers of two aren't we
                let individualTrees = [];
                while (inputArray.length != 1) {
                    let closestTwo = closestPowerOfTwo(inputArray.length);
                    let splicedArray = inputArray.splice(0, closestTwo);
                    individualTrees.push(splicedArray);
                }
                individualTrees.push(inputArray);
                
                for(let i = 0; i < individualTrees.length; i++) {
                    console.log('individualTrees[', i, ']:' + individualTrees[i]);
                }
                return individualTrees;
            }

        }

        function closestPowerOfTwo(number) {
            return Math.pow(2,Math.floor(Math.log(number)/Math.log(2)));
        }

        function getBaseLog(x, y) {
            return Math.log(y) / Math.log(x);
        }
    } // getRoot() function
} // MerkleTree

module.exports = MerkleTree;


// expected answer: Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + G))
// result: 'Hash(Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(E + F)) + G)'

const concat = (a, b) => `Hash(${a} + ${b})`;

leaves1 = ['A']; // 1
leaves2 = ['A', 'B']; // 2
oddLeaves1 = ['A', 'B', 'C'];  // 3
leaves3 = ['A', 'B', 'C', 'D']; // 4
oddLeaves2 = ['A', 'B', 'C', 'D', 'E']; // 5
oddLeaves3 = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // 7
leaves4 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // 8
leaves5 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']; // 16

// const tree1 = new MerkleTree(leaves1, concat);
// const tree2 = new MerkleTree(leaves2, concat);
// even case for consistency
// const tree3 = new MerkleTree(leaves3, concat); // 4

// odd test cases
// const oddTree1 = new MerkleTree(oddLeaves1, concat); // 3
// const oddTree2 = new MerkleTree(oddLeaves2, concat); // 5
const oddTree3 = new MerkleTree(oddLeaves3, concat); // 7
// const tree4 = new MerkleTree(leaves4, concat);
// const tree5 = new MerkleTree(leaves5, concat);

// console.log('leaves: ' + leaves1);
// console.log(tree1.getRoot());
// console.log('leaves: ' + leaves2);
// console.log(tree2.getRoot());
// Even Tree(s)
// console.log('Even Case(s): ');
// console.log('leaves: ' + leaves3);
// console.log(tree3.getRoot());

// Odd Trees
// console.log(oddTree1.getRoot());
// console.log('oddLeaves2:' + oddLeaves2);
// console.log(oddTree2.getRoot());
// console.log('oddLeaves3:' + oddLeaves3);
console.log(oddTree3.getRoot());
// console.log(tree4.getRoot());
// console.log('leaves: ' + leaves5);
// console.log(tree5.getRoot());

