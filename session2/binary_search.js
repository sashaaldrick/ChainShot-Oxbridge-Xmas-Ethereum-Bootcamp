class Tree {
    constructor() {
        this.root = null;
    }

    addNode(node) {
        if(this.root == null) {
            this.root = node; 
        } else {
            this.addToRoot(this.root, node);
        }
    }

    addToRoot(root, node) {
        if (node.data < root.data) {
            if (!root.left) {
                root.left = node;
            } else {
                this.addToRoot(root.left, node);
            }
        }

        if (node.data > root.data) {
            if (!root.right) {
                root.right = node;
            } else {
                this.addToRoot(root.right, node);
            }
        }
    }

    hasNode(number) {
        // search down from the root
        // if node value is equal to number, return True, else continue search
        // if number is not found in any nodes, return False
        var node = this.root; 
        var nextChosenNode = {};

        while (node !== null) {
            if (number < node.data) {
                nextChosenNode = node.left;
            } else if (number > node.data) {
                nextChosenNode = node.right;
            } else {
                // we found the number
                return true;
            }
            node = nextChosenNode;
        }
        // while loop has completed without finding any thing so the number is not there.
        return false;
    }
}

class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

module.exports = Tree;

const tree = new Tree();
const node1 = new Node(5);
const node2 = new Node(3);
const node3 = new Node(7);
const node4 = new Node(2);
const node5 = new Node(4);
const node6 = new Node(6);
const node7 = new Node(8);

tree.addNode(node1);
tree.addNode(node2);
tree.addNode(node3);
tree.addNode(node4);
tree.addNode(node5);
tree.addNode(node6);
tree.addNode(node7);

console.log('Traversing that tree!: ');
console.log(tree.hasNode(12));

// console.log(tree);

// console.log(tree.root.children[0]);