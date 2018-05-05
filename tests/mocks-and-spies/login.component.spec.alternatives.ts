//Premiere version, impropre, en allant lire la DI
import {AuthService} from './auth.service.ts';
import {LoginComponent} from './login.component.ts';

describe('Test de LoginComponent :', () => {
  let service: AuthService;
  let component: LoginComponent;
  beforeEach( () => {
    service = new AuthService();
    component = new LoginComponent(service);
  });
  afterEach( () => {
    service = null;
    component = null;
    localStorage.removeItem('token');
  });
  it('ca affiche pas le lien Login si deja authentication ', () => {
    localStorage.setItem('token', 'alpha');
    expect(component.needsLogin()).toBeFalsy();
  });
  it('ca affiche le lien Login si pas authentication', () => {
    expect(component.needsLogin()).toBeTruthy();
  });
});


//Seconde version, avec un Mock de class
import {LoginComponent} from './login.component.ts';

class MockAuthService {
  authentication: boolean = false;
  isAuthenticated() {
    return this.authentication;
  }
}

describe('Test de LoginComponent :', () => {
  let service: MockAuthService;
  let component: LoginComponent;
  beforeEach( () => {
    service = new MockAuthService();
    component = new LoginComponent(service);
  });
  afterEach( () => {
    service = null;
    component = null;
  });
  it('ca affiche le lien Login si pas authentication', () => {
    service.authentication = false;
    expect(component.needsLogin()).toBeTruthy();
  });
  it('ca affiche pas le lien Login si deja authentication', () => {
    service.authentication = true;
    expect(component.needsLogin()).toBeFalsy();
  });
});

//Troisieme version, avec une extension du vrai service mais avec un override de fonction
import {AuthService} from './auth.service.ts';
import {LoginComponent} from './login.component.ts';

class MockAuthService extends AuthService {
  authentication = false;
  isAuthenticated() {
    return this.authentication;
  }
}

describe('Test de LoginComponent :', () => {
  let service: MockAuthService;
  let component: LoginComponent;
  beforeEach( () => {
    service = new MockAuthService();
    component = new LoginComponent(service);
  });
  afterEach( () => {
    service = null;
    component = null;
  });
  it('ca affiche le lien Login si pas authentication', () => {
    service.authentication = false;
    expect(component.needsLogin()).toBeTruthy();
  });
  it('ca affiche pas le lien Login si deja authentication', () => {
    service.authentication = true;
    expect(component.needsLogin()).toBeFalsy();
  });
});

//Quatrieme version, en utilisant un spy/spyOn sur la vraie DI
/* tslint:disable:no-unused-variable */
import {AuthService} from './auth.service.ts';
import {LoginComponent} from './login.component.ts';

describe('Test de LoginComponent :', () => {
  let service: AuthService;
  let component: LoginComponent;
  let spy: any;
  beforeEach( () => {
    service = new AuthService();
    component = new LoginComponent(service);
  });
  afterEach( () => {
    service = null;
    component = null;
  });
  it('ca affiche le lien Login si pas authentication', () => {
    spy = spyOn(service,'isAuthenticated').and.returnValue(false);
    expect(component.needsLogin()).toBeTruthy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  });
  it('ca affiche pas le lien Login si deja authentication', () => {
    spy = spyOn(service,'isAuthenticated').and.returnValue(true);
    expect(component.needsLogin()).toBeFalsy();
    expect(service.isAuthenticated).toHaveBeenCalled();
  });
});
