// Hash: 
/*
1. Division Method(나눗셈 법) 

나눗셈법은 입력 값을 테이블의 크기로 나누고, 그 '나머지'를 테이블의 주소로 사용한다.

주소 = 입력 값 % 테이블의 크기
특징
(1) 어떤 값이든 테이블의 크기로 나누면 그 나머지는 절대 테이블의 크기를 넘지 않는다.
(2) 테이블의 크기를 n이라 할때, 0~n-1 사이의 주소를 반환함을 보장.
(3) 테이블의 크기 n을 소수(Prime Number)로 정하는 것이 좋다고 알려져 있다.

출처: https://luyin.tistory.com/191 [Luyin]*/
const hash = (string, max) =>{
  let hash = 0;
  for(let i=0;i<string.length;i++){
    hash += string.charCodeAt(i);
  }
  return hash % max;  //이게 무슨 의미지? =>주소 반환.
  // 이런 식으로 데이타를 저장하면 key에 대한 데이타를 찾을 때 hash()를 한번만 수행하면
  // array 내에 저장된 index 위치를 찾아낼 수 있기 때문에, 데이타의 저장과 삭제가 매우매우 빠르다
}

// add, remove, lookup, print
const HashTable = function(){
  let storage = [];
  const storageLimit = 4;

  // Hash Table의 add함수 :
  this.add = (key, value) => {
    const index = hash(key, storageLimit);

    if(storage[index] === undefined){
      storage[index] = [[key, value]];
    }else{// 키-값이 이미 배정되어있다면
      const inserted = false;
      for(let i=0;i<storage[index].length;i++){
        if(storage[index][i][0] === key){
          storage[index][i][1] = value;
          inserted = true;
        }
      }

    if(inserted === false) storage[index].push([key, value]);
      
    }
  };

  this.remove = key => {
    const index = hash(key, storageLimit);
    if(storage[index].length === 1 && storage[index][0][0] === key)
      delete storage[index];
    else{
      for(let i=0; i < storage[index]; i++){
        if(storage[index][i][0] === key) delete storage[index][i];
      }
    }
  };

  this.lookup = key =>{
    const index = hash(key, storageLimit);
    if(storage[index] === undefined) return undefined;
    else{
      for(let i = 0; i < storage[index].length; i++){
        if(storage[index][i][0] === key) return storage[index][i][1];
      }
    }
  }

  this.print = () =>{
    console.log(storage);
  }
}