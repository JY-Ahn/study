/*

- Description
    The spy is going to take clothes differently everyday.
    Get the number of possible sets.
    He cannot wear the same type on one day.
- INPUT
    clothes: [[cloth, type], [cloth, type], [cloth, type], [cloth, type]....]
    *example: [[yellow_hat, headgear], [blue_sunglasses, eyewear], [green_turban, headgear]]
- OUTPUT
    Possible number of set of clothes.
- Restrction
    1. Spy has 1 ~ 30 of clothes
    2. Spy doesn't have same cloth
    3. The type of elements in Array clothes' is string
    4. Spy put on at least one cloth
- Example of INPUT & OUTPUT
    clothes                                                                         return
    [[yellow_hat, headgear], [blue_sunglasses, eyewear], [green_turban, headgear]]	5
    [[crow_mask, face], [blue_sunglasses, face], [smoky_makeup, face]]          	3

*/


function solution(clothes) {
    var answer = 0;
    let hashtable = new HashTable();
    let cloth_type = [];
    let length = [];
    // 1. 옷 종류 별로 이루어진 배열을 만든다
    // 2. 배열의 길이를 이용한다. 
    console.log('New section =====================================================')
    clothes.forEach(function(ele){
        hashtable.set(ele[1], ele[0]);
    });
    
    clothes.forEach(function(ele){
       if(!cloth_type.includes(ele[1])) cloth_type.push(ele[1]);
    });
    
    if(cloth_type.length === 1){
        
        answer = hashtable.getlength(cloth_type[0]);
        
    }else if(cloth_type.length === 0){
        
        answer = 0;
        
    }else{
        console.dir(hashtable)
        console.dir(cloth_type);
        cloth_type.forEach(function(ele){
            length.push(hashtable.getlength(ele) + 1);
        });
        answer = length.reduce(function(acc,cur){
            return acc*cur;
        }) - 1;
    }
    return Number(answer);
}

class HashTable{
    // If the size is under about 500, some tests are failed. Why?
    constructor(size = 1000){
        this.buckets = new Array(size);
        this.size = size;
    }
    hash(key){
        let hashcode = 0;
        for(let i=0 ; i<key.length ; i++){
            hashcode += key.charCodeAt(i);
        }
        return hashcode%this.size;
    }
    set(key, value){// key: cloth, value: type
        let index = this.hash(key);
        if(!this.buckets[index]){
            this.buckets[index] = [];
        }
        this.buckets[index].push([key, value]);
        return index; 
    }
    getlength(key){
        let index = this.hash(key);
        return this.buckets[index].length;
    }
    get(key){
        let index = this.hash(key);
        if(!this.buckets[index]) return null;
        
        for(let buckets of this.buckets[index]){
            if(buckets[0] === key){
                return  buckets[1];
            }
        }
    }
    
}