import {AuthService} from './auth.service.ts';

describe('Service of Authentication', () => {
  let service: AuthService;
  beforeEach( () => {
    service = new AuthService();
  });
  afterEach( () => {
    service = null;
    localStorage.removeItem('token');
  });
  it('Dois retourner true quand y a un token dans le local storage', () => {
    localStorage.setItem('token','alpha');
    expect(service.isAuthenticated()).toBeTruthy;
  });
  it('Dois retourner false si y a plus de token dans le local storage', () => {
    expect(service.isAuthenticated()).toBeFalsy;
  });
});
