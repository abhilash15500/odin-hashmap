class Hashmap {
  constructor(loadFactor, capacity, bucket) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bucket = new Array(capacity);
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const hashedIndex = this.hash(key);

    if (this.bucket[hashedIndex] === undefined) {
      let linkedList = new LinkedList();
      let node = new Node([key, value]);
      this.bucket[hashedIndex] = linkedList;
      linkedList.head = node;
    } else if (this.bucket[hashedIndex] !== undefined) {
      let tempVariable = this.bucket[hashedIndex].head;

      while (tempVariable !== null) {
        if (tempVariable.data.includes(key)) {
          tempVariable.data[1] = value;
          return;
        } else if (!tempVariable.data.includes(key)) {
          if (tempVariable.nextNode === null) {
            tempVariable.nextNode = new Node([key, value]);
            return;
          }
        }
        tempVariable = tempVariable.nextNode;
      }
    }
  }

  get(key) {
    const hashedIndex = this.hash(key);

    if (this.bucket[hashedIndex] === undefined) {
      return null;
    }
    let tempVariable = this.bucket[hashedIndex].head;

    let isElementFound = false;

    while (isElementFound === false) {
      if (tempVariable.data[0] === key) {
        isElementFound = true;
        return tempVariable.data[1];
      }
      tempVariable = tempVariable.nextNode;
    }
  }


  has(key) {
    const hashedIndex = this.hash(key);

    if (this.bucket[hashedIndex] === undefined) {
      return false;
    }
    let tempVariable = this.bucket[hashedIndex].head;
    let isElementFound = false;

    while (isElementFound === false) {
      if (tempVariable.data[0] === key) {
        isElementFound = true;
        return true;
      }
      tempVariable = tempVariable.nextNode;
    }

  }
}

class LinkedList {
  constructor(head = null) {
    this.head = head;
  }
}

class Node {
  constructor(data = null, nextNode = null) {
    this.data = data;
    this.nextNode = nextNode;
  }
}

// *-------------- initialize app ----------------* //

let myHashmap = new Hashmap(0.8, 16);
myHashmap.set("x", "red");
myHashmap.set("xp", "yellow");
myHashmap.set("xp", "newwwwwwwwwww");
myHashmap.set("x", "new1");
myHashmap.set("x", "red");
console.log(myHashmap);
