function solution(participant, completion) {
    var answer = '';
    let hashTable = new HashTable();
    
    for(let i=0 ; i<participant.length ; i++){
        hashTable.set(participant[i],false);
    }
    for(let i=0 ; i<completion.length ; i++){
        hashTable.modify(completion[i],true);
    }
    for(let i=0 ; i<participant.length ; i++){
        if(!hashTable.get(participant[i])) answer = participant[i];
    }
    return answer;
}

class HashTable{
    constructor(size = 100000){
        this.buckets = new Array(size);
        this.size = size;
    }
    hash(key){
        let hashcode = 0;
        for(let i=0 ; i<key.length ; i++){
            hashcode += key.charCodeAt(i);
        }
        return hashcode % this.size;
    }
    set(key, value){
        let index = this.hash(key);
        if(!this.buckets[index]){
            this.buckets[index]=[];
        }
        this.buckets[index].push([key, value]);
        return index;        
    }
    modify(key, value){
        let index = this.hash(key);
        
        for(let buckets of this.buckets[index]){
            if(buckets[0] === key && !buckets[1]){
                buckets[1] = value;
                break;
            }
        }
    }
    
    get(key){
        let Namelist =[];
        let output=true;
        let index = this.hash(key);
        if(!this.buckets[index]) return null;
        
        for(let buckets of this.buckets[index]){    
            if(buckets[0] === key){
                Namelist.push(buckets[1]);
            }
        }
        Namelist.forEach(function(ele){
            if(ele===false) output = false;
        });
        
        return output;
    }
}