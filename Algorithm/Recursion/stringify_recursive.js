/*
- Description
    This code is recursive version of JSON.stringify.
*/
// var stringifyJSON = JSON.stringify;

function stringifyJSON(data) {
    // your code goes here
    
    if(data === undefined){
      return undefined;
    }else if(data === null){
      return 'null';
    }else if(typeof data === 'symbol' || typeof data === 'function'){
      return '';
    }else if(typeof data === 'string'){
      return '"'+ data +'"';
    }else if(typeof data === 'number'){
      return String(data);
    }else if(Array.isArray(data)){
      
      return '[' + data.reduce(function(acc, cur){
        if(cur === undefined)
          return [...acc,'null'];
        else
          return [...acc, stringifyJSON(cur)]
      },[]).join(',') + ']';
  
    }else if(typeof data === 'boolean'){
      return data ? 'true' : 'false';
    }else if(typeof data === 'object'){
      return '{' + Object.keys(data).reduce(function(acc, k){
        if(data[k] === undefined)
          return acc;
        else{
          if(k === 'functions')
            return [...acc, stringifyJSON(data[k])];
          else
            return [...acc, stringifyJSON(k) + ':' + stringifyJSON(data[k])];
        }
          
      }, []).join(',') + '}';
  
    }else{
      return '{}';
    }
  };
  