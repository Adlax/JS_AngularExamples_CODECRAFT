var funcs = [];
for(let i = 0; i < 5; i++) {
  funcs.push(function(){console.log(i);});
}
funcs.forEach(function(func){func();});

//en typescript il est conseille d utilise la nouvelle notation let plutot que var du javascript ES5 classique.
//c est un apport. L utilite ? let x, restreint le scope de x a la boucle ou function dans laquelle elle est utilisee
// apres, elle n existe plus
// par contre, var, autant valable en JS ES5 ou en ts, declare simplement une variable dans son scope par defaut, qui est
// le global scope ou le function scope (toute variable var x declaree dans une fonction sera la meme dans le function scope)
 
