import {Component} from '@angular/core';
import {AuthService} from './auth.service.ts';

@Component({
  selector: '',
  template: `
    <a [hidden]="needsLogin()"> Login </a>
  `
})
export class LoginComponent {
  constructor(private service: AuthService){

  }
  needsLogin(): boolean {
    return !this.service.isAuthenticated();
  }
}
