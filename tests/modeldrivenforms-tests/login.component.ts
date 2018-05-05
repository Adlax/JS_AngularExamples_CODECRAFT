import { Component, Output, EventEmitter } from '@angular/core';
//import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

export class User {
  constructor(public email: string, public password: string) {

  }
}

@Component({
  selector: 'app-login',
  template: `
    <form (ngSubmit)="login()" [formGroup]="form">
      <label>email</label>
      <input type="text" formControlName="email">
      <label>password</label>
      <input type="password" formControlName="password">
      <button type="submit">Login!</button>
    </form>
  `
})
export class LoginComponent {
  @Output() loggedIn: EventEmitter<User>();
  public form: FormGroup;
  public email: FormControl;
  public pasword: FormControl;
  constructor(private fb: FormBuilder){

  }
  ngOnInit(){
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.pattern("[^ @]*@[^ @]*")]),
      password: new FormControl('', [Validators.required, Validators.minlength(8)]),
    });
  }
  loggin() {
    console.log('Login : ${this.form.value}');
    if(this.form.valid){
      this.loggedIn.emit(new User(this.form.value.email, this.form.value.password));
    }
  }
}
