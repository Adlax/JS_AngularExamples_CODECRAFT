'use strict';

//boucle for classique
let arr = [10,20,30];
for(let i=0; i<arr.length; i++){
  console.log(arr[i]);
}

//boucle forEach ; un classique efficace et utile
arr.forEach(function(value){
  console.log(value);
});

//for in : pour lister les labels des clefs
var obj ={a:1, b:2};
for(let prop in obj){
  console.log(prop);
}

for(let index in arr){
  console.log(index);
  console.log(typeOf(index));
}

//for of : la plus pratique !
for(let value of arr){
  console.log(value);
}
