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
