var bubbleSort = function(array) {
    // Your code here.
    
    let changed = true;
    let temp;
    while(changed){
      changed = false
      for(let i=0 ; i<array.length-1 ; i++){
        if(array[i] > array[i+1]){
          temp = array[i+1];
          array[i+1] = array[i];
          array[i] = temp;
          changed = true;
        }
      }
    }
    return array;
  
};
