// This function is for finding shortest String
// input: array which contains any kinds of value(number,string..)
// output: string which one has shortest length

/*
// 1. Not using built-in method
function findShortestWordAmongMixedElements(arr) {
  // your code here
  
  var arr_str=[];
  var min =0;
  var result='';
  var cnt =0;

  if(arr.length===0) return '';

  for(var i=0;i<arr.length;i++){
    if(typeof(arr[i]) === 'string'){
      arr_str.push(arr[i]);
    }else{
      cnt++;
    }
  }
  if(cnt===arr.length) return '';

  min = arr_str[0].length;  // length
  result = arr_str[0];      // output

  for(var i=0;i<arr_str.length-1;i++){
    if(arr_str[i+1].length<min){
      min = arr_str[i+1].length;
      result = arr_str[i+1];
    }
  }
  return result;
  
}
*/
// 1. Using built-in method (Array.filter(), Array.sort())
function findShortestWordAmongMixedElements(arr) {

    if(arr.length === 0 ) return '';
    let output = arr.filter(val=> typeof(val)==='string').sort(function(a,b){
      return a.length-b.length
      });
    
    if(output.length===0)return '';
    else return output[0];
  }