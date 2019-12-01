/* Binary Search Tree */

class Node {
    constructor(data, left = null, right = null) {
        this.data = data;
        this.left = left;
        this.right = right;
    }
}

class BST {
    constructor() {
        this.root = null;
    }
    add(data) {
        const node = this.root;
        if (node === null) {
            this.root = new Node(data);
            return;
        } else {
            const searchTree = function(node) {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        return searchTree(node.left);
                    }
                } else if (data > node.data) {
                    if (node.right === null) {
                        node.right = new Node(data);
                        return;
                    } else if (node.right !== null) {
                        return searchTree(node.right);
                    }
                } else {
                    return null;
                }
            };
            return searchTree(node);
        }
    }
    findMin() {
        let current = this.root;
        while (current.left !== null) {
            current = current.left;
        }
        return current.data;
    }
    findMax() {
        let current = this.root;
        while (current.right !== null) {
            current = current.right;
        }
        return current.data;
    }
    find(data) {
        let current = this.root;
        while (current.data !== data) {
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current === null) {
                return null;
            }
        }
        return current;
    }
    isPresent(data) {
        let current = this.root;
        while (current) {
            if (data === current.data) {
                return true;
            }
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            }
        }
        return false;
    }
    // I think this one is a bit hard to understand....
    remove(data) {
        const removeNode = function(node, data) {
            if (node == null) {
                return null;
            }
            if (data == node.data) {
                // node has no children
                if (node.left == null && node.right == null) {
                    // This is setting the reference to the node to null.
                    // Remember it's called like this: this.root = removeNode(this.root, data);
                    return null;
                }
                // node has no left child
                if (node.left == null) {
                    // This is like BinraryTreeGraph01.jpg
                    // When we want to delete node 54, we replace it with node 67.
                    return node.right;
                }
                // node has no right child
                if (node.right == null) {
                    return node.left;
                }
                // node has two children
                /*
                   This is like BinraryTreeGraph01.jpg
                   When you want to delete node 3, you need to take node 4 out and replace it in node 3's position.
                   Basically you will need to go right first, and then go the most left node from that right node.
                   And take the most left node to replace it with the node you want to delete.
                 */
                let tempNode = node.right;
                while (tempNode.left !== null) {
                    tempNode = tempNode.left;
                }
                node.data = tempNode.data; // replace value from 3 to 4.
                node.right = removeNode(node.right, tempNode.data);
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            }
        };
        // You either return a node or return a null in removeNode method.
        this.root = removeNode(this.root, data);
    }


    /*
        If you look at BinraryTreeGraph02.jpg, node 9 is level 0, and node 5,7,20 is level 3.
     */

    // It is balanced if the different between minHeight and maxHeight is 0 or 1.
    // If a tree is balance, search will be the most efficient. There is ways to automatically adjust
    // the tree to ba balanced when insert/remove node. But we will not cover in here...
    isBalanced() {
        return (this.findMinHeight() >= this.findMaxHeight() - 1)
    }
    // This minHeight the levels from root to the first node that is without two children.
    // E.g. in BinraryTreeGraph02.jpg, node 17 is the node without two children.
    // If you don't pass a node, it is going to set the root node to node.
    findMinHeight(node = this.root) {
        if (node == null) {
            return -1;
        }
        let left = this.findMinHeight(node.left);
        let right = this.findMinHeight(node.right);
        // I don't quite understand what is this if conditional chec is,
        // is it checking the node value or the node level?
        if (left < right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }
    // This minHeight the levels from root to the most bottom node.
    // E.g. in BinraryTreeGraph02.jpg, the most bottom ones are node 5, 7, 20.
    findMaxHeight(node = this.root) {
        if (node == null) {
            return -1;
        }
        let left = this.findMaxHeight(node.left);
        let right = this.findMaxHeight(node.right);
        if (left > right) {
            return left + 1;
        } else {
            return right + 1;
        }
    }
    // Search the tree start from the left most node to the right most node.
    // left child -> parent -> right child
    // In BinraryTreeGraph02.jpg, it is inOrder: 3,4,5,6,7,9,10,17,20,22
    inOrder() {
        if (this.root == null) {
            return null;
        } else {
            let result = new Array();
            function traverseInOrder(node) {
                // Only the order of these three lines are different between inOrder, preOrder, postOrder.
                node.left && traverseInOrder(node.left);
                result.push(node.data);
                node.right && traverseInOrder(node.right);
            }
            traverseInOrder(this.root);
            return result;
        }
    }
    // In preOrder, you are going to explore the root node first before the leaves node.
    // parent -> left child -> right child
    // In BinraryTreeGraph02.jpg, it is preOrder: 9,4,3,6,5,7,17,10,22,20
    preOrder() {
        if (this.root == null) {
            return null;
        } else {
            let result = new Array();
            function traversePreOrder(node) {
                result.push(node.data);
                node.left && traversePreOrder(node.left);
                node.right && traversePreOrder(node.right);
            }
            traversePreOrder(this.root);
            return result;
        }
    }
    // In postOrder, you are going to explore the leaves node first before the root node.
    // left child -> right child -> parent
    // In BinraryTreeGraph02.jpg, it is postOrder: 3,5,7,6,4,10,20,22,17,9
    postOrder() {
        if (this.root == null) {
            return null;
        } else {
            let result = new Array();
            function traversePostOrder(node) {
                node.left && traversePostOrder(node.left);
                node.right && traversePostOrder(node.right);
                result.push(node.data);
            }
            traversePostOrder(this.root);
            return result;
        }
    }
    // In levelOrder, you are going to explore the levels one by one. It is also called breath first search.
    // Level0 -> Level1 -> Level2
    // In BinraryTreeGraph02.jpg, it is levelOrder: 9,4,17,3,6,10,22,5,7,20
    levelOrder() {
        let result = [];
        let Q = [];
        if (this.root != null) {
            Q.push(this.root);
            while(Q.length > 0) {
                let node = Q.shift();
                result.push(node.data);
                if (node.left != null) {
                    Q.push(node.left);
                }
                if (node.right != null) {
                    Q.push(node.right);
                }
            }
            return result;
        } else {
            return null;
        }
    };
}

const bst = new BST();
bst.add(4);
bst.add(2);
bst.add(6);
bst.add(1);
bst.add(3);
bst.add(5);
bst.add(7);
bst.remove(4);

console.log('bst.findMin()=', bst.findMin());
console.log('bst.findMax()=', bst.findMax());
console.log('bst.remove(7);'); bst.remove(7);
console.log('bst.findMax()=', bst.findMax());
console.log('bst.isPresent(4)=', bst.isPresent(4));


console.log('-----------------------');

const bst1 = new BST();
// This initial tree is like BinraryTreeGraph02.jpg
bst1.add(9);
bst1.add(4);
bst1.add(17);
bst1.add(3);
bst1.add(6);
bst1.add(22);
bst1.add(5);
bst1.add(7);
bst1.add(20);

console.log('bst1.findMinHeight()=', bst1.findMinHeight());
console.log('bst1.findMaxHeight()=', bst1.findMaxHeight());
console.log('bst1.isBalanced()=', bst1.isBalanced());

// In BinraryTreeGraph02.jpg, node 10 will be inserted into the left child of node 17
console.log('bst1.add(10);'); bst1.add(10);

console.log('bst1.findMinHeight()=', bst1.findMinHeight());
console.log('bst1.findMaxHeight()=', bst1.findMaxHeight());
console.log('bst1.isBalanced()=', bst1.isBalanced());

console.log('inOrder: ' + bst1.inOrder());
console.log('preOrder: ' + bst1.preOrder());
console.log('postOrder: ' + bst1.postOrder());

console.log('levelOrder: ' + bst1.levelOrder());
