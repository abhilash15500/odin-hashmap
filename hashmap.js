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
    let tempVariable;
    let isElementFound = false;

    if(this.bucket[hashedIndex] !== undefined) {
      tempVariable = this.bucket[hashedIndex].head;
    }
  
    while (isElementFound === false) {

      if(tempVariable === undefined) {
        return null;
      }

      else if (tempVariable.data[0] === key) {
        isElementFound = true;
        return tempVariable.data[1];
      }

      else if(tempVariable.data[0] !== key && tempVariable.nextNode === null){
        return null;
      }
      tempVariable = tempVariable.nextNode;
    }
  };


  
  has(key) {
    const hashedIndex = this.hash(key);
    let tempVariable;
    let isElementFound = false;

    if(this.bucket[hashedIndex] !== undefined) {
      tempVariable = this.bucket[hashedIndex].head;
    }
  
    while (isElementFound === false) {

      if(tempVariable === undefined) {
        return false;
      }

      else if (tempVariable.data[0] === key) {
        isElementFound = true;
        return true;
      }

      else if(tempVariable.data[0] !== key && tempVariable.nextNode === null){
        return false;
      }
      tempVariable = tempVariable.nextNode;
    }
  };

  remove(key) {
    const hashedIndex = this.hash(key);
    let tempVariable;
    let isElementFound = false;

    if(this.bucket[hashedIndex] !== undefined) {
      tempVariable = this.bucket[hashedIndex].head;
    }
  
    while (isElementFound === false) {
      if(tempVariable === undefined) {
        return false;
      }
      else if (tempVariable.data[0] === key) {
        tempVariable.data = undefined;
        isElementFound = true;
        return true;
      }
     else if(tempVariable.data[0] !== key && tempVariable.nextNode === null){
        return false;
      }
      tempVariable = tempVariable.nextNode;
    }
  }


  length() {
    let elementCount = 0;
    const bucket = this.bucket;
    const arrayOfLinkedLists = bucket.filter((elements) => typeof elements !== undefined);
  
    arrayOfLinkedLists.forEach(linkedList => {
      let tempVariable = linkedList.head;
      let isLinkedListIterated = false;
      while(!isLinkedListIterated) {
            if(tempVariable.nextNode === null) {
              elementCount = elementCount + 1;
              isLinkedListIterated = true;
            } 
            else if(tempVariable.data !== undefined) {
              elementCount = elementCount + 1;
            }

        tempVariable = tempVariable.nextNode;
      }
      
    });
    return elementCount;
  };

  

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




myHashmap.set('apple', 'red')
myHashmap.set("apple","redddd");
myHashmap.set('banana', 'yellow')
 myHashmap.set('carrot', 'orange')
 myHashmap.set('dog', 'brown')
 myHashmap.set('elephant', 'gray')
 myHashmap.set('frog', 'green')
 myHashmap.set('grape', 'purple')
 myHashmap.set('hat', 'black')
 myHashmap.set('ice cream', 'white')
 myHashmap.set('jacket', 'blue')
 myHashmap.set('kite', 'pink')
 myHashmap.set('lion', 'golden')
 console.log(myHashmap.length());
console.log(myHashmap);
