import {Component, OnInit} from '@angular/core';
import {AuthService} from './auth.service.ts';

@Component({
  selector: 'app-login',
  template: `
    <a>
      <span *ngIf="needsLogin"> Login </span>
      <span *ngIf="!needsLogin"> Logout </span>
    </a>
  `
})
export class LoginComponent implements OnInit {
  public needsLogin: boolean;
  constructor(private auth: AuthService){

  }
  ngOnInit(){
    this.auth.isAuthenticated().then( (authenticated) => {
      this.needsLogin = !authenticated;
    });
  }
}
