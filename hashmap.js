class Hashmap {
    constructor(loadFactor,capacity,bucket) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.bucket = new Array(capacity);
    };

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
        }
        return hashCode;
      };
    
    
};