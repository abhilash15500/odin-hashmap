class HashMap {
    constructor(loadFactor,capacity,bucket) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.bucket = new Array(capacity);
    };

      hash(key) {
          let hashCode = 0;
          const primeNumber = 31;
          for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
          }
          return hashCode;
        };

    
    set(key,value) {
          let indexOfBucket = this.hash(key);
          this.bucket[indexOfBucket] = [key,value];
    };

    get(key) {
        const valueIndex = 1;
        let indexOfBucket = this.hash(key);

        if(this.bucket[indexOfBucket] === undefined){
          return null;        
        }
        else {
          return this.bucket[indexOfBucket][valueIndex];;
        }
    };

    has(key) {
          const indexOfBucket = this.hash(key);
          if(this.bucket[indexOfBucket] === undefined){
            return false;        
          }
          else {
            return true;
          }
      };


      remove(key) {
           const indexOfBucket = this.hash(key);
          
           if(this.bucket[indexOfBucket] === undefined){
            return false;        
          }
          else {
            delete this.bucket[indexOfBucket];
            return true;
          }

      };

      

    }

    



// initialize the hashmap 

let newHashMap = new HashMap(0.75,15);
newHashMap.set("apple","red");
console.log(newHashMap.get("apple"));
console.log(newHashMap.has("apple"));
console.log(newHashMap.remove("applee"));

console.log(newHashMap);



