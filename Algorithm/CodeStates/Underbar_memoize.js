/*
- Description
    This function is hand-made version of memoize in Underscore https://underscorejs.org/
*/


_.memoize = function(func) {
    // Even if the function(func) is already been called, should be called again if arguments are different
    var memo_arguments=[];    // List of arguments already been used
    var memo = [];            // List of the result
    var memo_i;               // Use it when choose the already have value
    var alreadyCalled = false;// functions's status(runned or not)
    var result = func;        // result
    var is_same_input = false;// Check if arguments are already used
    var memo_func = [];       // List of the function already been used


    return function(){
      if(memo_func.includes(func)){   // Check if function was already used
        alreadyCalled = true;
      }else{
        alreadyCalled = false;
      }
      
      if(!alreadyCalled){                    // New function => calculate the result
        memo_func.push(func);                // Put func in memo_func
        alreadyCalled = true;                // Mark it as used
        result = func(...arguments);         // Calculate the result
        memo.push(result);                   // Records the result
        memo_arguments.push([...arguments]); // Records the arguments

      }else{  // Used function => Calculate it or take the value from the memo(Depends on arguments)
        // Check if arguments were already used
        for(let i=0 ; i<memo_arguments.length ; i++){
          if(_.reduce(memo_arguments[i], (acc,cur) => acc+cur, 0)
          === _.reduce([...arguments], (acc,cur) => acc+cur ,0)){
            memo_i = i;
            is_same_input = true;
          }else{
            is_same_input = false;
          }
        }

        if(!is_same_input){
          // Function was already used
          // but arguments are new => Calculate the result
          result = func(...arguments);            // Calculate the result
          memo.push(result);                      // Records the result
          memo_arguments.push([...arguments]);    // Records the arguments
        }else{
          // Function was already used
          // & arguments were also used bevore => Take the result from memo
          result = memo[memo_i];
        }
      }
      return result;
    };
  };