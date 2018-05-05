import {LoginComponent} from './login.component.ts';
import {AuthService} from './auth.service.ts';
import {ComponentFixture, TestBed} from '@angular/core/testing';

describe('Test du LoginComponent : ', () => {
  let component: LoginComponent;
  let service: AuthService;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService],
    });
    //creer le component et le test fixture
    fixture = TestBed.createComponent(LoginComponent);
    //creer un component test depuis le fixture
    component = fixture.componentInstance;
    //Le service creer a partir de la config du module de testbed
    service = TestBed.get(AuthService);
    it('login necessaire si pas authentifie', () => {
      spyOn(service,'isAuthenticated').and.returnValue(false);
      expect(component.needsLogin()).toBeTruthy();
      expect(service.isAuthenticated).toHaveBeenCalled();
    });
    it('login non necessaire si authentifie', () => {
      spyOn(service,'isAuthenticated').and.returnValue(true);
      expect(component.needsLogin()).toBeFalsy();
      expect(service.isAuthenticated).toHaveBeenCalled();
    });

  });
});
