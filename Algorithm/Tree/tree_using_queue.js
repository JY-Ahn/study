const Queue = require("../../part-one/src/pseudoclassical/queue")

const Tree = function(value) {
  const newTree = {};
  newTree.value = value;

  // your code here
  newTree.children = []; // fix me
  // 구현 트리 종류: 이진트리
  // 채워나가는 순서: 왼쪽
  extend(newTree, treeMethods);

  return newTree;
};

const extend = function(target, source){
  for(let key in source){
    target[key] = source[key];
  }
}

const treeMethods = {};

treeMethods.addChild = function(value) {
  const childTree = Tree(value);
  // 부모와 연결 => 재귀함수
  //const queue = new Queue();
  const queue = new Queue.Queue();
  queue.enqueue(this);
  let curNode;

  while(true){
    curNode= queue.dequeue();

    if(curNode.children[0] === undefined){
      curNode.children.push(childTree);
      return ;
    }
    if(curNode.children[1] === undefined){
      curNode.children.push(childTree);
      return ;
    }
    queue.enqueue(curNode.children[0]);
    queue.enqueue(curNode.children[1]);
  }
};

treeMethods.contains = function(target) {
  const queue = new Queue.Queue();
  queue.enqueue(this);
  let curNode;

  while(true){
    
    curNode = queue.dequeue();
    if(curNode === undefined){
      if(queue.size() === 0){
        return false;
      }else{
        continue;
      }
    }
    // 값을 찾았을 때
    if(curNode.value === target){
      return true;
    }
    // 값을 찾지 못했을 때
    
    queue.enqueue(curNode.children[0]);
    queue.enqueue(curNode.children[1]);
  }
};
