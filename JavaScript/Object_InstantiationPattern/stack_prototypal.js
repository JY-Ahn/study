const Stack = function() {
    
    var output = Object.create(stackMethods);
    output.storage = {};
    output.count = 0;
  
    return output;
};

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
  