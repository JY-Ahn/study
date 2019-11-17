const Stack = function () {
    const someInstance = {};

    const storage = {};
    var count = 0;
  
    someInstance.push = function (value) {
      storage[count] = value;
      count++;
    };
  
    someInstance.pop = function () {
      let output ;
  
      if(count <= 0){
        return undefined;
      }else{
        count--;
        output = storage[count];
        delete storage[count];
        return output;
      }
    };
  
    someInstance.size = function () {
      return count;
    };
  
    return someInstance;
  };
  