import { Component, Input, Output, EventEmitter } from '@angular/core';

export class User {
  constructor(public email: string, public password: string){

  }
}

@Component({
  selector: 'app-login',
  template: `
    <form>
      <label>email</label>
      <input type="email" #email>
      <label>password</label>
      <input type="password" #password>
      <button type="button" [disabled]="!enabled" (click)="enabling(email.value, password.value)"> BUTTON </button>
    </form>
  `
})
export class LoginComponent {
  @Input() enabled = true;
  @Output() loggedIn = new EventEmitter<User>();
  enabling(email, password) {
    console.log('LOgin is : ${email} ${password}');
    console.log('Emitting the corresponding user');
    this.loggedIn.emit(new User(email, password));
  }
}
