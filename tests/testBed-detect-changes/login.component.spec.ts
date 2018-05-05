/* tslint:disable:no-unused-variable */
import {TestBed, ComponentFixture, async} from '@angular/core/testing';
import {LoginComponent} from './login.component.ts';
import {AuthService} from './auth.service.ts';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('Test du LoginComponent : ', () => {
	let component: LoginComponent;
	let service: AuthService;
	let fixture: ComponentFixture<LoginComponent>;
	let el: DebugElement;
	beforeEach( () => {
		TestBed.configureTestingModule({
			declarations: [LoginComponent],
			providers: [AuthService],
		});
		fixture = TestBed.createComponent(LoginComponent);
		component = fixture.componentInstance;
		authService = TestBed.get(AuthService);
		el = fixture.debugElement.query(By.css('a'));
	});
	it('Pas de bouton Login si authenfifie', () => {
		//initialement le content est blank donc ;
		expect(el.nativeElement.textContent.trim()).toBe('');
		//On synchronise la vue avec l etat et la valeur par defaut est loadee;
		fixture.detectChanges();
		expect(el.nativeElement.textContent.trim()).toBe('Login');
		//On fait un spyon pour changer la valeur de lauthenfification ;
		spyOn(service, 'isAuthenticated').and.returnValue(true);
		//Sans sync la valeur du tag a na pas change donc ;
		expect(el.nativeElement.textContent.trim()).toBe('Login');
		//mais si on update ;
		fixture.detectChanges();
		expect(el.nativeElement.textContent.trim()).toBe('Logout');
	});

});
