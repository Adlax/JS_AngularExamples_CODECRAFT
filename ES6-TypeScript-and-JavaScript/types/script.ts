'use strict';

//basic
let n: number = 1;
let presence: boolean = true;
let nom: string = "Roger";
let tab1: number[] = [1,5,3];
let tab2: Array<number> = [4,5,8,9];

//function
let fun: Function = () => console.log("Salut sale plouc");
function retNombre(): number {
  return 5;
}

//void
function retRien(): void {
  console.log("non rien");
}

//enum
enum Direction {
  up,
  down,
  left,
  right
}
let dir: Direction;
dir = Direction.up;

//class aussi sont des types
class Person{}
let alex: Person;
let people: Person[];

//any
let notsure: any = 1;
notsure = "pouet";

//type assertion
let truc: any = "Billie Jean";
let long: number = (<string>truc).length;

//generics
class Audio{}
class Video{}
class Post<T>{
  content: T;
}

let audioPost: Post<Audio>;
let videoPost: Post<Video>;
