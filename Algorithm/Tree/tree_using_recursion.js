const Tree = function(value) {
    const newTree = {};
    newTree.value = value;
  
    // your code here
    newTree.children = []; // fix me
    extend(newTree, treeMethods);
  
    // children에 묶는 구조
    return newTree;
  };
  
  const extend = function(target, source){
    for(let key in source){
      target[key] = source[key];
    }
  }
  
  const treeMethods = {};
  
  treeMethods.addChild = function(value) {
    if(typeof value === 'number'){
      this.children.push(Tree(value));
    }else{
      this.children.push(value);
    }
    
  };
  
  treeMethods.contains = function(target) {
  
    function rec(curNode){
      if(curNode === undefined){
        return false;
      }else{
        if(curNode.value === target){
          return true;
        }
        else{
          if(curNode.children.length !== 0 ){
            for(let i = 0 ; i<curNode.children.length ; i++){
              if(rec(curNode.children[i])) return true;
            }
            return false;
          }
        }
      }
    }
  
  
    return rec(this);
  };
  