/* Stacks! */
// first one, last out.

// functions: push, pop, peek, length

let letters = []; // this is our stack

let word = "racecar";
// let word = "freeCodeCamp";

let rword = "";

// put letters of word into stack
for (let i = 0; i < word.length; i++) {
    letters.push(word[i]);
}

// pop off the stack in reverse order
for (let i = 0; i < word.length; i++) {
    rword += letters.pop();
}

console.log('Palindrome is a word, phrase, or sequence that reads the same backwards as forwards, e.g. madam');

if (rword === word) {
    console.log(word + " is a palindrome.");
} else {
    console.log(word + " is not a palindrome.");
}



// Creates a stack
let Stack = function() {
    this.count = 0;
    this.storage = {};

    // Adds a value onto the end of the stack
    this.push = function(value) {
        this.storage[this.count] = value;
        this.count++;
    };

    // Removes and returns the value at the end of the stack
    this.pop = function() {
        if (this.count === 0) {
            return undefined;
        }

        this.count--;
        let result = this.storage[this.count];
        delete this.storage[this.count];
        return result;
    };

    this.size = function() {
        return this.count;
    };

    // Returns the value at the end of the stack
    this.peek = function() {
        return this.storage[this.count-1];
    }
};

let myStack = new Stack();

myStack.push(1);
myStack.push(2);
console.log('1. myStack=', myStack);

console.log('myStack.peek()=', myStack.peek());
console.log('2. myStack=', myStack);

console.log('myStack.pop()=', myStack.pop());
console.log('3. myStack=', myStack);


console.log('myStack.peek()=', myStack.peek());
console.log('4. myStack=', myStack);

myStack.push("freeCodeCamp");
console.log('5. myStack=', myStack);

console.log('myStack.size()=', myStack.size());
console.log('myStack.peek()=', myStack.peek());
console.log('6. myStack=', myStack);

console.log('myStack.pop()=', myStack.pop());
console.log('7. myStack=', myStack);

console.log('myStack.peek()=', myStack.peek());
console.log('8. myStack=', myStack);
