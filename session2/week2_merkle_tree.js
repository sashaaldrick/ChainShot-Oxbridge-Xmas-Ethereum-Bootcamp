// const SHA256 = require('crypto-js/sha256');
// const hash = SHA256(JSON.stringify(block)); 
// const hash = hash.toString();

// right, here is a proper implementation in 10 lines of code that
class MerkleTree {
   constructor(leaves, concat) {
       this.leaves = leaves;
       this.concat = concat;
       this.root = []; // blank array which store the leaves and the layers above it, with the right most side the leaves
       this.init = function() {
        this.root.unshift(this.leaves);
        while(this.root[0].length > 1) {
            let temp = [];
            // cycling through topmost layer every two and hashing together, if last item alone send by itself up the layer
            for (let index = 0; index < this.root[0].length; index += 2) {
                if (index < this.root[0].length - 1 && index % 2 == 0) {
                    temp.push(this.concat(this.root[0][index], this.root[0][index + 1]));
                } else temp.push(this.root[0][index]);
            }
            //send hashed layer stored in temp to topmost layer in root
            this.root.unshift(temp);
        }
        // return the root hash
        return this.root[0];
       }

       this.init(); // initialize the getRoot state to allow for an allowed this.root without explicitly calling the getRoot function. seems like a useful feature of a new instance of a MerkleTree.

   }

    // getRoot() { 
    //     this.root.unshift(this.leaves);

    //     while(this.root[0].length > 1) {
    //         let temp = [];
    //         // cycling through topmost layer every two and hashing together, if last item alone send by itself up the layer
    //         for (let index = 0; index < this.root[0].length; index += 2) {
    //             if (index < this.root[0].length - 1 && index % 2 == 0) {
    //                 temp.push(this.concat(this.root[0][index], this.root[0][index + 1]));
    //             } else temp.push(this.root[0][index]);
    //         }
    //         //send hashed layer stored in temp to topmost layer in root
    //         this.root.unshift(temp);
    //     }
    //     // return the root hash
    //     console.log('getRoot solution: ')
    //     return this.root[0];
    // }

    getProof(index) {
        // returns the proof array of objects with the hash data for the required objects and whether they are a left node or not
        // example proof for A in a 5 leaf tree:
        // [
        //     { data: 'D', left: false },
        //     { data: 'AB', left: true },
        //     { data: 'E', left: false }
        // ]
        // let leaf = this.root[this.root.length - 1][index];
        
        let merkleProof = [];
        for (let layer = this.root.length - 1; layer > 0; layer--) {
            // cycling through layers in tree
            if (index % 2 == 0 && index < this.root[layer].length - 1) {
                // if index is even, choose next node and set it as left: false as required.
                merkleProof.push({data: this.root[layer][index+1], left: false});
            } else if (index % 2 == 1 && index < this.root[layer].length - 1) { 
                // if index is odd, and not last node
                merkleProof.push({data: this.root[layer][index-1], left: true});
            } else if (index == this.root[layer].length - 1) {
                // last index in current layer
                if (layer == this.root.length - 1 || layer == 1 || layer == this.root.length - 2) {
                    // if layer is the leaf nodes, or the one below the root hash
                    if (this.root[layer].length % 2 == 0) {
                        //even length leaf array
                        merkleProof.push({data: this.root[layer][index-1], left: true}); 
                    }  // if odd, don't do anything
                }
            }
            index = Math.floor(index/2);
            }
        return merkleProof;
    }

    verifyProof(proof, node, root, concat) {
        // proof: result of getProof(), an array of objects whose properties are data and left.
        // node: the leaf node we are trying to prove is in the merkle tree.
        // root: the valid Merkle Root hash (i.e. this.root[0]).
        // concat: the method used to combine the leaf nodes.

        // take the node and hash it along the proof schema 
        // now you'll have a root from the node and the proof schema, compare it with the true root hash root and see if they match
        console.log('this.root: ' + this.root);
        let rootArray = [];
        for (let i = 0; i < proof.length; i++) {
            var result = proof[i]['left'] ? concat(proof[i]['data'], node) : concat(node, proof[i]['data']);
            rootArray.push(result);
            node = result;
        }
        let rootToCheck = rootArray.pop();
        console.log('rootToCheck: ' + rootToCheck);
        console.log('root: ' + root);
        if (rootToCheck === root) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = MerkleTree;

leaves1 = ['A']; // 1
leaves2 = ['A', 'B']; // 2
leaves3 = ['A', 'B', 'C'];  // 3
leaves4 = ['A', 'B', 'C', 'D']; // 4
leaves5 = ['A', 'B', 'C', 'D', 'E']; // 5
leaves7 = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // 7
leaves8 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']; // 8
leaves10 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']; // 10
leaves11 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']; // 11
leaves16 = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P']; // 16

const concat = (a, b) => `Hash(${a} + ${b})`;
const tree = new MerkleTree(leaves11, concat);
// console.log(tree.getRoot());
// console.log(tree.getProof(2));
const proof = tree.getProof(10);
console.log(proof);
const root = "Hash(Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";
// const root = "Hash(Hash(Hash(A + B) + Hash(C + D)) + E)";
// const node = 'C';
const node = 'K';
console.log(tree.verifyProof(proof, node, root, concat));



