/* Hash Table */
// key - value pair

/*
A hash table (also called a hash, hash map, unordered map or dictionary) is a data structure that pairs keys to values.
 Its a technique to convert a range of key values into a range of indexes of an array.
 Its used to implement an associative array, a structure that can map keys to values.
 A Hash Table uses a hash function to compute an index into an array of buckets or slots,
 from which the desired value can be found.
 */

/*
When two keys hash into the same value, like the one in HashTableGraph01.jpg, one way to handle it is to
store both value into the hash index as array. And you will need to loop through this array to find the item.
e.g. [[key: key1, value: value1], [key: key2, value: value2]]
 */

// max is the maximum number of buckets that we are going to stored in the hash table
// e.g. if max is 5, hash % max is the remainder of the function so it will return 0,1,2,3,4
let hash = (string, max) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash += string.charCodeAt(i);
    }
    return hash % max;
};

let HashTable = function() {

    let storage = [];
    // const storageLimit = 4;
    const storageLimit = 14;

    this.print = function() {
        console.log(storage)
    };

    this.add = function(key, value) {
        let index = hash(key, storageLimit);

        // if the storage bucket is empty
        if (storage[index] === undefined) {
            storage[index] = [
                [key, value]
            ];
        } else {
            // if the storage bucket is not empty
            let inserted = false;
            // check if the key already in the array stored in this bucket.
            for (let i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    // if key is found, set the new value.
                    storage[index][i][1] = value;
                    inserted = true;
                }
            }
            // if key is not in the array stored in the bucket.
            if (inserted === false) {
                storage[index].push([key, value]);
            }
        }
    };

    this.remove = function(key) {
        let index = hash(key, storageLimit);
        if (storage[index].length === 1 && storage[index][0][0] === key) {
            delete storage[index];
        } else {
            for (let i = 0; i < storage[index].length; i++) {
                // [0] index is the key , and [1] index is the value.
                if (storage[index][i][0] === key) {
                    delete storage[index][i];
                }
            }
        }
    };

    this.lookup = function(key) {
        let index = hash(key, storageLimit);
        if (storage[index] === undefined) {
            return undefined;
        } else {
            for (let i = 0; i < storage[index].length; i++) {
                if (storage[index][i][0] === key) {
                    return storage[index][i][1];
                }
            }
        }
    };

};

// hash always return a number between 0 - 9
console.log("hash('beau', 10)=", hash('beau', 10));
console.log("hash('quincy', 10)=", hash('quincy', 10));

let ht = new HashTable();
ht.add('beau', 'person');
ht.add('fido', 'dog');
ht.add('rex', 'dinosour');
ht.add('tux', 'penguin');
console.log("ht.lookup('tux')=", ht.lookup('tux'));

/*
if storeLimit is set to 4, ht.print() will show:
[ <1 empty item>,
  [ [ 'beau', 'person' ], [ 'tux', 'penguin' ] ],
  [ [ 'fido', 'dog' ] ],
  [ [ 'rex', 'dinosour' ] ] ]

 */


// 3+1+3+1+4+1+1 = 14 === storagelimit
console.log('ht.print();'); ht.print();
