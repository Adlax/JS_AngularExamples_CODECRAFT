import {LoginComponent} from './login.component';
import {AuthService} from './auth.service';
import {TestBed, async, fakeAsync, done, whenStable, tick, ComponentFixture, } from '@angular/core/testing';
import {DebugElement} from '@angular/core';
import {By} from '@angular/platform-browser';

describe('Test de LoginComponent', () => {
  let component: LoginComponent;
  let auth: AuthService;
  let fixture: ComponentFixture<LoginComponent>;
  let el: DebugElement;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [AuthService],
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    auth = TestBed.get(AuthService);
    el = fixture.debugElement.query(By.css('a'));
  });

  //la meilleure voie Angular ; fakeAsync() et tick()
  it('Test du label du bouton avec fakeAsync() et tick()', fakeAsync(() => {
    expect(el.nativeElement.textContent.trim()).toBe('');
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(auth, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    tick();
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Logout');
  }));
  
  //test avec done de Jasmine
  it('Test le label du bouton avec done dans Jasmine', (done) => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    let spy = spyOn(auth, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    //on trig le component sur son service
    component.ngOnInit();
    spy.calls.mostRecent().returnValue.then( () => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
      done();
    });
  });

  //test Angular avec async et whenStable
  it('Test du label du bouton avec async() et whenStable()', async(() => {
    fixture.detectChanges();
    expect(el.nativeElement.textContent.trim()).toBe('Login');
    spyOn(auth, 'isAuthenticated').and.returnValue(Promise.resolve(true));
    fixture.whenStable().then( () => {
      fixture.detectChanges();
      expect(el.nativeElement.textContent.trim()).toBe('Logout');
    });
    component.ngOnInit();
  }));

});
