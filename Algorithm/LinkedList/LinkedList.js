const LinkedList = function () {
    const list = { };
    list.head = null;
    list.tail = null;
      
    list.addToTail = function (value) {
      const newNode = Node(value);
  
      // if list is empty
      if(this.head === null){
        // make head and tail to point newNode
        this.head = newNode;
        this.tail = newNode;
      }
      // if list has some node
      else{
        this.tail.next = newNode;
        this.tail = newNode;
      }
    };
  
    list.removeHead = function () {
  
      let curNode = this.head;
      let output = this.head.value;
      if(curNode.next === null){
        this.head = null;
        this.tail = null;
        return output;
      }else{
        this.head = curNode.next;
        return output;
      }
    };
  
    list.contains = function (target) {
      
      let curNode = this.head;
  
      while(curNode){
        if(curNode.value === target) return true;
        curNode = curNode.next;
      }
      return false;
    };
  
    return list;
  };
  
  const Node = function (value) {
    const node = {};
  
    node.value = value;
    node.next = null;
  
    return node;
  };
  