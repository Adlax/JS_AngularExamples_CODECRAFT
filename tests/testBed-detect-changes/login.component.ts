import {Component} from '@angular/core';
import {AuthService} fom './auth.service.ts';

@Component({
	selector: 'app-login',
	template: `
		<a>
			<span *ngIf="needsLogin()"> Login </span>
			<span *ngIf="!needsLogin()"> Logout </span>
		</a>
	`
})
export class LoginComponent {
	constructor(private authService: AuthService){

	}
	needsLogin(){
		return !this.authService.isAuthenticated();
	}
}
