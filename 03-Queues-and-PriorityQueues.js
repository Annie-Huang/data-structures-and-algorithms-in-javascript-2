/* Queues */
// first in, first out.

function Queue () {
    let collection = [];
    this.print = function() {
        console.log(collection);
    };
    this.enqueue = function(element) {
        collection.push(element);
    };
    this.dequeue = function() {
        return collection.shift();
    };
    this.front = function() {
        return collection[0];
    };
    this.size = function() {
        return collection.length;
    };
    this.isEmpty = function() {
        return (collection.length === 0);
    };
}

let q = new Queue();
q.enqueue('a');
q.enqueue('b');
q.enqueue('c');
console.log('q.print()=');  q.print();
console.log('q.dequeue();');  q.dequeue();
console.log('q.front()=', q.front());
console.log('q.print()=');  q.print();


// priority is the second element. e.g. ['Beau Carnes', 2]
// Item with the same priority got put into the queue as the order they come in.
function PriorityQueue () {
    let collection = [];
    this.printCollection = function() {
        (console.log(collection));
    };
    this.enqueue = function(element){
        if (this.isEmpty()){
            collection.push(element);
        } else {
            let added = false;
            for (let i=0; i<collection.length; i++){
                if (element[1] < collection[i][1]){ //checking priorities
                    collection.splice(i,0,element);
                    added = true;
                    break;
                }
            }
            if (!added){
                collection.push(element);
            }
        }
    };
    this.dequeue = function() {
        let value = collection.shift();
        return value[0];
    };
    this.front = function() {
        return collection[0];
    };
    this.size = function() {
        return collection.length;
    };
    this.isEmpty = function() {
        return (collection.length === 0);
    };
}

let pq = new PriorityQueue();
pq.enqueue(['Beau Carnes', 2]);
pq.printCollection();

pq.enqueue(['Quincy Larson', 3]);
pq.printCollection();

pq.enqueue(['Ewa Mitulska-Wójcik', 1]);
pq.printCollection();

pq.enqueue(['Briana Swift', 2]);
pq.printCollection();

console.log('pq.dequeue();'); pq.dequeue();
console.log('pq.front()=', pq.front());
pq.printCollection();
