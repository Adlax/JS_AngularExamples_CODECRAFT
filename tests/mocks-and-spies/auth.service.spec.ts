import {AuthService} from './auth.service.ts';

describe('Test de AuthService :', ()=> {
  let service: AuthService;
  beforeEach( () => {
    service = new AuthService();
  });
  afterEach( () => {
    service = null;
    localStorage.removeItem('token');
  });
  it('Renvoie true si il y a un token dans le local storage', () => {
    localStorage.setItem('token','alpha');
    expect(service.isAuthenticated()).toBeTruthy();
  });
  it('Renvoie false si il n y a pas de token dans le local storage', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });
});
