/* Heaps */
/*
Heaps is a binary search tree that satisfy the heap property. Each node has at most 2 child nodes
E.g A Max Heap has all parent nodes that are greater than child nodes.
    A Min Heap has all parent nodes that are smaller than child nodes.
    The order of the child nodes is not matters when they are in the same level,
    e.g. in Heaps01.jpg, 5,6,1 are in the same level for Max Heap, and 10, 6, 12 are in the same level for Min Heap

    Also all levels are fully filled except for the last level (Tree Representation in Heaps01.jpg).
    If the last level is partially filled, it has to be filled from left to right.
 */

// Position of the child/parent node from the current node in the Array Representation.
// left child: i * 2
// right child: i * 2 + 1
// parent: Math.floor(i / 2)

let MinHeap = function() {

    let heap = [null];

    // When you insert, it is going to build one level of tree each time.
    this.insert = function(num) {
        heap.push(num);
        if (heap.length > 2) {
            let idx = heap.length - 1;
            while (heap[idx] < heap[Math.floor(idx/2)]) {
                if (idx >= 1) {
                    [heap[Math.floor(idx/2)], heap[idx]] = [heap[idx], heap[Math.floor(idx/2)]];
                    if (Math.floor(idx/2) > 1) {
                        idx = Math.floor(idx/2);
                    } else {
                        break;
                    }
                }
            }
        }
    };

    this.remove = function() {
        let smallest = heap[1];
        if (heap.length > 2) {
            heap[1] = heap[heap.length - 1];
            heap.splice(heap.length - 1);
            if (heap.length == 3) {
                if (heap[1] > heap[2]) {
                    [heap[1], heap[2]] = [heap[2], heap[1]];
                }
                return smallest;
            }
            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;
            while (heap[i] >= heap[left] || heap[i] >= heap[right]) {
                if (heap[left] < heap[right]) {
                    [heap[i], heap[left]] = [heap[left], heap[i]];
                    i = 2 * i
                } else {
                    [heap[i], heap[right]] = [heap[right], heap[i]];
                    i = 2 * i + 1;
                };
                left = 2 * i;
                right = 2 * i + 1;
                if (heap[left] == undefined || heap[right] == undefined) {
                    break;
                }
            }
        } else if (heap.length === 2) {
            heap.splice(1, 1);
        } else {
            return null;
        }
        return smallest;
    };

    this.sort = function() {
        let result = new Array();
        while (heap.length > 1) {
            result.push(this.remove());
        }
        return result;
    };

};

let MaxHeap = function() {

    let heap = [null];

    this.print = () => heap;

    this.insert = function(num) {
        heap.push(num);
        if (heap.length > 2) {
            let idx = heap.length - 1;
            while (heap[idx] > heap[Math.floor(idx/2)]) {
                if (idx >= 1) {
                    [heap[Math.floor(idx/2)], heap[idx]] = [heap[idx], heap[Math.floor(idx/2)]];
                    if (Math.floor(idx/2) > 1) {
                        idx = Math.floor(idx/2);
                    } else {
                        break;
                    }
                }
            }
        }
    };

    this.remove = function() {
        let smallest = heap[1];
        if (heap.length > 2) {
            heap[1] = heap[heap.length - 1];
            heap.splice(heap.length - 1);
            if (heap.length == 3) {
                if (heap[1] < heap[2]) {
                    [heap[1], heap[2]] = [heap[2], heap[1]];
                }
                return smallest;
            }
            let i = 1;
            let left = 2 * i;
            let right = 2 * i + 1;
            while (heap[i] <= heap[left] || heap[i] <= heap[right]) {
                if (heap[left] > heap[right]) {
                    [heap[i], heap[left]] = [heap[left], heap[i]];
                    i = 2 * i
                } else {
                    [heap[i], heap[right]] = [heap[right], heap[i]];
                    i = 2 * i + 1;
                }
                left = 2 * i;
                right = 2 * i + 1;
                if (heap[left] == undefined || heap[right] == undefined) {
                    break;
                }
            }
        } else if (heap.length == 2) {
            heap.splice(1, 1);
        } else {
            return null;
        }
        return smallest;
    };

};

// You will need to see the movement from the tree in https://www.cs.usfca.edu/~galles/visualization/Heap.html
// I seriously double you will need to code this structure in a algorithm coding exam....
