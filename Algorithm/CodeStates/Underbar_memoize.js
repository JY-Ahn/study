/*
- Description
    This function is hand-made version of memoize in Underscore https://underscorejs.org/.
*/


_.memoize = function(func) {
    // Even if the function(func) is already been called, should be called again if arguments are different
    function ArrayEqual(a, b){
      if ((a.length === 1) && (b.length === 1) && (a[0] === a[0])){
        return true;
      }
      if (a[0].length !== b[0].length){
        return false;
      }
      for (var i = 0; i < a.length; i++) {
        if (a[0][i] !== b[i]){
          return false;
        }
      }
      return true;
    }
    
    var map = new Map();
    var lookUptable_arg = [];
    var isSameinput = false;

    return function(){
      // func: new function
      if(!map.has(func)){
        lookUptable_arg.push([...arguments]);
        map.set(func, func(...arguments));
        return map.get(func);
      }else{
        for(let i=0 ; i<lookUptable_arg.length ; i++){
          if(lookUptable_arg[i].length === [...arguments].length){
            if(ArrayEqual(lookUptable_arg[i], [...arguments])){
              isSameinput = true;
            }
          }
        }
        // func: already called before
        // arguments: Result of func(arguments) was stored. Just use them
        if(isSameinput){

          isSameinput = false;
          return map.get(func);

        }else{
          // func has been called but arguments are new. 
          lookUptable_arg.push([...arguments]);
          map.set(func, func(...arguments));
          isSameinput = false;
          return map.get(func); 
        }
        
      }
    };
  };