const Stack = function() {
    // Hey! Rewrite in the new style. Your code will wind up looking very similar,
    // but try not not reference your old code in writing the new style.
    const someInstance = {
      storage: {},
      count: 0
    };
  
    // const storage = {};
    // var count = 0;
    extend(someInstance, stackMethods);
    /**
     * for (let key in source) {
     * target[key] = source[key];
     * }
     */
    return someInstance;
  };
  
  function extend(target, source) {
    for (let key in source) {
      target[key] = source[key];
    }
  }
  
  const stackMethods = {
    push: function(value) {
      this.storage[this.count] = value;
      this.count++;
    },
    pop: function() {
      var output;
      if (this.count <= 0) return undefined;
      else {
        this.count--;
        output = this.storage[this.count];
        delete this.storage[this.count];
  
        return output;
      }
    },
    size: function() {
      return this.count;
    },
    show: function() {
      return this.storage;
    }
  };
  