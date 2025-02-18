class Hashmap {
  constructor(loadFactor, capacity, bucket) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.bucket = new Array(capacity);
  }

  hash(key,capacity = this.capacity) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {

    if((this.length()+1) > (this.capacity * this.loadFactor)) {
        let newHashMap = new Hashmap(0.8,(this.capacity*2));
        let arrayOfKeyValues = this.entries();
        arrayOfKeyValues.forEach(element => {
            newHashMap.set(element[0],element[1]);
        });

        newHashMap.set(key,value);
        this.bucket = newHashMap.bucket;
        this.capacity = newHashMap.capacity;
    };


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
    const arrayOfLinkedLists = bucket.filter((elements) =>  elements !== undefined);
  
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

  clear(capacity = this.capacity) {
    this.bucket = new Array(capacity);
  };


  keys() {
    
    const bucket = this.bucket;
    const arrayOfLinkedLists = bucket.filter((elements) => typeof elements !== undefined);
    const arrayOfKey = [];
    arrayOfLinkedLists.forEach(linkedList => {
      let tempVariable = linkedList.head;
      let isLinkedListIterated = false;
      while(!isLinkedListIterated) {
            if(tempVariable.nextNode === null) {
              arrayOfKey.push(tempVariable.data[0]);
              isLinkedListIterated = true;
            } 
            else if(tempVariable.data !== undefined) {
                  arrayOfKey.push(tempVariable.data[0]);
            }

        tempVariable = tempVariable.nextNode;
      }
      
    });
    return arrayOfKey;
  };



  values() {
    
    const bucket = this.bucket;
    const arrayOfLinkedLists = bucket.filter((elements) => typeof elements !== undefined);
    const arrayOfValues = [];
    arrayOfLinkedLists.forEach(linkedList => {
      let tempVariable = linkedList.head;
      let isLinkedListIterated = false;
      while(!isLinkedListIterated) {
            if(tempVariable.nextNode === null) {
              arrayOfValues.push(tempVariable.data[1]);
              isLinkedListIterated = true;
            } 
            else if(tempVariable.data !== undefined) {
                  arrayOfValues.push(tempVariable.data[1]);
            }

        tempVariable = tempVariable.nextNode;
      }
      
    });
    return arrayOfValues;
  };


  entries()  {
    
    
      const bucket = this.bucket;
      const arrayOfLinkedLists = bucket.filter((elements) => typeof elements !== undefined);
      const arrayOfKeyValues = [];
      arrayOfLinkedLists.forEach(linkedList => {
        let tempVariable = linkedList.head;
        let isLinkedListIterated = false;
        while(!isLinkedListIterated) {
              if(tempVariable.nextNode === null) {
                arrayOfKeyValues.push([tempVariable.data[0],tempVariable.data[1]]);
                isLinkedListIterated = true;
              } 
              else if(tempVariable.data !== undefined) {
                arrayOfKeyValues.push([tempVariable.data[0],tempVariable.data[1]]);
              }
  
          tempVariable = tempVariable.nextNode;
        }
        
      });
      return arrayOfKeyValues;

  }




};

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
// Test 1: Basic Set and Get Functionality
console.log(myHashmap.get("key1"));  // Expected: "value1"

// Test 2: Collisions (Insert and Retrieve Multiple Keys)
myHashmap.set("key2", "value2");
myHashmap.set("key3", "value3");
console.log(myHashmap.get("key2"));  // Expected: "value2"
console.log(myHashmap.get("key3"));  // Expected: "value3"

// Test 3: Dynamic Resizing (Inserting enough keys to exceed load factor)
myHashmap.set("key4", "value4");
myHashmap.set("key5", "value5");
console.log("Capacity after resizing:", myHashmap.capacity);  // Expected: 8 (assuming initial capacity was 4 and it doubled)

// Test 4: Removing Elements
console.log(myHashmap.remove("key3"));  // Expected: true
console.log(myHashmap.get("key3"));  // Expected: null

// Test 5: Edge Case - Removing a non-existent key
console.log(myHashmap.remove("nonexistent"));  // Expected: false

// Test 6: Checking size consistency
console.log(myHashmap.length());  // Expected: 4 (after adding 5 and removing 1)

// Test 7: Keys Function
console.log(myHashmap.keys());  // Expected: ["key1", "key2", "key4", "key5"]

// Test 8: Values Function
console.log(myHashmap.values());  // Expected: ["value1", "value2", "value4", "value5"]

// Test 9: Entries Function
console.log(myHashmap.entries());  // Expected: [["key1", "value1"], ["key2", "value2"], ["key4", "value4"], ["key5", "value5"]]

// Test 10: Clear Function
myHashmap.clear();
console.log(myHashmap.length());  // Expected: 0
console.log(myHashmap.keys());  // Expected: []

// Test 11: Hashmap with empty key
myHashmap.set("", "empty");
console.log(myHashmap.get(""));  // Expected: "empty"

// Test 12: Hashmap with numeric key (e.g., '123')
myHashmap.set("123", "numeric");
console.log(myHashmap.get("123"));  // Expected: "numeric"

// Test 13: Hashmap with boolean key (e.g., true)
myHashmap.set(true, "booleanTrue");
console.log(myHashmap.get(true));  // Expected: "booleanTrue"

// Test 14: Keys with special characters and long strings
myHashmap.set("!@#$%^&*", "specialChars");
myHashmap.set("a".repeat(100), "longString");  // Very long string key
console.log(myHashmap.get("!@#$%^&*"));  // Expected: "specialChars"
console.log(myHashmap.get("a".repeat(100)));  // Expected: "longString"
