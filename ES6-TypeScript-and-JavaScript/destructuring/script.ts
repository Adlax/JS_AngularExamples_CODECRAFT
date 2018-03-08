'use strict';

//obj destruc
const obj = {first: 'Adlax', last: 'le furax', age: 36};

function getObj(){
  return obj;
}

//array destructuring
const {first,last} = getObj();
console.log(first);
console.log(last);

const arr = ['A','B'];
const [x,y] = arr;
console.log(x);
console.log(y);

//function parameters destructuring
function f({x=1}) {
  console.log(x);
}
f({});
