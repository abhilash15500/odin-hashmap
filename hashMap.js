class HashMap {
    constructor(loadFactor,capacity) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
    };

    hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i) % 16;
        }
        return hashCode;
      };

    
    set(key,value) {
            
    };



    
};


let newHashMap = new HashMap();
console.log(newHashMap);


//utility functions 

