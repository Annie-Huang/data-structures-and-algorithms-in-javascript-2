/* Trie Data Structure */
/*
 If you look at Trie.jpg, it contains the following words:
 myTrie.print()= [ 'ball', 'bat', 'doll', 'dork', 'dorm', 'do', 'send', 'sense' ]

 You can check whether the word is the dictionary much quicker in a Trie structure than other structure.
*/


let Node = function() {
    // contains key-value pairs, like an object
    // E.g. in Trie.jpg, in the root node, the keys are: b,d,s.
    // consider the key as a folder, and the value is the folder content, which is the child holding within that node.
    this.keys = new Map();
    // This end is to signal whether this is the end of the word.
    this.end = false;
    this.setEnd = function() {
        this.end = true;
    };
    this.isEnd = function() {
        return this.end;
    };
};

let Trie = function() {

    this.root = new Node();

    this.add = function(input, node = this.root) {
        if (input.length === 0) {
            node.setEnd();
            return;
        } else if (!node.keys.has(input[0])) {
            node.keys.set(input[0], new Node());
            return this.add(input.substr(1), node.keys.get(input[0]));
        } else {
            return this.add(input.substr(1), node.keys.get(input[0]));
        }
    };

    // isWord is checking whether the word is added into the Trie. It is by no means checking whether
    // the words grammar is correct.
    this.isWord = function(word) {
        let node = this.root;
        while (word.length > 1) {
            if (!node.keys.has(word[0])) {
                return false;
            } else {
                node = node.keys.get(word[0]);
                word = word.substr(1);
            }
        }
        return node.keys.has(word) && node.keys.get(word).isEnd() ? true : false;
    };

    this.print = function() {
        let words = [];
        let search = function(node, string) {
            if (node.keys.size !== 0) {
                for (let letter of node.keys.keys()) {
                    search(node.keys.get(letter), string.concat(letter)); // add the letter to the string.
                }
                if (node.isEnd()) {
                    // push to the words array.
                    words.push(string);
                }
            } else {
                // when node.keys.size == 0;
                string.length > 0 ? words.push(string) : undefined;
            }
        };
        search(this.root, new String());
        return words.length > 0 ? words : null;
    };

};

myTrie = new Trie();
// This is assuming all the words you added are correct words.
myTrie.add('ball');
myTrie.add('bat');
myTrie.add('doll');
myTrie.add('dork');
myTrie.add('do');
myTrie.add('dorm');
myTrie.add('send');
myTrie.add('sense');
console.log('myTrie.isWord(\'doll\')=', myTrie.isWord('doll'));
console.log('myTrie.isWord(\'dor\')=', myTrie.isWord('dor'));
console.log('myTrie.isWord(\'dorf\')=', myTrie.isWord('dorf')); // this dorf path does not exist.
console.log('myTrie.print()=', myTrie.print());
