const Stack = function() {
    this.storage = {};
    this.count = 0;
};

Stack.prototype.push = function(value){
    this.storage[this.count] = value;
    this.count++;
}

Stack.prototype.pop = function() {
    let output;
    if (this.count <= 0) return undefined;
    else {
      this.count--;
      output = this.storage[this.count];
      delete this.storage[this.count];
  
      return output;
    }
}

Stack.prototype.size = function() {
    return this.count;
}
  