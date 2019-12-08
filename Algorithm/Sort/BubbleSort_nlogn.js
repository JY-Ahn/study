var bubbleSort = function(array) {
    // Your code here.
    let temp;
    
    for(let i=0 ; i<array.length-1 ; i++){
      for(let j=0 ; j<array.length-1-i ; j++){
        if(array[j]>array[j+1]){
          temp = array[j+1];
          array[j+1] = array[j];
          array[j] = temp;
        }
      }
    }
    return array;
};
  