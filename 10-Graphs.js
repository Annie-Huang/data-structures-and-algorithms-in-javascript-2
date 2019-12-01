/* Graphs: Breadth-first search */

// Breadth first search
function bfs(graph, root) {
    // use to store the distance from the root node
    let nodesLen = {};

    for (let i = 0; i < graph.length; i++) {
        nodesLen[i] = Infinity;
    }
    nodesLen[root] = 0;

    let queue = [root];
    let current;

    while (queue.length !== 0) {
        current = queue.shift();

        let curConnected = graph[current];
        let neighborIdx = [];
        let idx = curConnected.indexOf(1);
        while (idx !== -1) {
            neighborIdx.push(idx);
            idx = curConnected.indexOf(1, idx + 1);
        }

        for (let j = 0; j < neighborIdx.length; j++) {
            if (nodesLen[neighborIdx[j]] === Infinity) {
                nodesLen[neighborIdx[j]] = nodesLen[current] + 1;
                queue.push(neighborIdx[j]);
            }
        }
    }
    return nodesLen;
}

// From Graphs07-CodingExample.jpg, you can see e.g. node 0 has connection with node 1,2,3
let exBFSGraph = [
    [0, 1, 1, 1, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0],
    [0, 1, 0, 0, 0]
];
// The following is to found out how far away every node is from the node 1.
console.log(bfs(exBFSGraph, 1));

/*
{
    '0': 2,     << from node1 to go to node 0, it is two steps away.
    '1': 0,
    '2': 1,     << from node1 to go to node 2, it is one steps away.
    '3': 3,     << from node1 to go to node 3, it is three steps away.
    '4': Infinity
}

 */
