
/*
- Description
    The purpose of the function getElementsByClassName_recursion is same with the function getElementsByClassName
    which is return the list of the element which has the property of class name as className.
    If you want to just pass the test, you can type like bellow. 
    
    function getElementsByClassName (className) {
       return document.getElementsByClassName(className);
    };

    But in this code, I used the recursion. 
*/

function getElementsByClassName_recursion(className) {
    // your code here
    let found = [];
    let rootElement = document.body;
    
    function recursion(className, parentElement){
      if(parentElement.classList.contains(className)){
        // Check if parentElement has className in it's classList.
        // If it has, add it in the array found.
        found.push(parentElement)
      }
      // If parentElement has childNodes, check all if they have className in their classList.
      if(parentElement.hasChildNodes()){
        for(let i=0 ; i<parentElement.children.length ; i++){
          recursion(className, parentElement.children[i]);
        }
      }
    }
    recursion(className, rootElement);
  
    return found;
  };
  